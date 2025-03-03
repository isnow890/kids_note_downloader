# 키즈노트 다운로더

이 도구는 키즈노트에서 선생님이 업로드한 사진과 내용을 자동으로 다운로드하는 Node.js 스크립트입니다.

## 목적

키즈노트 웹사이트에서 자녀의 사진과 활동 내용을 일괄 다운로드하여 로컬에 저장합니다. 특히 선생님이 올린 사진들을 날짜별로 정리하여 보관할 수 있습니다.

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

## 주요 기능

- 날짜별 폴더 자동 생성
- 이미지 파일 GUID 적용으로 중복 방지
- 텍스트 내용 저장
- 이미 다운로드된 파일은 건너뜀(재실행 안전)

## 설정 변경

필요에 따라 다음 설정을 변경할 수 있습니다:

- `jsonFilePath`: 다운로드한 JSON 파일의 경로
- `baseDirectory`: 다운로드할 기본 폴더 위치

위 두 변수만 자신의 환경에 맞게 수정하면 키즈노트의 모든 사진을 다운로드할 수 있습니다.

## 주의사항

- 이 스크립트는 개인적인 용도로만 사용하세요.
- 키즈노트 데이터는 개인정보를 포함하고 있으므로 안전하게 관리하세요.
- 대량의 요청은 키즈노트 서버에 부담을 줄 수 있으니 적절히 사용하세요.
