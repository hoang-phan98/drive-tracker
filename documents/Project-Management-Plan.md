FIT2101: Software Engineering Process & Management </br> Project Management Plan <br/> Drive Tracker
---

#### Scum Masters <br/> Kenny Ye, Hoang Phan, Erica Son, Marc Porciuncula, Ellen Anastasia, Fenghe Shen

---

## Summary

The report discusses the techniques and procedures the team will follow in implementing the project “Drive Tracker”, a versatile tool to for assignment markers and team members  to monitor contribution in Google Drive. Drive Tracker will behave just like the “gitinspector” tool for git repositories.

This report details the  roles and responsibilities of all team members currently working on this project. It describes the s process model that the team will use, protocols that must be followed,the project vision and definition of done.

Attached to this report are documents that address some key design decisions that were made in analysis of alternatives reports. These decisions concern:
- Target platform
- Languages
- Frameworks and libraries

There is also a Risk Register identifying possible risks in this project as well as mitigation and contingency plans.

## Project Mission

For students or educational institutions who need to track the contribution and efforts of individuals to a Google Drive, the Drive Tracker is a tracking and management system that analyses various contribution factors in an existing Google Drive folder and displays this information in an easy-to-read user interface.

Unlike traditional contribution trackers such as gitinspector, which require the use of version control and only support plain text files, our product can be used to visualise contribution data for files and rich text documents in Google Drive folders with no prior setup and no maintenance.

## Project Context

### Process Model
The process model that will be used in the project is a modified version of SCRUM. From a high level perspective, SCRUM is a light-weight iterative process model that utilises various agile methodologies particularly interaction between the team and stakeholders to develop working products fast and efficiently.

Our version of SCRUM includes the following:
- Product Backlog: all future stories (features to be implemented) are stored in this artefact.
- Sprint Backlog: stories that are planned to be done in the current sprint are put in this artefact.
- Sprint: A period of 7 days where certain amount of pre-determined stories are to be completed.
- Standups Messages: A message that will be posted in the team chat that details work that has been done recently, if there are any blockers, and any issues or additional points regarding anything related to the current status of the project. These messages should be as frequent as required, but are not needed if none of the aforementioned points are applicable.
- Weekly Sprint Planning/Estimations: Every Friday, stories from the product backlog are assessed by priority and difficulty to determine which stories will be part of the next sprint starting Monday.
- Client Meetings: During the tutorial on Friday 1:00pm - 4:00pm the current build will be shown to the client and clarifications and extensions to  the project can be made.

The main modifications to SCRUM that are implemented in our version are specifically tailored to accommodate the structure of University and variable availability of each team member every week. Traditional SCRUM requires of lot of face-to-face collaboration which might not be possible with each student’s timetable, to counteract this, meetings will be scheduled and conducted online.

Also due to the size and scope of this particular project, Weekly Sprint Plan Meetings which are usually timeboxed within 3-4 hours (cannot exceed this time) are impractical, rather these meetings are to be drastically shortened to be timeboxed within 30 minutes instead. This is considered to be more than sufficient for estimating and generating the Sprint Backlog for the coming week.

### SCRUM management tools
The Product Backlog and Sprint Backlog are to be located on a ‘Story Board’ on Trello (https://trello.com/b/9dSUPl18/story-board)

The bugs are to be located on a separate “Bug board” on Trello
(https://trello.com/b/J0o1YzaP/bug-board)

Standups messages are done through Facebook Messenger and the contents of these standups will NOT be formally recorded (Invite link is to be provided by Scrum Master)

Weekly Sprint Planning/Estimations are also done through Facebook Messenger although the contents of these sessions will be directly reflected in the Product Backlog and Sprint Backlog.

### Protocols

#### Developers
- When working on a specific feature, developers are to NEVER work on the master branch, they have to always create a feature branch.
- Written code should be well-documented ,easy to read and follow specified style guide.
- All code committed must first be formatted by the prettier code formatter.
- When a story is deemed complete by a developer, they are to request a pull request.
- A pull request can only be merged by one of the designated reviewers.
- A developer is NEVER to review/accept their own pull requests.
- A developer must attach the Trello URL(the system currently being used to track stories and bugs) in the merge request message of a branch for trackability of stories.

#### Quality Assurance
- Before a pull request can be made, the program must compile and run.
- The pull request will have to reviewed by the team member that is conducting the pull request.
- A comprehensive test plan is NOT required due to the size and nature of the project. But quick sanity checks before and after a branch is merged in is critical.

#### Designs
- Designs should be created upon inception and should reflect the project requirements.
- Designs should be updated immediately after project requirements change or if a clarification is made.
- All project UI and functionalities should be based on the designs
- Ambiguities in the designs are to be brought up immediately and resolved in-house through Facebook Messenger, if complications persists, resolve with client.

#### Other
- If a team member finds that they have finished their allocated stories for the sprint earlier than expected (over estimation) then they are to report to the Scrum Master who will decide if more stories can be allocated to the team member, or if stories can be deloaded form other members.
- If a team member finds that they have they are unable to finish their allocated stories for the sprint (under estimation) then they are to report to the Scrum Master who will decide if their story can be broken up and re-estimated or if it is acceptable for the story to remain in its current state and for it to "leak" into the next weeks sprint.

## Team Organisation - Member Roles and Responsibilities

### Member Roles
During each Weekly Sprint Planning/Estimations specific stories will be assigned to a person for that specific sprint.

These allocations should be based on each team members’ strengths and preference but does not prevent another team member from jumping in and providing assistance. The main consideration for role allocation would be based around other internal tasks that need to be completed in that sprint (such as UI designs or reviewing merge requests).

All members would essentially be a developer but some members might have a secondary role they are responsible for. Developer access allows for all members to contribute to the source code. This was done because a project of this size would not require heavy QA or over-designing, therefore more efforts can be put into development as needed.

The Scrum Master is to be assigned to a team member on project inception, this is because the managerial role is too difficult to pass around. Passing around a role like this will cause disorganisation and confusion, ultimately the project will delayed as a result.
This does not mean the Scrum Master cannot be assigned stories to complete, but the delegation may be weighted to favour workload.

|Team Member|Email|Phone Number|ID|Current Role|
|--|--|--|--|--|
|Hoang Phan|hpha0005@student.monash.edu|0422875000|28769430|Developer|
|Marc Porciuncula|mpor14@student.monash.edu|0450556900|27944166|Reviewer/Developer|
|Erica Son|eson0001@student.monash.edu|0408247308|28798929|Product Owner/Developer|
|~~Ellen Anastasia~~|~~(elle0001@student.monash.edu)~~|~~0404730116~~|~~28070259~~|~~Designer/Developer~~|
|Fenghe (Dax) Shen|fshe17@student.monash.edu|0406847122|26983044|Reviewer/Developer|
|Kenny Ye|kyee0003@student.monash.edu|0408614668|28782151|Scrum Master/Developer|

All team members are required to follow the above specified procedures under the section Protocols.

### Responsibilities
#### Scrum Master
- Organising/taking note of meetings
  - Standup messages
  - Weekly Sprint Planning/Estimations
  - Client Meetings
- Decision making within the team
- Resolving internal and external conflicts/issues
- Main communication with the client

#### Developer
- Implemented the feature they are responsible for
- Keeping the technical deliverable at a high standard

#### Designer
- Interpreting the requirements into visual UI mockups/designs
- Provide a UI standard for the entire application
- Resolving usability issues and design implementation queries

#### Reviewer
- Making sure the the master branch contains a level of security and quality: achieved by inspection and use of the checklist
- Making sure that architectural decisions are reflected on the source code that is being merged in

#### Product Owner
- Responsible for representing interests of client, as the client will not be available for regular consultation

## Time and task management

### PBIs and Sprints
In order to keep the team on track in shipping the product, a list of PBIs (Product Backlog Items) will be kept on the product backlog, which will be managed using the Trello software. This will contain a list of all items which need to be done by the end of the project.

Following the SCRUM process model, all development work for the project will be done in separate, timed sprints. For this project, the team will have seven days to work towards producing a potentially shippable increment for the product by the end of each sprint.

Every story/task to be done in each sprint, as well as the person working on each, will be on the sprint backlog, which will be accessible via Trello. The team will decide which stories from the product backlog will be worked on at the start of each sprint. This will be done during an online meeting each Sunday.

### Progress Tracking
All coding tasks will be managed via a shared GitLab repository. Team members will work on separate branches, and any completed work is to be merged into the master branch. This allows everyone to work independently while minimising any risk due to conflicting codes.

In order to keep track of the team’s progress, a burndown chart will be utilised. This chart will show the number of stories yet to be completed plotted against the number of days remaining in the sprint. Any concern regarding the progress of the sprint can be expressed during the Standup messages.

### Expectations and Task Allocation
Team members are expected to dedicate 2-3 hours each week on the project. Each team member will have a chance to nominate what they would like to work on at the start of each sprint. The Scrum Master will ensure that everybody is heard and given a fair go, and to mediate in any instances of dispute. This will ensure that the team stays on track while working together towards a common goal.

## Definition of done
A feature can be considered to be “done” and ready to ship when the below checklist is complete:

### Checklist
#### When feature is completed in feature branch
- [ ] The code compiles and runs
- [ ] Developer that is responsible has  run a quick sanity check on the implemented feature to make sure that it is working as intended according to the requirements.

#### Feature branch testing
- [ ] The developer has pulled the master branch into their feature branch
- [ ] A team member (preferably not the developer of the feature) has performed an exploratory test on the build making sure that bugs affecting critical flow are not present.
- [ ] All bugs found during this phase will be logged on the Trello board and the tester will assess and assign the bug a priority (low/med/high)
- [ ] If any high priority bugs are found in this phase, the developer in question is required  to fix it before they continue.
- [ ] After all high priority bugs are fixed, the developer has requested a merge request.

#### Merge Request
- [ ] One of the two reviewers has analysed the merge request, running through a predesigned checklist that checks for inconsistencies, bad practices, etc…
- [ ] The reviewer has approved of the merge

#### Post-merge
- [ ] A team member has performed a final sanity check on the master branch (preferably the same person who performed the exploratory testing) to make sure the merge had not broken any existing features and the newly merged feature is behaving appropriately.
