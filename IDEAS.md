# Ideas

Working list of blog posts and projects for nathanielroberts.tech. This file lives in the repo but is not published: Astro only builds `src/pages` and `src/content`, so nothing here reaches the site. Pick something, move it to "In progress", write it, delete it from here when it ships.

## Ground rules before writing anything

- Nothing that identifies Melos Education systems: no hostnames, addresses, product versions tied to the employer, or incident timelines that could be matched to a school. Generalise to "a multi-site organisation" or "a group of schools", and get a nod from your manager before publishing anything based on a work incident.
- PepsiCo work is off limits entirely once you start. Homelab, study, CTF and generalised lessons are the safe pool.
- Homelab posts: no IP ranges, tailnet addresses, SSIDs, hostnames or screenshots with those in them. The runbooks in the vault have all of that; strip it.
- Every post should show a decision and a reason, not just steps. A recruiter or peer should finish it knowing how you think.
- Australian English, DD/MM/YYYY, no em-dashes. Same voice as the CV: plain, specific, quietly confident.

## Priority: back up the CV

The CV and the register say "publishes CTF write-ups on nathanielroberts.tech". The site has two university CTF reports and no write-ups of recent events. Fix that first.

- [ ] CTF write-up series. One post per challenge or event, short (500 to 1200 words): the challenge, the approach, the dead ends, the solve, what to remember. Tag `ctf`, and the category (`web`, `forensics`, `reverse-engineering`, `crypto`, `osint`). Candidates: any HackTheBox, TryHackMe, picoCTF or event challenges done in 2025 and 2026. Publish two or three quickly, then one a month.
- [ ] Bug bounty: one post on how you approach a program (scope reading, recon, what you look for) with no live findings. Findings only once disclosed and the program allows it.

## Blog post ideas

### Security operations and incident response

- [ ] Anatomy of a macOS infostealer, from `curl | bash` to credential exfiltration. Uses public AMOS/Atomic Stealer research plus your general observations: the persistence plist, the anti-forensics, why identity containment (disable the SSO account) beats device containment as the first move. Anonymised, no employer detail.
- [ ] Containing a critical CVE when you cannot take the system down. The WAF-isolate-first pattern, timing an outage for minimum impact, validating a vendor patch, and why the real deliverable was the incident response process written afterwards. Generalised, with sign-off.
- [ ] Writing an incident response playbook for an organisation that has none. What to include, what to leave out, how to get it approved, how to test it on a tabletop.
- [ ] Business email compromise defence when you are not allowed to run phishing simulations. Layered email controls, what training worked, what the constraint taught you about people.
- [ ] SIEM on a small budget: what to log first, and why. Firewall, identity, DNS and endpoint before anything else. Cloudflare Logpush as a cheap high-value source.
- [ ] Detection engineering starter: writing your first Sigma rules for `curl | bash` persistence and unusual LaunchAgent creation on macOS.
- [ ] What four years of systems engineering taught me about incident response. The recovery mindset, knowing what a critical system's failure actually looks like, and why operations people make good responders.

### Networks and identity

- [ ] Certificate-based Wi-Fi for managed and BYO devices: 802.1X, EAP-TLS and SCEP through MDM. The parts every guide skips (PKI trust, certificate renewal, what happens when a device is wiped).
- [ ] Per-user pre-shared keys as a cheap NAC for IoT. How PPSK maps a device to a VLAN without a separate SSID, and where it falls short of 802.1X.
- [ ] Bringing a live network under Terraform without breaking it. Import first, plan often, and the pull request gate that exists because a change once took switches offline at several sites.
- [ ] Zero Trust for internal apps at home and at work: Cloudflare Tunnel and Access in front of Home Assistant, a travel planner and a status page, with no inbound ports.
- [ ] Segmenting a flat home network into VLANs without a weekend of downtime. Your migration runbook (phases, risk register, decisions log) rewritten as a story. This one is nearly written already.

### Homelab (from the vault runbooks, sanitised)

- [ ] OPNsense as a router-on-a-stick: VLAN gateways, Kea DHCP, AdGuard Home, Tailscale subnet router. Why one box, and the gotchas that cost you time on build day.
- [ ] Home Assistant on bare metal versus a VM: why you moved, how the disk clone beat the planned migration, and the supervisor restore bug.
- [ ] Proxmox lessons from three incidents: the NIC hang and the `ethtool` fix, the two-node quorum trap, and why "no quorum leaves guests stopped" is the lesson that matters.
- [ ] Frigate NVR with a camera that insists on the same layer 2 segment. The TUTK problem and how segmentation collides with consumer IoT.
- [ ] Backups that restore: weekly vzdump, nightly config archives, and the day you proved it by restoring.
- [ ] A travel router that brings home with you: Deco M5 on OpenWrt, dual uplink, Tailscale back to the house, DNS filtering on hotel Wi-Fi.
- [ ] Running a Minecraft server for friends with no port forward: playit.gg tunnel and a Cloudflare SRV record.
- [ ] Documenting a homelab so it survives you: one runbook per system, incident write-ups, a decisions log, published as a Quartz wiki.
- [ ] Media stack hardening: what "self-healing and observable" meant in practice.

### AI and automation

- [ ] Running a local coding model on a MacBook: MLX, LiteLLM and an 80B MoE at 4-bit. Prefill is the bottleneck, MCP tool surface matters, and what the model is actually good for.
- [ ] Nix-managing an AI toolchain on macOS: the model swap workflow, nix-homebrew gotchas, why one module generates every config.
- [ ] How I used Claude Code to rebuild this site, and then stripped out everything that made it look generated. The design review against Anthropic's own guidance, what the tells were, and the plain-first decision after real feedback.
- [ ] Automating student and staff provisioning with Node-RED: the shape of the problem and the pattern, no employer specifics.
- [ ] Small automation that pays for itself: firewall config to git every hour, config snapshots before changes, a bot that posts media stack alerts to your phone.

### Governance and study

- [ ] Essential Eight for a small organisation: what maturity level one actually costs in effort, and where to start.
- [ ] Doing a privacy impact assessment: the method from the Fortinet paper, reusable as a template.
- [ ] Study notes for whatever certification you pick next (see Projects), published as you go.

## Project ideas

### Content projects (site features you fill with real work)

- [ ] Incident postmortems collection. A new content type on the site, `src/content/incidents`, for the homelab incidents you already write up in the vault (pve4 NIC hang, quorum loss, pve5 delnode). Sanitised, in a fixed format: impact, timeline, root cause, fix, lessons. Strongest possible portfolio piece for an incident responder. I can add the collection and layout in an hour.
- [ ] CTF write-ups as their own section with a category filter, once there are more than five.
- [ ] A `/now` page, updated monthly: what you are working on, learning, reading. Cheap, human, good for repeat visitors.
- [ ] Talks or presentations page, if you ever present at a meetup (SecTalks, BSides Canberra or Melbourne, a local Cloud or Home Assistant group).

### Build projects

- [ ] Sanitised homelab infrastructure as code, published. The Terraform for OPNsense, UniFi and Nginx Proxy Manager with secrets and addresses stripped, plus the config backup workflow. Shows the IaC discipline you claim on the CV.
- [ ] Sigma rules and Jamf Protect analytics for macOS infostealer behaviour. Small public repo, tested against your own lab. Directly relevant to the new job's domain without touching the new job's data.
- [ ] Home SOC: ship homelab logs (OPNsense, AdGuard, Proxmox, Home Assistant) into Wazuh or Elastic, write detections for your own environment, and blog the build. Turns the homelab into an IR practice range.
- [ ] Firewall log analyser in Python. Parse OPNsense allow-and-log output and propose the tightened rule set for each VLAN. You need this anyway for phase 5 of your migration; publish it.
- [ ] Incident response playbook templates, open source. Malware on an endpoint, credential compromise, BEC, critical CVE. Markdown, generic, with decision points. Complements the playbook blog post.
- [ ] Phishing awareness kit for organisations that will not run simulations. Short training modules and posters. Unusual angle, real constraint you have lived with.
- [ ] Tabletop exercise pack: three scenarios with injects and facilitator notes, aimed at small IT teams.
- [ ] Cloudflare Worker utilities: a `security.txt` validator, or a tiny uptime and TLS expiry checker that posts to the status page you already run.

### Site improvements (small, when you feel like it)

- [ ] RSS to LinkedIn: post automatically when a new article ships (Zapier or a Worker with a cron trigger and the LinkedIn API).
- [ ] Weekly scheduled rebuild so the GitHub contribution graph stays fresh without a push (Cloudflare deploy hook plus a GitHub Actions cron, or a Worker cron trigger calling the build API).
- [ ] Reading list page fed from a markdown file.
- [ ] Photo of the actual homelab shelf on `/uses`, once there is nothing sensitive on the labels.

### Professional development

- [ ] Pick one certification for 2027 and log the study publicly. Candidates, in rough order of fit for incident response: GIAC GCIH, Blue Team Level 1 (BTL1), CompTIA CySA+. CCNA remains the highest-leverage networking gap per the register if you want to keep that door open.
- [ ] Line up two or three named referees before the next job hunt. Noted as open in the register.

## In progress

(nothing yet)
