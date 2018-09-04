Retrospective - Sprint 1
---
| Name | Done Well | Needs Improvements |
| :------------- | :------------- |
| Kenny | <ul><li>We got on top on things early and have most of the main skeleton for the app in place</li><li>Followed appropriate procedures documented in the PMP which seem to perform well in this first sprint</li></ul>  | <ul><li>Often found ourselves blocked on designs which lead to half-finished stories</li><li>Commenting/documenting on source code was not displayed</li></ul> |
| Erica | <ul><li>I think the way we allocated work and all kept up was good</li><li>Sprint backlog making and allocating tasks procedure seems to work well</li><li>The creation of unit testing is only hindering productivity</li></ul> | <ul><li>We could probably establish the order we have to do stories in earlier so people doing stories that block others are aware from the start </li><li>Maybe focus on things we can’t do at home by ourselves a bit more when we meet on Friday  </li></ul> |
| Fenghe (Dax) Shen | <ul><li>Everyone seems to be proficient in using git and avoided any merge-related conflict so far</li><li>Scrum master and team are well familiar with scrum procedures and communicated with each other well</li></ul> | <ul><li> Improvements needed are mostly from myself: need to prioritise design work or communicate with teammates regularly to ensure that the design is not a roadblock</li><li>Commenting or support documentations are needed for source code</li></ul> |
| Marc | <ul><li>Managed to keep the pace we set</li><li>Our tasks are split up pretty well so we can work on them mostly independently</li></ul> | <ul><li>Everyone is still getting used to the workflow, need to spend more time getting confident with Vue etc.</li><li>Feels unproductive that I can't merge my own pull requests</li></ul> |
| Hoang | <ul><li>Team has been making good progress and is ahead so far, should try to keep this momentum going forward</li></ul> | <ul><li>Still need some getting used to Vue and should allocate more time for this as it will become increasingly difficult in following sprints</li><li>Definitely need more comment on the codes to help understanding of other team members</li></ul> |

# Report
## Documentation of source code
Addressing the point of `the documenting of source code`. Right now the user stories completed were mainly based around UI elements and that doesn't need to be heavily documented and that's fine. Recently changes of the implementation of the `login feature` was made and there was a bit of confusion around the new layers of abstractions added. It would make it a lot more clearer if the source code (particular the technical portions) were documented well in a clear and concise manner as documented in the PMP. This is more of a future point, so make sure we document our source code to facilitate if another team member needs to pick off from where you started.

## Order of stories in the sprint and design blocks
Story ordering and design blocking seems to be the main issue, and they most likely they go hand in hand. This really goes to Dax and how comfortable you he is at producing the designs needed for the current sprint and future ones as well (this is amplified due to the fact that we will be down 1 member for the remainder of the sprints). The designers in future sprints will need to be more hands on and productive to accommodate the velocity of the team.

## Update to definition of done - Unit testing
Unit testing has been raised as an issue for this sprint as most of the stories completed were UI in nature. For a project of this scale, unit testing should not be required and validation might be hard to come by considering the API calls are managed by Google. So for these reason the process of creating and running unit test will be removed. PMP will need to be updated

`(a story will be added to the backlog for the changes to be made)`

## Update to QA processes - Merging `Master` into `Feature` branch
In terms of quality assurance processes, there was a key point that was not documented in the PMP. A developer is to merge the master into the feature and resolve conflicts locally before requesting a merge. A sanity check should be performed locally on the build that has master merged into the branch. This ensures that the merged feature most likely will not break the app and that it integrates appropriately with the existing features and frameworks.

`(a story will be added to the backlog for the changes to be made)`

## Framework familiarisation
Being unfamiliar with `Vue` was also an issue, sharing knowledge within the team is encouraged so that we can progress faster and more efficiently. Team members who are struggling with a feature should ask for help immediately as another team member might be able to resolve the issue straight away and ultimately improve the quality and quantity of the deliverable features.
