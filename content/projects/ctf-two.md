+++
authors = ["Nathaniel Roberts"]
title = "Capture the Flag #2  - Penetration Test Report"
date = "2023-10-11"
description = "This is the second of three CTFs I completed during my time at University"
+++
# CTF # 2 Penetration Test Report

**Report by: Nathaniel Roberts**

**October 11 , 2023**

## Table	of	Contents
- [CTF # 2 Penetration Test Report](#ctf--2-penetration-test-report)
  - [Table	of	Contents](#tableofcontents)
  - [1 Report Overview](#1-report-overview)
    - [1.1 Executive Summary](#11-executive-summary)
    - [1.2 Engagement Overview](#12-engagement-overview)
    - [1.3 Scope of Engagement](#13-scope-of-engagement)
  - [2 Technical Findings](#2-technical-findings)
    - [Technical Findings](#technical-findings)
    - [2.1 Lack Of Secure Encoding](#21-lack-of-secure-encoding)
      - [2.1.1 Critical Risk](#211-critical-risk)
    - [2.2 Unfinished Challenge](#22-unfinished-challenge)
      - [2.2.1 Unknown Risk](#221-unknown-risk)
    - [2.3 Unfinished Challenge](#23-unfinished-challenge)
      - [2.3.1 Unknown Risk](#231-unknown-risk)
    - [2.4 Unfinished Challenge](#24-unfinished-challenge)
      - [2.4.1 Unknown Risk](#241-unknown-risk)
    - [2.5 Unfinished Challenge](#25-unfinished-challenge)
      - [2.5.1 Unknown Risk](#251-unknown-risk)
  - [3 Ethics and Reflection](#3-ethics-and-reflection)
    - [3.1 Ethics](#31-ethics)
    - [3.2 Reflection](#32-reflection)
  - [4 Team](#4-team)
  - [5 Conclusion](#5-conclusion)
  - [6 Appendices](#6-appendices)
    - [6.1 Tools](#61-tools)



## 1 Report Overview

### 1.1 Executive Summary

Team 244, consisting of Nathaniel Roberts,*Redacted*, and *Redacted*, are seasoned
experts in the field of penetration testing. Macquarie University reached out to Team 244 to conduct
and oversee a Penetration Test, with the objective of uncovering vulnerabilities and security
concerns in their technological systems. The contents of this report highlight the specifics of this
agreement and propose solutions to enhance the security of their infrastructure.

Macquarie University established a virtual network for Team 244 to work within, with the objective
of identifying vulnerabilities to locate sensitive data, in this instance, flags. The team was given a
timeframe of 48 hours to exploit five potential vulnerabilities. This report outlines the methodology
and outcomes of all five vulnerabilities. Owing to the limited duration allocated for the attacks, not
all flags were uncovered. Just one of the flags were successfully identified and exploited.

The contents of this report include a Report Overview section, which provides a concise summary
of the key findings, as well as details on the scope and engagement of the study. Subsequent to this,
the Technical Findings section is presented, which delves into each vulnerability identified, the
strategies utilized to execute the attacks, and proposes measures to fortify the system's security
against future threats from malevolent actors. The report concludes with a final summary and is
followed by appendices that list the tools employed in the process.

During the course of this Capture the Flag event, we discovered three vulnerabilities within
Macquarie University's network. In terms of their severity, one of the vulnerabilities is deemed critical,
while the remaining two are unclassified due to an incomplete overview. For a comprehensive
understanding of these vulnerabilities, please refer to Section 2 of this report.


### 1.2 Engagement Overview

The Capture the Flag event was carried out by Team 244 on the servers of Macquarie University
from the 3rd to the 4th of October. The guidelines and focus of the engagement were as follows:

- The CTF is an open-book, team-based practical exam.
- Collaboration within the team is a critical component of the exam and is strongly
    encouraged.
- Interaction with individuals outside of one's own team is strictly prohibited.
- Disciplinary actions for plagiarism will be taken against anyone found communicating
    with members of another team or anyone external to the unit (you have been warned).
- The objective is to uncover as many flags as possible by identifying vulnerabilities in
    systems and/or web-facing servers.

### 1.3 Scope of Engagement

The parameters of this Capture the Flag event were confined to access to a single Kali Instance on
the server, as well as the following IP addresses:

- 10.244. 2.
- 10.244. 2.
- 10.244. 2.
- 10.244. 2.
- 10.244. 2.

Care was taken during the Capture the Flag to ensure that all activities remained within the
predetermined range of addresses. This was to avoid negatively impacting other participating
teams by interfering with their respective virtual machine instances. Since the competition was
set up in a virtual environment, there was no potential for service disruptions.

A comprehensive account of all tasks carried out is documented in this report.


## 2 Technical Findings

### Technical Findings

The following table presents the aggregate count of vulnerabilities identified during the Capture
the Flag, categorized according to their risk level. These risk levels were determined utilizing the
Common Vulnerability Scoring System (CVSS).

**Risk Level and Total Number of Discovered Vulnerabilities**

| Severity | Low (0.1-3.9) | Moderate (4.0-6.9) | High (7.0-8.9) | Critical (9.0-10.0) |
| --- | --- | --- | --- | --- |
| Vulnerability Count | 0   | 0   | 2   | 1   |

The following table breaks down the discovered vulnerabilities by overall risk score, im- pact, and exploitability. The scores were calculated using NIST’s CVSS v3.1 calculator.

**Summary of Vulnerabilities by Base Score**

| **Risk Summary** | **Overall Risk Score** | **Impact** | **Exploitability** |
| --- | --- | --- | --- |
| Lack of Web<br><br>Authentication | 9   | 8   | 10  |
| Lack of File Authentication | 7.5 | 5   | 10  |
| Lack of Process Control | 7.2 | 5   | 10  |
| Unknown |     |     |     |

### 2.1 Lack Of Secure Encoding

#### 2.1.1 Critical Risk

**Threat Level** : Critical (9.5)

**Description** :
The initial task in the Capture the Flag event was called the Sunlight Zone Challenge, titled "MasterChef".
This challenge revolved around a web-based exploit. The clue given to participants was: "Eighty-five is
alive!".

**Planning and Reconnaissance** :

To begin this Challenge, I browsed to the supplied IP Address (10.244. 2 .10), to look at the site.

The webpage contained instructions indicating that the flag could be located using the Navigation Bar.
While navigating through the page, I chose the "Flag()" option from the navigation bar, which presented a
dropdown menu with "Flag" as an available selection. Upon clicking this option, I was directed to a new
page, which is depicted in Figure 1.

![Figure 1](../images/ctf-two/figure1.png)
```
Figure 1 : 10.244. 2 .10 Flag Page
```
I check the HTML code to see if I could find anything that stood out to me. But initially, I couldn’t find
anything. I did some research on the hint and came across a band named kingfish, who had an album
titled “Alive in Eighty Five”. I also found a couple of books, most notably a book by Owen Clark, titled
“Eight-Five Still Alive”. This research came up with a dead end. I also researched the possibility that it
could refer to port 85. We also researched the topic of “Keep-Alive”.

I then started to investigate the hint given to us on the page. “You are viewing the desktop version of this


site”. So, I used Firefox’s developer tools to try and change the page to a mobile view. At this point in
time, there were no results from this train of thought.

We also considered the title “MasterChef”, and we thought that this is related to the “CyberChef”
product.

**Gaining Access And Exploitation** :
The first thing I tried was to see if I could use “ncat” to access the page on port 85. I used the following
command “nc 10.244.2.10 85 GET / HTTP/1.1 Host:10.244.2.10” this sent back “connection refused”.

We then decided to do a network scan to see if we could find any open ports. The command we used was
“nmap 10.244.2.10”. This was the result we received:

“Starting Nmap 7.93 ( https://nmap.org ) at 2023- 10 - 03 00:08 UTC
Nmap scan report for magnesium244.team244_ctf2 (10.244.2.10)
Host is up (0.000022s latency).
Not shown: 999 closed tcp ports (reset)
PORT STATE SERVICE
80/tcp open http
MAC Address: 02:42:0A:F4:02:0A (Unknown)

Nmap done: 1 IP address (1 host up) scanned in 0.35 seconds“

Port 80 is the only accessible port. And this was being used for the HTTP service.

We tried using the HTTP request function within CyberChef, to see what this did. We tried:
“GET [http://10.244.2.](http://10.244.2.)
GET [http://10.244.2.10/flag.php](http://10.244.2.10/flag.php)
GET [http://10.244.2.10/js/jquery.js”](http://10.244.2.10/js/jquery.js”)

The only response we received was “Network Error when attempting to fetch resource”
We then tried converting the entire script to and/or from Base85. And no progress was found here.
We then decided to use “BurpSuite” to investigate the site and intercept headers. We found that we could
change the useragent on BurpSuite to be a mobile device. Rather than just changing the page resolution,
this would change the behavior of the site.

We went to the developer tools within the BurpSuite browser and changed the User-Agent to be “Android
(4.0.2) Browser - Galaxy Nexus”. See Figure 2.

![Figure 2](../images/ctf-two/figure2.png)
```
Figure 2: 10.244.2.10 User-Agent Change
```
Once we reloaded the page with this new User-Agent. The text changed to “You are viewing the mobile
version of this site” Showing us we were on the right track. See figure 3.

![Figure 3](../images/ctf-two/figure3.png)
```
Figure 3: 10.244.2.10 Mobile Version of Page
```
Now that we had the mobile version of the site, we started to examine everything again. We found a new
header titled “X-Flag-Encoded” with the value of
“<~Ao(mg3\tA*@Q?2&1M1*+1,(FB2)@4'2I^5T3Ak>'A2$"u@K~>”. See Figure 4.

![Figure 4](../images/ctf-two/figure4.png)
```
Figure 4: 10.244.2.10 New Header
```
We put this header into “CyberChef” and decoded the string with base85. This gave us the following string,
**“flag:3f5b9273fbc2018538e6be595d3d091b”**. See figure 5. We threw this into the checker, and saw that we found the flag.

![Figure 5](../images/ctf-two/figure5.png)
```
Figure 5: 10.244.2.10 CyberChef Result
```
**Business Impact and Recommended Remediation** :

The page exhibited a substantial vulnerability, as the flag was directly visible in the headers of the
mobile request for this page. Despite the header being encoded, it could be easily decoded to reveal
its value. To address this issue, we recommend removing this data from the request field and placing


it in a less conspicuous location. If this is not feasible, an alternative solution would be to load the
desktop version of the site for all users, regardless of whether they are on a mobile device, in order to
better safeguard against this vulnerability.

**References** :

https://www.searchenginejournal.com/change-user-agent/368448/

https://www.datadoghq.com/blog/collect-apache-performance-metrics/
https://www.hostinger.com/tutorials/improving-website-performance-enabling-keep-alive

https://www.speedguide.net/port.php?port=

https://www.amazon.com.au/Eighty-Five-Still-Alive-Owen-Clark/dp/B0C2ST5WW

https://en.wikipedia.org/wiki/Alive_in_Eighty_Five

[http://www.robotstxt.org/robotstxt.html](http://www.robotstxt.org/robotstxt.html)

### 2.2 Unfinished Challenge

#### 2.2.1 Unknown Risk

**Threat Level** : Unknown

**Description** :
The Second Capture the Flag Challenge was the Sunlight Zone Challenge, “Trick the Genie”. The hint that
was provided was: “You'll need more than 3 wishes to grant the flag. This one’s a brute.”.

**Planning and Reconnaissance** :

We started this challenge by navigating to the provided address, 10.244.2.40. This address immediately
redirected to [http://flaggle./.](http://flaggle./.) To be able to gather more information, we needed to intercept before the
redirect to see what was happening. To do this we used BurpSuite. In the proxy settings we enabled
response headers and added a “match and replace” rule. We used this to match ”30[12] Found” and replace
it with “200 OK”. This allowed us to access the script for 10.244.2.40. Upon examining, we found a mainly
blank webpage with the text “The document has moved here.” with a hyperlink leading to “flaggle”.

We did some more research on Status Code 302 and found that it indicates that the resource that was
requested has been temporarily moved to a new URL. This is defined using the location header.

Upon trying to gain more information, we decided to try and use “gobuster” to try a large variety of URL
variations. The command we used was, “gobuster dir - u [http://10.244.2.40](http://10.244.2.40) -w
/usr/share/dirb/wordlists/big.txt”, this returned with an error containing the 302 codes. So, we ran the
command again, but excluding all responses with the Status Code of 302. “gobuster dir -u [http://10.244.2.](http://10.244.2.)

- w /usr/share/dirb/wordlists/big.txt -b 302”. This had no response, proving everything returned with the
redirect status code.

The next line of thinking was that the hint could refer to paths, and that the second half of the hint referred
to a brute force attack that needed to happen. So, we decided to use “WFUZZ” to try and brute force to URL
path. We ran the following command, “wfuzz -c -z file,/usr/share/dirb/wordlists/big.txt -z
file,/usr/share/dirb/wordlists/big.txt -z file,/usr/share/dirb/wordlists/big.txt
[http://10.244.2.40/FUZZ/FUZZ2/FUZZ3”,](http://10.244.2.40/FUZZ/FUZZ2/FUZZ3”,) but this returned with the following error: “/usr/lib/python3/dist-
packages/wfuzz/wfuzz.py:78: UserWarning:Fatal exception: FUZZ words and number of payloads do not
match!”. We fixed this by using the following command, “wfuzz -c -z file,small.txt -z file,small.txt -z
file,small.txt --sc 200 [http://10.244.2.40/FUZZ/FUZ2Z/FUZ3Z”.](http://10.244.2.40/FUZZ/FUZ2Z/FUZ3Z”.) The process kept crashing as it was trying to
compute of 88 million different possibilities. We also tried “wfuzz -w /usr/share/dirb/wordlists/big.txt --sc
200 [http://10.244.2.40/FUZZ.php”.](http://10.244.2.40/FUZZ.php”.) But this didn’t return anything, confirming the Status 302 problem we
thought earlier.

We didn’t have any more time to spend on this task.
**Business Impact and Recommended Remediation** :

Unfortunately, we did not progress enough in this task to make informed Recommendations and
Remediations.


**References** :

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/

https://portswigger.net/burp/documentation/desktop/external-browser-config

https://vk9-sec.com/bypass-30x-redirect-with-burpsuite/

https://www.youtube.com/watch?v=ouDe5sJ_uC


### 2.3 Unfinished Challenge

#### 2.3.1 Unknown Risk

**Threat Level** : High (7.1)

**Description** :
The Third Capture the Flag Challenge was the Twilight Zone Challenge, “Covid- 23 ”. The hint that was
provided was: “Have you been double vaxxed? We.. will.. We... will...”.

**Planning and Reconnaissance** :

We started this challenge by navigating to the page, 10.244.2.20, and seeing the message “Welcome!”.
Nothing initially stood out from examining the HTML and source code. Considering the hints, we think the
clue could have something to do with an injection. See Figure 6.

![Figure 6](../images/ctf-two/figure6.png)
```
Figure 6: 10.244.2.20 Main Page
```
Within the storage section of the Developer Tools, there was a cookie,
“aWQ9NTYyNDMmYXV0aHVzZXI9MA”, See Figure 6, being actively stored onto the page. We did some
research on sessions cookies to gather more understanding. Upon testing with options in the address bar,
we came to the conclusion that we might be able to do some form of code injection into the address bar.

We then used CyberChef to decrypt the cookie using base64 encryption. The result was the following,
“id=56243&authuser=0”. See Figure 7.

![Figure 7](../images/ctf-two/figure7.png)
```
Figure 7: 10.244.2.20 CyberChef Result
```
**Gaining Access And Exploitation** :

We decided to continue on the path of the encrypted cookie. Our first step was to modify said cookie. We
change it to be “id=56243&authuser=1” and then re-encrypted it using bae64. The result was
“aWQ9NTYyNDMmYXV0aHVzZXI9MQ”. See Figure 8.

![Figure 8](../images/ctf-two/figure8.png)
```
Figure 8: 10.244.2.20 CyberChef Result 2
```
We then tried using BurpSuite to modify the headers and send the new cookie. This, unfortunately, did not
work. We then tried to send new HTTP requests with Firefox Developer Tools. We tried this on both
“/flag.php” and “/flag.php/admin”.


We then started considering the hint of “We.. will.. We.. will...”. This instantly made us consider the
rockyou.txt file in the dirbuster wordlists. We ran the command, “gobuster dir -u [http://127.0.0.1/](http://127.0.0.1/) -w
/usr/share/wordlists/dirb/common.txt -d -c ‘id=56243&authuser=1’ -b ‘404,403’”. This had a very large
amount of error messages pass through. But we let it run for a while, for the brute force attack to continue.

We then tried navigating to 10.244.2.20/siteadmin using the modified cookie. We reached a new page that
had a username and password field. See Figure 9. We then tried using the following SQL injections to see
what was accessible. We tried “‘ OR ‘1’ = ‘1” which had no result. We then tried “‘ OR 1=1—“ which resulted
in the following return “Nice try, but SQL injection won't work here.” See Figure 10. We then tried loading
the rockyou.txt into BurpSuite to use as a payload to brute attack the login and password fields. BurpSuite
kept aggressively crashing.

![Figure 9](../images/ctf-two/figure9.png)
```
Figure 9: 10.244.2.20 SiteAdmin Page
```

![Figure 10](../images/ctf-two/figure10.png)
```
Figure 10: 10.244.2.20 SiteAdmin Page SL Injection Fail
```
We then attempted to insert “<script> alert() </script>” into the text fields. But there was no response,
making us believe that an XSS attack is not possible on this site.

We then started to use goBuster to force attack the login prompt on the page, but the CTF ran out of time
as we were in the middle of a brute force script running.
**Business Impact and Recommended Remediation** :

Although we didn’t finish the challenge, we still gained enough information to create an informed
recommendation.

We recommend not using Cookies for site authentication, because these can be easily manipulated. If
you need to use cookies in this scenario, encrypt them using a more secure tool than Base64. Base
can be easily decrypted and manipulated, creating an ease of vulnerability finding.

**References** :

https://www.ibm.com/docs/en/i/7.1?topic=emulator-session-id

https://securiti.ai/blog/session-cookies/

https://www.plesk.com/blog/various/web-app-injection-attacks/

### 2.4 Unfinished Challenge

#### 2.4.1 Unknown Risk

**Threat Level** : Unknown

**Description** :
The Fourth Capture the Flag Challenge was the Twilight Zone Challenge, “Falling to Pieces”. The hint
that was provided was: “Can you put me back together?”.

**Planning and Reconnaissance** :

To begin this challenge, we navigated to the page 10.244.2.30. The page we were presented with said “This
puzzle has 4 pieces. Can you find them?”. See Figure 11.

![Figure 11](../images/ctf-two/figure11.png)
```
Figure 11: 10.244.2. 30 Page
```
Part 0 was found in the Network section of the Developer Tools. There was a GET request to
[http://10.244.2.30/img/part0.](http://10.244.2.30/img/part0.) See Figure 12. This contains links to black and white images, called imagedoc-
darknoise.png and imagedoc-lightnoise.png.

![Figure 12](../images/ctf-two/figure12.png)
```
Figure 12: 10.244.2.30 Part0 Img
```
The image appears to resemble a search bar. The image dimensions are 678*50 pixels.

If we view the robots.txt file, we can see that /admin has been disallowed. If we navigate to this page it
says, “This page has moved to [http://admin.ctf/”.](http://admin.ctf/”.) This webpage cannot be found.

We then tried to create a site map using goBuster for this page. We used the command “gobuster dir -
u [http://10.244.2.30](http://10.244.2.30) -w /flag.php/”. Only returned errors.

We then found a ‘X-Powered-By’ header, similar to what was seen in Sunlight Zone; “MasterChef”.
We attempted multiple alterations to the user-agent to reveal the flag, but with no result.

**Business Impact and Recommended Remediation** :

Not enough information was found to recommend informed remediations on this challenge.

### 2.5 Unfinished Challenge

#### 2.5.1 Unknown Risk


**Threat Level** : Unknown

**Description** :
The Fifth Capture the Flag Challenge was the Midnight Zone Challenge, “Take Command!”. The hint that
was provided was: “Order a retreat for victory. Colour has an executive function.”

**Planning and Reconnaissance** :

We started this challenge by navigating to 10.244.2.50. What we found was a html form and input. See
Figure 13.

![Figure 13](../images/ctf-two/figure13.png)
```
Figure 13: 10.244.2.50 Page
```
We first off tested for an XSS attack using “<script> alert(“1”) </script>” in the text input field. This worked
as you can see in Figure 14.

![Figure 14](../images/ctf-two/figure14.png)
```
Figure 14: 10.244.2.50 XSS Attack
```
We searched the HTML and found the following code that made it possible.
```
“<p style=color:red> [raw text from input`] </p>”. Which was manipulated to be, “<p style=color:red><script>alert(“1”)</script></p>”.
```

We then proceeded to try a large variety of XSS attacks to try and gain more information on where there
might be a vulnerability. The following attacks were attempted.

```
“<script>document.getElementById('col').style.color = 'red'; </script>”
“<script>document.body.style.backgroundColor = 'yellow'; </script>”
“<script>document.getElementById('blurb').style.display = 'none'; </script>”
```
None of these resulted in any obvious clues or hints. By this time, we had run out of time to continue the
CTF.

**Business Impact and Recommended Remediation** :
Although we were unable to abuse the vulnerability, this site is susceptible to XSS attacks. This is a
massive vulnerability, as any script could be run inside the text box. This can cause a large array of
issues as well as creating a wide-open doorway for malicious attacks to enter through. To improve
the security of the site, we recommend ensure all text fields are not susceptible to XSS attacks.


## 3 Ethics and Reflection

### 3.1 Ethics

Maintaining ethical standards in penetration testing is critical, A strict confidentiality agreement must be
adhered to. This means that any data and information gathered during the penetration test can only be
shared with individuals who are authorized to view it. This imposes a duty to safeguard and maintain the
confidentiality of all data found during the test.

It's also crucial to operate within the boundaries set in the engagement scope, detailed in Section 1.3.
Straying from this path could lead to unethical hacking. Moreover, it is important to be upfront about all
vulnerabilities found, which are outlined in Section 2 of this report.

Throughout this Capture the Flag (CTF) event, all data discovered was recorded to ensure full
transparency of our actions. We also carefully followed the scope of the engagement and made sure not to
disrupt the efforts of other teams participating in the challenge.

### 3.2 Reflection

This Capture the Flag event was another fantastic opportunity to delve into the realm of ethical hacking.
This was my second CTF, and I found it just as engaging as my first. The experience was smoother this
time around, as I was already familiar with the structure of these challenges and how CTF’s operate. With
this foundational knowledge in place, I eagerly tackled the challenges, applying and further developing a
diverse set of skills that are not only beneficial for my career but also for future CTFs. I was reminded that
sometimes the simplest solutions are the most effective. In several tasks, we initially overcomplicated the
issues we faced, and I realized that stepping back and looking at the problem from a different perspective
could have led us to the solution much faster.

Despite our best efforts, we managed to solve only one of the five challenges and faced difficulties with the
remaining ones. Although we made significant progress and came close to finding several flags, we ultimately
fell short of locating them all. Nonetheless, the experience was enriching, and the lessons learned will be vital
in future attempts.

## 4 Team

I had the fortunate opportunity to join a team where everyone truly committed themselves. We
successfully balanced working individually and collaborating as a group. We divided the challenges
amongst ourselves, each tackling a different puzzle independently, which helped save time. We regularly
shared our findings and discussed potential issues to ensure no mistakes were overlooked. When any of
us hit a roadblock, we would swap roles, bringing in a new perspective to overcome the challenge. In the
case of particularly difficult flags, we would come together to pool our knowledge and skills.


## 5 Conclusion

This marks the end of the Penetration Test report carried out by Team244 from October 3rd to 4th, 2023. The identified security vulnerabilities encompassed improper encoding, inadequate cookie
management, and potential SQL or XSS attacks and injections. We trust that the suggested
measures in this report will assist Macquarie University in enhancing the security of their future CTF events.

This CTF challenge was both enjoyable and demanding, and we anticipate engaging in further
collaborations with Macquarie University shortly.

## 6 Appendices

### 6.1 Tools

| **Name** | **Description** | **Link** |
| --- | --- | --- |
| Nmap | Network and vulnerability scanner | <https://nmap.org/> |
| Curl | URL Manipulation Tool | <https://github.com/curl/curl> |
| DIRB | Directory Brute Force Tool | <https://github.com/v0re/dirb> |
| Gobuster | Directory Brute Force Tool | <https://github.com/OJ/gobuster> |
| Burp Suite | Web Request Manipulation Tool | <https://portswigger.net/burp> |
| wFuzz | Web Application Fuzzer | <https://github.com/xmendez/wfuzz> |