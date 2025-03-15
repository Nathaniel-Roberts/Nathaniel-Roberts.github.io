+++
authors = ["Nathaniel Roberts"]
title = "Fortinet: Privacy Impact Assessment"
date = "2024-11-01"
description = "This paper is a retrospective PIA that examines the circumstances that led to a Fortinet Breach. It evaluates the effectiveness of the existing privacy controls, and recommends improvements."
+++

# Table of Contents
# Table of Contents
- [Table of Contents](#table-of-contents)  
- [Executive Summary](#executive-summary)  
- [Introduction and Methodology](#introduction-and-methodology)  
  - [Background on Fortinet Systems](#background-on-fortinet-systems)  
  - [Methodology](#methodology)   
- [Legal Framework](#legal-framework)  
  - [General Data Protection Regulation (GDPR)](#general-data-protection-regulation-gdpr)  
  - [Australian Privacy Principles (APPs)](#australian-privacy-principles-apps)  
- [Stakeholder Consultation](#stakeholder-consultation)  
  - [List of Stakeholders](#list-of-stakeholders)  
  - [Value of Input](#value-of-input)  
- [Risk Identification and Assessment](#risk-identification-and-assessment)  
- [Risk Mitigation Recommendations for Senior Management](#risk-mitigation-recommendations-for-senior-management)
  - [Enhanced Access Management](#enhanced-access-management)
  - [Ongoing Employee Training](#ongoing-employee-training)
  - [Data Minimisation Policies](#data-minimisation-policies)
  - [Incident Response Plan Updates](#incident-response-plan-updates)
- [Monitoring Plan](#monitoring-plan)
  - [Ongoing Evaluation](#ongoing-evaluation)
  - [Reporting Mechanisms](#reporting-mechanisms)
- [Legal Improvements](#legal-improvements)
  - [Law Recommendations](#law-recommendations)
  - [Industry Standards](#industry-standards)
- [References](#references)


# Introduction and Methodology

## Background on Fortinet Systems

Fortinet, a global cybersecurity provider, offers a comprehensive range of security solutions, including network firewalls, cloud security, and VPNs, designed to safeguard critical data and operational infrastructure. Central to Fortinet’s infrastructure are its cloud-based services, enabling secure data access and collaboration both internally and with customers. However, these services often involve third-party providers, which can introduce risks due to limited direct control over external data handling and security practices.

- **Fortinet’s Cloud-Based Services**: Fortinet’s cloud services support flexible data management and secure file-sharing capabilities. Integrating third-party platforms into these services provides operational agility but requires vigilant oversight to maintain consistent security standards across shared data environments.
- **Incident Overview – Third-Party Cloud File Drive Breach**: A recent breach occurred within Fortinet’s third-party cloud-based file drive, affecting files containing sensitive customer information. While this system is separate from Fortinet’s corporate network, the incident highlighted weaknesses in monitoring and access controls within the cloud-based file-sharing service, emphasising the need for stronger security measures in third-party environments.

## Methodology

This retrospective Privacy Impact Assessment (PIA) evaluates Fortinet’s privacy measures and identifies opportunities to enhance existing controls. This assessment follows the ISO/IEC 27701 and NIST Privacy Framework, providing structured guidance on privacy controls and risk management. The methodology comprises an assessment of existing controls, risk identification, and privacy improvement evaluation.

- **Assessment of Existing Controls**: This PIA begins by examining privacy and security measures within the impacted cloud-based system, such as access restrictions and monitoring protocols, to evaluate their effectiveness in preventing unauthorised access and enabling rapid incident response.
- **Privacy Risk Identification**: The assessment will catalogue the privacy risks exposed or heightened by the breach. Each risk will be analysed for likelihood and potential impact, covering unauthorised data exposure, regulatory implications, and potential reputational harm. This approach ensures a comprehensive risk assessment consistent with industry standards.
- **Evaluation of Privacy Improvements**: After identifying key risks, the PIA will recommend enhancements to Fortinet’s privacy and security controls, such as stronger access management, improved monitoring, and updated privacy policies for third-party engagements. Adhering to ISO/IEC 27701 and NIST standards, these improvements will aim to mitigate similar risks and reinforce Fortinet’s commitment to data security.

# Legal Framework

## General Data Protection Regulation (GDPR)

The GDPR governs the handling of personal data for individuals in the European Union (EU). Fortinet, as an international entity, must adhere to GDPR requirements when processing data related to EU-based customers, even in cases where processing takes place outside the EU. Key provisions include Article 32, which mandates appropriate technical and organisational measures to ensure data security, such as pseudonymisation, encryption, and rigorous access controls.

In response to unauthorised access, Articles 33 and 34 require Fortinet to notify the data protection authorities and potentially affected individuals if the breach is likely to pose a high privacy risk. GDPR also emphasises Data Minimisation (Article 5) and Data Protection by Design and by Default (Article 25), which may prompt Fortinet to reassess its third-party cloud storage configurations and access protocols. Australian Privacy Principles (APPs)

The Australian Privacy Act 1988 and its Australian Privacy Principles (APPs) set standards for how organisations should handle personal information in Australia. Given that Fortinet’s operations may involve Australian customers, these principles are relevant:

- **APP 1 - Open and Transparent Management**: Requires entities to manage personal data openly, with a publicly available, clear privacy policy. Fortinet’s privacy policy must be up-to-date and accessible, covering data handling practices, including third-party cloud services.
- **APP 2 - Anonymity and Pseudonymity**: Fortinet must provide users with options to remain anonymous or use pseudonyms where feasible, adding a layer of user privacy protection.
- **APP 3 & 4 - Collection of Solicited and Unsolicited Information**: APP 3 mandates that personal data collection is limited to what is necessary, particularly for sensitive information, while APP 4 provides guidance on handling unsolicited personal data. Fortinet’s policies should reflect these standards to avoid overcollection and ensure data relevancy.

- **APP 6 - Use or Disclosure of Personal Information**: APP 6 restricts the use or disclosure of personal data unless explicitly consented to or legally mandated. Fortinet’s protocols should enforce controlled access, particularly with third-party sharing.
- **APP 8 - Cross-Border Disclosure**: APP 8 mandates safeguarding personal data when disclosed to overseas entities, as in third-party cloud services. Fortinet must confirm these providers adhere to equivalent privacy standards to prevent unauthorised access.
- **APP 11 - Security of Personal Information**: APP 11 requires entities to protect data from misuse, loss, and unauthorised access. Fortinet’s security incident reveals a need for enhanced monitoring and access controls within cloud-based services to comply with this principle.

Fortinet’s compliance with both GDPR and Australian Privacy Principles reflects a commitment to robust data protection but indicates areas where improvements in monitoring, cross-border data handling, and transparency can further fortify privacy practices.

# Stakeholder Consultation

## List of Stakeholders

To comprehensively assess the impact of the breach and address privacy risks effectively, Fortinet’s stakeholder consultation should include:

- **Internal Teams**: Key internal groups include:

  - **IT and Cybersecurity**: This team offers technical insight into vulnerabilities within the system, particularly in the third-party cloud drive that was accessed. They provide essential information on potential system weaknesses, the data flow, and how existing controls performed during the breach. 
  - **Legal and Compliance**: Legal experts interpret regulatory obligations under frameworks like GDPR and the Australian Privacy Act, guiding Fortinet’s response strategy and ensuring compliance in communication, disclosure, and remediation.

- **Third-Party Service Providers**: Since the breach involved Fortinet’s use of a cloudbased file-sharing service, engaging this provider is critical to understanding how their security protocols and access controls may have contributed to the incident. Collaboration here is necessary to assess shared responsibility and evaluate service provider risk management practices.
- **External Forensic Experts**: Independent forensic experts play a vital role in verifying the breach's scope and assessing the technical aspects of the incident. Their insights help identify root causes, support containment measures, and ensure transparency in the investigative process.
- **Affected Customers**: Though the breach affected less than 0.3% of Fortinet customers, consulting this group is important for gauging the real-world impact on data privacy, trust, and security. Customer feedback may reveal additional risks and privacy concerns, guiding mitigation and communication efforts.

## Value of Input

Consulting these stakeholders is crucial to gain a holistic view of the incident and Fortinet’s responsibilities. Internal teams bring critical technical and legal expertise, enabling a robust evaluation of existing controls, gaps in security practices, and the alignment of response actions with regulatory requirements. For instance, Legal and Compliance experts ensure Fortinet’s response aligns with GDPR’s notification requirements, protecting the company from regulatory penalties and reputational damage.

Third-party service providers are essential for a thorough root-cause analysis, as their input highlights areas where security improvements are needed in vendor relationships and helps enforce contractual security obligations.

Involving external forensic experts adds an unbiased, detailed perspective on system weaknesses and validates Fortinet’s internal investigation, enhancing stakeholder confidence in the response measures.

Finally, affected customers provide insight into their security expectations, helping Fortinet prioritise customer concerns and adapt communication strategies. Their feedback on transparency and incident response can shape long-term privacy practices, reinforcing trust and customer relations.

# Risk Identification and Assessment

## Identified Privacy Risks

The breach involving unauthorised access to Fortinet’s third-party cloud file-sharing system introduces several significant privacy risks:

- **Unauthorised Access and Potential Data Exposure**: This risk includes the unauthorised retrieval of limited customer data, impacting less than 0.3% of Fortinet’s clientele. Exposure risks are heightened when sensitive or personally identifiable information (PII) is involved, increasing the potential for misuse.
- **Reputational Damage and Loss of Customer Trust**: Fortinet’s reputation as a cybersecurity leader is at stake following the breach. Affected customers may perceive that Fortinet's security controls are inadequate, leading to potential loss of client trust, decreased customer retention, and diminished brand loyalty.
- **Regulatory Penalties Due to Non-Compliance**: Fortinet is subject to stringent data protection laws, including GDPR for European customers and the Australian Privacy Principles (APPs) for Australian clients. Non-compliance could lead to financial penalties and legal scrutiny from regulatory bodies, further amplifying reputational harm.

## Risk Assessment

The following matrix evaluates each identified risk, categorising it by Likelihood and Impact to inform Fortinet’s prioritisation in risk mitigation efforts:

- **Unauthorised Access and Data Exposure** 
  - **Likelihood**: Medium – As Fortinet’s customer data was accessed within a third-party cloud system, the potential for access remains unless controls are enhanced. The likelihood is also influenced by the nature of shared data and Fortinet’s dependence on external providers. 
  - **Impact**: High – The unauthorised access of even a small subset of customer data could have substantial impacts, especially if sensitive information is involved. The exposure could lead to phishing attempts, identity theft, or further attacks.

- **Reputational Damage and Customer Trust Loss** 
  - **Likelihood**: High – Customers and stakeholders increasingly scrutinise organisations that suffer data breaches, particularly in cybersecurity sectors. The likelihood of reputational damage is high due to Fortinet’s role as a security provider. 
  - **Impact**: High – Negative publicity and reduced client confidence can result in both short-term and long-term losses, affecting brand value and customer loyalty, which could translate to lost business.
- **Regulatory Penalties for Non-Compliance** 
  - **Likelihood**: Low to Medium – Given Fortinet’s response to secure the breach and notify customers, immediate penalties may be avoided. However, the regulatory environment remains vigilant, and failure to meet GDPR and APP obligations in the future could raise likelihood.

  - **Impact**: Medium – Non-compliance penalties can vary in severity, with high fines potentially being imposed by regulatory bodies. The financial impact and associated legal costs would be significant, particularly if compounded by future breaches.

This initial assessment informs Fortinet’s need for prioritised, actionable steps in risk mitigation, targeting areas with the highest impact and likelihood. The risk matrix approach aids in effectively managing resources while maintaining compliance and customer trust.

# Risk Mitigation Recommendations for Senior Management

In light of the recent security incident, it is imperative for Fortinet to implement robust risk mitigation strategies to enhance data privacy and security. The following recommendations aim to strengthen existing privacy controls and prevent future breaches:

## Enhanced Access Management

To safeguard sensitive data, Fortinet should adopt role-based access control (RBAC) combined with multi-factor authentication (MFA). By enforcing RBAC, access to sensitive information can be limited to authorised personnel based on their specific roles, reducing the risk of unauthorised access. Implementing MFA adds an additional layer of security, requiring users to verify their identity through multiple methods, thereby significantly decreasing the likelihood of account compromise. Regular Audits of Third-Party Systems

Fortinet must increase the frequency and depth of security and privacy audits for all thirdparty systems. This should include a thorough evaluation of vendors’ security practices, data handling protocols, and compliance with relevant regulations. Conducting regular audits will help identify vulnerabilities early and ensure that third-party partners maintain stringent security measures aligned with Fortinet’s standards. Establishing clear communication channels for audit findings and recommendations is essential to ensure timely remediation of identified risks.

## Ongoing Employee Training

Fortinet should implement a comprehensive training program focusing on data handling, incident response, and security awareness for all employees. This training should cover best practices for protecting sensitive information, recognising phishing attempts, and following incident reporting protocols. By fostering a culture of security awareness, employees can become the first line of defence against potential breaches, significantly enhancing the organisation’s overall security posture.

## Data Minimisation Policies

To reduce the potential impact of future breaches, Fortinet should adopt data minimisation principles. This involves implementing stricter policies regarding data retention, ensuring that only necessary data is collected and stored on third-party platforms. Fortinet should regularly review its data inventory, identifying and eliminating unnecessary sensitive information to mitigate the risks associated with unauthorised access. Additionally, de-identifying or pseudonymising data where possible can further protect customer privacy in the event of a breach.

## Incident Response Plan Updates

Lastly, it is crucial for Fortinet to periodically review and update its incident response plan to incorporate lessons learned from the current incident. This should involve crossfunctional collaboration to ensure that all relevant teams are equipped to respond effectively to potential breaches in the future.

By adopting these recommendations, Fortinet can significantly enhance its privacy controls, safeguard customer data, and reinforce its reputation as a leader in cybersecurity.

# Monitoring Plan

To ensure the ongoing effectiveness of the privacy controls implemented following the recent security incident, Fortinet must establish a comprehensive monitoring plan. This plan should incorporate regular audits, privacy impact assessments, and feedback mechanisms to facilitate continuous evaluation and improvement of data privacy practices.

## Ongoing Evaluation

- **Regular Audits**: Fortinet should conduct quarterly security and privacy audits to assess the effectiveness of the new access management protocols, employee training programs, and data minimisation efforts. These audits will focus on compliance with internal policies and external regulations, providing insights into areas requiring further enhancement. The audit results should be documented, with specific recommendations for improvement.
- **Privacy Impact Assessments (PIAs)**: In addition to regular audits, Fortinet should implement annual Privacy Impact Assessments for new projects or changes in processes that involve personal data. These assessments will help identify potential privacy risks associated with new initiatives and ensure that appropriate controls are in place prior to implementation. By integrating PIAs into the project lifecycle, Fortinet can proactively address privacy concerns.
- **Feedback Mechanisms**: Establishing feedback channels for employees and customers is essential for understanding the real-world effectiveness of the implemented changes. Fortinet should create an anonymous reporting system where employees can share concerns or suggestions regarding data handling practices. Similarly, customer feedback regarding data privacy and security experiences can provide valuable insights into areas for improvement.

## Reporting Mechanisms

To ensure that privacy risks are continuously managed, Fortinet should establish clear reporting channels for all privacy-related issues. Regular updates should be communicated to senior management, including a monthly report summarising audit findings, incidents, and any identified vulnerabilities. These reports should include actionable recommendations for addressing any shortcomings.

Additionally, Fortinet should conduct biannual reviews with senior management and relevant stakeholders to discuss the effectiveness of the privacy controls in place. These reviews will facilitate strategic discussions on privacy risk management and allow for timely adjustments to the monitoring plan as needed.

By implementing this comprehensive monitoring plan, Fortinet can ensure that privacy risks are consistently managed and that the organisation remains vigilant in its commitment to data security. This proactive approach not only protects customer information but also reinforces Fortinet's reputation as a trustworthy leader in cybersecurity.

# Legal Improvements

In light of the recent security incident at Fortinet, it is imperative to advocate for enhancements in existing laws and industry standards to bolster data protection for organisations handling sensitive customer information. The following recommendations aim to address gaps in current regulations and promote a more robust legal framework.

## Law Recommendations

- **Stricter Third-Party Compliance Requirements**: Legislation should mandate that organisations engaging third-party service providers implement stringent compliance measures. This includes ensuring that vendors adhere to the same privacy standards as the primary entity. Regular compliance audits and assessments of third-party providers should be legally required to verify adherence to data protection protocols.
- **Mandatory Notification Periods**: Introduce legal requirements for organisations to notify affected customers and relevant authorities within a specific timeframe (e.g., 72 hours) following a data breach. Such a regulation would facilitate timely action for customers to mitigate potential harm and enhance transparency regarding the handling of personal data.
- **Regular Independent Audits**: Companies that handle sensitive customer data should be subject to mandatory annual independent audits conducted by thirdparty cybersecurity firms. These audits would evaluate the effectiveness of privacy controls and identify vulnerabilities, ensuring organisations maintain a high standard of data protection.

## Industry Standards

To further strengthen data security, industry standards should be established for organisations providing cloud-based services. Key recommendations include:

- **Stringent Encryption Protocols**: Regulations should require cloud service providers to implement end-to-end encryption for all stored and transmitted data. This ensures that even in the event of a breach, unauthorised access to sensitive information is significantly mitigated.
- **Robust Authentication Protocols**: Establish standards mandating the use of multifactor authentication (MFA) for accessing sensitive customer data. MFA serves as an additional layer of security, making it more difficult for unauthorised users to gain access to protected information.
- **Standardised Incident Response Plans**: Develop a framework that requires organisations to have standardised incident response plans in place, detailing the steps to take in the event of a data breach. This plan should include protocols for communication, investigation, and remediation efforts, ensuring that companies are well-prepared to respond to incidents swiftly and effectively.

By implementing these legal improvements and industry standards, Fortinet and similar organisations can enhance their data protection frameworks, ultimately fostering greater consumer trust and reducing the likelihood of future breaches.

# References

- Australian Government. (2023, October 18). [_Privacy Act 1988_](https://www.legislation.gov.au/C2004A03712/latest/versions). Www.legislation.gov.au.  

- Center for Internet Security. (2024). [_The 18 CIS Controls_](https://www.cisecurity.org/controls/cis-controls-list). CIS.  

- Cichonski, P., Millar, T., Grance, T., & Scarfone, K. (2012). Computer security incident handling guide. [_Computer Security Incident Handling Guide, 2(2)_](https://doi.org/10.6028/nist.sp.800-61r2).  

- [_CSA Security Guidance_](https://cloudsecurityalliance.org/research/guidance). (n.d.). Cloud Security Alliance.  

- [_Fact Sheet - Privacy by Design_](https://www.ipc.nsw.gov.au/fact-sheet-privacy-design). (n.d.). Information and Privacy Commission New South Wales.  

- Federal Trade Commission. (2021, February). [_Data breach response: A guide for business_](https://www.ftc.gov/business-guidance/resources/databreach-response-guide-business). Federal Trade Commission.  

- Fortinet. (n.d.). [_Fortinet | Deliver Network Security Digital Transformation_](https://www.fortinet.com/). Fortinet.  

- Fortinet. (2024, September 12). [_Notice of Recent Security Incident | Fortinet Blog_](https://www.fortinet.com/blog/business-and-technology/notice-of-recent-securityincident). Fortinet Blog.  

- [_Fortinet Security Fabric for Securing Digital Innovations_](https://www.fortinet.com/solutions/enterprise-midsize-business/security-fabric). (n.d.). Fortinet.  

- [_General Data Protection Regulation (GDPR) – Final text neatly arranged_](https://gdpr-info.eu/chapter-4/). (2013). General Data Protection Regulation (GDPR).  

- [_Guidelines 4/2019 on Article 25 Data Protection by Design and by Default_](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_201904_dataprotection_by_design_and_by_default_v2.0_en.pdf). (2020).  

- [_Guidelines 07/2020 on the concepts of controller and processor in the GDPR_](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-072020-concepts-controller-and-processorgdpr_en). (n.d.). European Data Protection Board.  

- ISO. (2019, August). [_ISO/IEC 27701:2019_](https://www.iso.org/standard/71670.html). ISO.  

- ISO. (2022). [_ISO/IEC 27001 standard – information security management systems_](https://www.iso.org/standard/27001). ISO.  

- Kral, P. (2012, February 21). [_Incident Handler’s Handbook | SANS Institute_](https://www.sans.org/white-papers/33901/). Www.sans.org.  

- NIST. (2024). [_Cybersecurity Framework_](https://www.nist.gov/cyberframework). National Institute of Standards and Technology.  

- Office of the Australian Information Commissioner. (2022). [_Australian Privacy Principles quick reference_](https://www.oaic.gov.au/privacy/australianprivacy-principles/australian-privacy-principles-quick-reference). OAIC; Australian Government.  

- Hernandez, P. (2018, August 10). [_Privacy Framework_](https://www.nist.gov/privacy-framework). NIST.  

- [_Top Threats to Cloud Computing: Egregious Eleven_](https://cloudsecurityalliance.org/press-releases/2019/08/09/csa-releases-new-researchtop-threats-to-cloud-computing-egregious-eleven). (n.d.). Cloudsecurityalliance.org.  

- Tunggal, A. T. (2023, October 25). [_What is the Cost of a Data Breach in 2020?_](https://www.upguard.com/blog/cost-of-data-breach). Www.upguard.com.  




