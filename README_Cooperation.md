

## GitLab

### Git Flow 방식을 기반으로 합니다.

Commit 메시지는 `#<JIRA 이슈번호> <commit 타입> : <JIRA 이슈이름>` 을 바탕으로 합니다.
브랜치의 경우 `feature/<branch 이름>/<fe || be>` 를 기준으로 합니다.

<img src="https://cdn.discordapp.com/attachments/898086737878855702/915981510996283392/unknown.png" width="400"><img src="https://cdn.discordapp.com/attachments/898086737878855702/915984015348072528/unknown.png" width="400">



## JIRA

SSAFY의 JIRA 툴을 이용해 매주 이슈를 관리합니다.

`매주 월요일` 에는 일주일 목표를 회의하고, 해당하는 이슈 티켓을 발행합니다. 또한, `GitLab`과의 연동으로 각 이슈의 commit 메시지를 확인할 수 있도록 합니다.

매일 아침, `스크럼 회의` 에서는 JIRA 스프린트를 확인해 서로의 상황을 공유 및 일정을 조정합니다.



<img src="https://cdn.discordapp.com/attachments/898086737878855702/915987385152577586/unknown.png">



## Mattermost

Jenkins는 develop에 새로운 merge가 발생했을 때, build를 시작하도록 설정되어 있습니다.

이에, mattermost의 webhook을 Jenkins의 빌드알림설정과 연동함으로써 배포의 성공/실패를 실시간으로 확인할 수 있습니다.

<img src="https://cdn.discordapp.com/attachments/898086737878855702/915991427228516382/unknown.png" width="500">







