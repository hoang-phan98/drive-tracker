FIT2101: Software Engineering Process & Management Risk Register
---

#### Scum Masters <br/> Kenny Ye, Hoang Phan, Erica Son, Marc Porciuncula, Ellen Anastasia, Fenghe Shen

---

## Summary
This document identifies and describes several risks in the project “Drive Tracker”. The report contains the likelihood and impact of each risk, and evaluates their resulting overall priority which will inform the team in looking out for them.

Furthermore monitoring strategies as well as mitigation and contingency plans are detailed in depth and will be practised by the team to reduce the potential effect of these risks.

## Risk Register
|Risk No.|Risk Description|Category|Probability|Impact|Score|
|--|--|--|--|--|--|
|1|Team members producing low quality code due to inexperience with the language/framework|Technological/Quality|Very Likely|High|16|
|2|Tasks found to be infeasible mid sprint|Feasibility/Management|Unlikely|High|8|
|3|Stakeholder requirements changing|Stakeholders/Requirements|Very Likely|Medium|12|
|4|Inexperience with git resulting in inappropriate merge, erasing established work|Technological|Rare|Severe|5|

## Risk Matrix
|Impact\Probability|1 Rare|2 Unlikely|3 Likely|4 Very Likely|5 Almost Certain|
|--|--|--|--|--|--|
|5 Severe|5|10|15|20|25|
|4 High|4|8|12|16|20|
|3 Medium|3|6|9|12|15|
|2 Low|2|4|6|8|10|
|1 Negligible |1|2|3|4|5|

## Risk Strategies
### 1. Inexperience with the language/framework
#### Description
Many of the team members have only had experience with the client side coding of JavaScript. Hence there is a risk in the team’s general unfamiliarity in coding web applications in this language. A consequence of this is potentially low quality code being written and poor design choices being made. This will accumulate technical debt and may slow the project’s progression especially in the later stages of development. Furthermore this may lead to code needing to be rewritten or heavily formatted, and a resulting waste of resources that will delay the shipping of features resulting in a very high impact. Since most of the team have not had direct experience with web development, low quality code being written is very likely.

#### Monitoring Strategy
- Constant peer review will be performed on newly written code to ensure quality, correctness and good design choices. This allows poorly written code to be caught before it gets merged into the master branch and dealt with appropriately.
- Detailed design documents such as class and sequence diagrams will be kept to visualise the program design. These can be used to judge the effectiveness of design choices as it gives a visual representation of the project.
- Daily stand up meetings are to be held where members share what they’re currently doing and if they are having any problems. This gives members a chance to ask for help and lets the team monitor the status of code currently being written.

#### Mitigation/Contingency plan
- Enforce good design and documentation principals during coding to ensure good software architecture and minimise risk of accumulated technical debt. (Avoidance)
- Development and debugging is to take place in a local branch and when ready to merge, peer review is to take place. An allocated project merger/approver is to thoroughly examine the new code before merging into master to further mitigate the risk of poor final code and technical debt. (Avoidance)
- Furthermore, all team members are to do their own research on the language and libraries to be used in this project in order to familiarise themselves as much as possible. Team members experienced with the language and framework will also provide help and advice to other members. This reduces the risk that the team’s inexperience will cause. (Avoidance/Reduction)

### 2. Tasks found to be infeasible mid sprint
#### Description
If a task is found to be infeasible mid sprint, the repercussions may be that the sprint’s planning becomes invalid. The persons assigned to that PBI will need to be re-assigned tasks and if this happens well into the sprint, the amount of progress might be minimal. This feature will later have to broken down into more doable items and this will also delay the ship date of the project. This is unlikely as items on the sprint backlog should have undergone thorough planning and checking, but the consequences are quite high.

#### Monitoring Strategy
- Also part of the strategy to deal with the risk of language/framework inexperience, members of the team are expected to do individual research on the technologies used and, as a result, potentially identify infeasibility or roadblock in earlier stages of the project.
- The daily standup is a meeting to discuss the progression of tasks during the sprint. If there are potential difficulties, they should be caught early through open discussion between team members.

#### Mitigation/Contingency plan
- As mentioned before, enforcing good design and software architecture (for instance, an architecture with minimum coupling between classes/packages) could reduce the damage of an unexpected roadblock by providing the flexibility to make changes. Additionally, elaborate and detailed design documentations allow the team to trace and isolate other affected components to limit the damage.
- Sprint backlogs are to be carefully reviewed and examined to identify potential risks concerning infeasibility before moving on with the sprint. Once identified, the issue must be discussed with the product owner promptly for replanning.
- If a task is found to be infeasible, the sprint is to be re-planned and backlog items are to be changed or moved in a timely manner to minimise the damage. The team will meet with the product owner who will carefully re-prioritise and assign tasks to not steer away from the project development timeline.
- If a major revision is required or the project is found to be infeasible on a root level, the team should discuss and choose from the technology alternatives provided in the project plan. It is, again, important that the design of the system is flexible and not dependent on a particular technology to enable fast reconstruction of the system on the newly chosen platform and framework. However, this implies that the timeliness of the project will be affected due to restarting and it is the team’s responsibility to communicate with stakeholders about the delay and accept potential impact on stakeholder satisfaction.


### 3. Stakeholder requirements changing
#### Description
It is likely that throughout the course of the project stakeholder requirements will change. This is unavoidable but may affect the overall progression of the project if the changes are large, structural or have bad timing. This is very likely as it is the nature of an Agile methodology and it has a medium impact which can vary depending on the circumstances in which it occurs.

#### Monitoring Strategy
- Unlike discovering late-stage infeasibility in the project, changing requirements from stakeholders is largely a external factor difficult to predict or monitor. Therefore having well-prepared contingency plans is more important than monitoring or predicting such risk.
- The best way to monitor this is to ensure constant and open communication with the client so that the team is aware of their opinion and possible dissatisfactions with the current version of the project.

#### Mitigation/Contingency plan
- A well-designed, flexible architecture enables components of the system to be changed/replaced without impacting the rest of the system. This is especially useful if stakeholders want to have one particular feature changed as the developers can easily modify and change the said feature/component while keeping the remaining structure intact.
- Being familiar with the language/framework could also mitigate this risk since members could provide alternative solutions or workarounds without having to resort to other technologies/platforms which would require more time and effort to research and study.
- If a requirement changes, the team will re-organise the product backlog;  backlog items will be updated or moved accordingly, to ensure that the project adheres to the development timeline. Backlog items should be self contained and so a change in requirements should not affect more than a few items.
- Daily standups also helps to relay requirement changes to all team member, keeping them informed and preventing members spending time on outdated product backlog items.
- Assuming that the new requirements are found to be difficult or infeasible to implement, the team will negotiate with stakeholders to reach agreeable terms.

### 4. Inexperience with git
#### Description
Inexperience with git can cause inappropriate merges which may erase established work. This is a risk with highly severe consequences as any extent of progress may potentially be lost. However due to the access configurations of team members the likelihood of this occurring is very unlikely.

#### Monitoring Strategy
- Project merger/approver option must be enabled in the git project settings to establish a strict quality control process. The elected mergers are responsible for monitoring the code quality.
- Code mergers will be responsible for monitoring the state of the git repository as they are the ones who are responsible for resolving merge conflicts.
- Daily stand up meetings are to be held where members can ask questions regarding git to improve overall developer confidence and to prevent potential mistakes.

#### Mitigation/Contingency plan
- Experienced git users or project merger in the team should give tutorials sessions or relay important git information to other members to improve their overall skills, and members should communicate with each other frequently about their development progress to limit the possibilities of misunderstanding and mistakes. Additionally, team members are to conduct individual research and study on git in order to become more experienced.
- The Git Project merger/approver is to regularly backup and clone the repository in the case that an unrecoverable mistake was merged onto the master branch. This way the team could fall back to and continue on earlier functioning copies of the repository to minimise the damage.
- Team members must debug and develop on their individual branch prior to merging. This allow errors to be found and dealt with in a contained environment.
- Additionally, peer reviews are to be conducted to ensure the quality of the code and the project merger will carefully examine each merge request to prevent damaging git merges or sub-par code quality.
- Team members are to commit regularly to allow sufficient recovery points in the event that a roll-back is necessary. In addition to that, members should attach a meaningful message to each git commit (local or master) to keep a detailed changelog so that pinpointing the error-causing commit is straightforward and clear.
