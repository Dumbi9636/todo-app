Electron Todo App

프로젝트 개요
본 프로젝트는 Electron을 활용한 데스크톱 Todo 애플리케이션으로,
웹 기술(HTML / CSS / JavaScript)을 기반으로 데스크톱 앱 구조와 동작 방식을 이해하기 위해 제작되었습니다.

단순한 Todo 관리 기능을 구현하는 과정에서 Electron의 메인 프로세스와 렌더러 프로세스 구조,
그리고 로컬 데이터 관리 방식에 집중했습니다.

개발 목적
- Electron 앱의 기본 구조(Main / Renderer) 이해
- 웹 기술로 데스크톱 앱을 만드는 흐름 학습
- IPC 통신 개념 및 이벤트 기반 동작 방식 이해

사용 기술
Electron
JavaScript (ES6+)
HTML / CSS
Node.js
로컬 데이터 저장

주요 기능
Todo 등록
Todo 목록 조회
Todo 완료 / 미완료 처리
Todo 삭제


앱 구조

Main Process: 
Electron 앱 실행 및 윈도우 생성
애플리케이션 생명주기 관리

Renderer Process: 
사용자 UI 렌더링
Todo 입력 및 이벤트 처리
사용자 인터랙션 중심 로직 담당
