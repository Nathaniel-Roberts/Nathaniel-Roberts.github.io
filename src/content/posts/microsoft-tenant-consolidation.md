---
title: "The Great Microsoft Tenant Consolidation: A Migration Story"
description: "How a three-person engineering team merged four Microsoft 365 tenants into one for a growing group of schools, in a month, with 25 TB of data and live systems that could not go down."
date: 2025-11-16
tags: ["microsoft-365", "migration", "identity", "okta", "automation"]
---

At the beginning of Melos Education's journey, starting new schools and welcoming existing ones into the group, there were countless decisions to be made. One of the most significant was how we were going to manage Microsoft tenants across a growing organisation.

The business decision at the time seemed reasonable. We wanted each school to keep its own autonomy, its own branding and its own SharePoint URLs, and those requirements pointed to a separate tenant per school. It worked fine at the very beginning. Managing three tenants (one large school with plenty of active work and ongoing management, plus two smaller schools that were essentially set and forget) was manageable, and thanks to Microsoft Edge profiles, switching between them was not too painful.

Then we had to create a fourth tenant, and the group was growing quickly.

We came to a realisation: this approach was not going to be sustainable. Managing multiple tenants would lead to confusion, misconfigurations and an enormous amount of duplicated work across policies and configuration. We only had one large school, two smaller schools and a head office at that point, but more schools were joining and we would end up managing all of their tenants too. We decided to act while the problem was still four tenants, and consolidate all of them into one.

This was the start of a long journey.

## Finding a path forward

Where do you even begin with something like this? We had never done a tenant-to-tenant migration before. Some quick research and a project scoping meeting showed that Microsoft's native tooling would not do what we needed, and the alternatives either did half the job or were very expensive. With every other project running at the same time, doing it manually was not achievable.

We reached out to external parties. They did their jobs well, which is to say they sold us the promise of every outcome we wanted. After months of back-and-forth discussions, scoping and meetings, they gave us their solution: a tool that would cost over $100,000, plus a lot of billable hours.

That was not achievable for us. We had budgeted considerably less for this one project among the many we tackle every year. We did not end up spending the $100,000, but the time lost in those discussions shrank our project timeline from six months to one.

Thankfully, we quickly found an option within budget that would achieve the outcomes we wanted. It would need significant manual work to map users, clean up data and orchestrate the migration, but it was doable.

A few quick meetings and an invoice later, we set off.

## The build phase

We had two priorities: learn the limits of what the tooling could help with, and start rapid development on our own in-house scripting to manage mass updates and user creation across all of our systems. The engineering team, three of us, spent the entire month leading up to cutover day in deep work and even deeper learning.

We ran into plenty of issues that halted progress and needed quick brainstorming sessions to get past.

### The domain problem

A domain can only exist in one tenant at a time. That meant creating every user in the new tenant with a temporary domain, mapping and migrating all of the data, updating every user in the old tenant to a different domain, then moving the primary domain across and updating every user in the new tenant. Quite the task. It took extensive planning and diagramming to make sure each step happened at the right time and in the right order.

### The username format

Years ago we had changed our email format from `firstinitiallastname@` to `firstname.lastname@`. Anyone who had been with us before that change still had a legacy username. We decided to standardise everything during the migration, which meant changing usernames across all of our services. We use Okta as our identity provider, which helped a great deal, but it still added another layer of complexity.

### PowerShell in production

Many of the things we needed to do in Microsoft were not available through the Graph API. We ended up running PowerShell scripts in Kubernetes, triggered from our automation platform. Anyone who has administered Microsoft at scale knows that getting PowerShell to do exactly what you want can be a real pain.

### The Intune device shuffle

We also had to deal with device cutovers for Intune. We had just ended the lease on our Windows fleet and had new devices to set up, so we deliberately delayed deployment and built all of the new devices in the new tenant, replicating the Intune settings. For the couple of weeks of overlap, users had to be able to sign in with a local account pointed at the old tenant, with their old username on a different domain, without any impact on service. Once we had worked that out we handed it to the service desk team, who did an excellent job of running that transition and dealing with everything else that came up along the way. They were a massive help.

## Testing and refinement

We drafted a migration timeline and tested it on a smaller school first. We updated and refined the process, migrated that school successfully, then tested again on the next school and refined it again. The timelines were tight: for the smaller schools we had only an hour or two of downtime and cutover.

Another challenge was that these were live systems. New data was being created constantly, so we did large initial migrations followed by daily incremental syncs right up to the cutover. Once we blocked sign-in to the old tenant we could run a quick final migration before letting people into the new one, so almost nothing changed underneath them.

The longest part? The thing the whole world has been struggling with lately: DNS. Swapping email over to the new tenant meant a short window where mail was undelivered. That was our only data loss and downtime, and management was fine with it.

## The big day

With the timeline locked in, we had our biggest school left: 230 staff and 1,300 students, with 25 TB of data across the three tenants being merged.

We gave ourselves a full day of shutdown during the school holidays, the day before a public holiday, so everything had time to settle and we could find any problems. After a long day of migrating, following the timeline meticulously and running check after check, we had done it. Three Microsoft tenants moved into the fourth.

The stressful moments were waiting for email to start arriving after the DNS cutover, making sure we had federated the domain correctly with Okta, and confirming that sign-in actually worked for our users.

## The aftermath

There were some lingering issues with applications caching the old tenant ID at sign-in, so people had to reset their apps, but overall it went as smoothly as a project of this size should.

Most staff did not notice any difference, and the few who had problems were sorted out quickly. We had timed the migration so the following week was a professional development week, which gave us the time to walk staff through resetting their Microsoft apps and making sure they were signed into the new tenant for licences and data. Our service delivery team helped enormously here, working through the transition with 150 staff at once.

## The results

The time savings have been substantial. Policies are created once. People can have accounts and aliases across multiple schools, or sit in Teams across schools, with a single account, and no more signing in and out of four different ones. Everything lives in one place for end users, and on the back end every configuration happens once and applies to everyone.

## Lessons learned

If I had to do this again, I would set aside more time from the beginning. Much of the compressed timeline came from the uncertainty with external providers, which we could not change in the moment, but more breathing room would have saved the team stress and a few long evenings. I would also put more into documentation and process for end-user adoption, with better communication about the change and why we were doing it.

Personally, I grew a lot through this project. My knowledge of PowerShell, the Microsoft APIs, Kubernetes, user management, project design, timeline management and scoping, particularly realistic scoping, all improved considerably.

As a team, we now approach large projects with more confidence. Having completed a migration of this size, we are better placed as we move toward a single pane of glass for management. It gets easier each time, especially as more schools join the group and we look toward the next migrations.
