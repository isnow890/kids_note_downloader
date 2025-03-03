# 키즈노트 다운로더 (KidsNote Downloader)

이 도구는 키즈노트(KidsNote)에서 선생님이 업로드한 사진과 활동 내용을 자동으로 다운로드하는 Node.js 스크립트입니다.

[![키즈노트](https://img.shields.io/badge/KidsNote-Downloader-blue)](https://github.com/isnow890/kids_note_downloader)
[![Node.js](https://img.shields.io/badge/Node.js-v14_or_later-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 목적

키즈노트 웹사이트(KidsNote)에서 자녀의 사진과 활동 내용을 일괄 다운로드하여 로컬에 저장합니다. 특히 선생님이 올린 사진들을 날짜별로 정리하여 보관할 수 있습니다.

## 주요 기능

- 키즈노트 API에서 데이터 추출 및 다운로드
- 날짜별 폴더 자동 생성으로 체계적인 관리
- 이미지 파일 GUID 적용으로 중복 파일명 방지
- 선생님이 작성한 텍스트 내용 자동 저장
- 이미 다운로드된 파일은 건너뜀(재실행 안전)

## 요구 사항

- Node.js (v14 이상 권장)
- npm 또는 yarn
- 다음 패키지 설치 필요:
  - axios
  - fs
  - path
  - crypto

## 설치 방법

1. 저장소 클론 또는 다운로드:
```bash
git clone https://github.com/isnow890/kids_note_downloader.git
cd kids_note_downloader
```

2. 필요한 패키지 설치:
```bash
npm install
# 또는
yarn install
```

## 사용 방법

### 1. JSON 데이터 준비하기

1. 키즈노트 웹사이트(https://www.kidsnote.com)에 로그인합니다.
2. 브라우저 개발자 도구(F12)를 열고 네트워크 탭을 선택합니다.
3. 아이의 활동 기록을 볼 수 있는 페이지로 이동합니다.
4. 네트워크 탭에서 다음과 같은 형태의 요청을 찾습니다:
   ```
   https://www.kidsnote.com/api/v1_2/children/[아이ID]/reports/?page_size=12
   ```
5. 이 요청의 헤더에서 `Cookie` 값을 복사합니다.
6. Postman에서 위 URL을 입력하고 Cookie 값을 헤더에 설정합니다.
7. URL의 `page_size` 파라미터 값을 `5000` 정도의 큰 숫자로 변경합니다:
   ```
   https://www.kidsnote.com/api/v1_2/children/[아이ID]/reports/?page_size=5000
   ```
8. 요청을 실행하고 응답 데이터를 JSON 파일(예: `kids_note_data.json`)로 저장합니다.

### 2. 스크립트 설정 및 실행

1. `kidsNoteDownloader.js` 파일을 열고 다음 변수를 적절히 설정합니다:
   ```javascript
   // JSON 파일 경로 - 다운로드한 JSON 파일명으로 변경
   const jsonFilePath = "kids_note_data.json";

   // 다운로드할 기본 폴더
   const baseDirectory = "Downloads";
   ```

2. 터미널에서 스크립트를 실행합니다:
   ```bash
   node kidsNoteDownloader.js
   ```

3. 실행이 완료되면 `Downloads` 폴더(또는 지정한 폴더)에 날짜별로 정리된 사진들이 저장됩니다.

## 설정 변경

필요에 따라 다음 설정을 변경할 수 있습니다:

- `jsonFilePath`: 다운로드한 JSON 파일의 경로
- `baseDirectory`: 다운로드할 기본 폴더 위치

위 두 변수만 자신의 환경에 맞게 수정하면 키즈노트의 모든 사진을 다운로드할 수 있습니다.

## 자주 묻는 질문 (FAQ)

**Q: 키즈노트 API URL은 어디서 찾을 수 있나요?**  
A: 브라우저 개발자 도구의 네트워크 탭에서 `/api/v1_2/children/` 부분이 포함된 요청을 찾으세요.

**Q: 다운로드 속도가 느립니다. 어떻게 해야 할까요?**  
A: 키즈노트 서버의 부하를 줄이기 위해 의도적으로 속도를 제한하고 있습니다. 인터넷 연결 상태에 따라 다운로드 속도가 달라질 수 있습니다.

**Q: 특정 날짜의 사진만 다운로드할 수 있나요?**  
A: 현재 버전에서는 지원하지 않습니다. 필요하시면 코드를 수정하여 사용하세요.

## 주의사항

- 이 스크립트는 개인적인 용도로만 사용하세요.
- 키즈노트 데이터는 개인정보를 포함하고 있으므로 안전하게 관리하세요.
- 대량의 요청은 키즈노트 서버에 부담을 줄 수 있으니 적절히 사용하세요.

## 관련 키워드

키즈노트, KidsNote, 어린이집 사진 다운로드, 유치원 사진 다운로드, Node.js 다운로더, 키즈노트 API, 키즈노트 백업, 아이 사진 다운로드, 키즈노트 사진 저장, 유아 활동 기록 백업

## 라이센스

MIT License

## 기여하기

풀 리퀘스트는 언제나 환영합니다. 큰 변화가 있는 경우, 이슈를 먼저 열어 논의해주세요.
