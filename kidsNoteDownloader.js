const fs = require("fs");
const path = require("path");
const axios = require("axios");
const crypto = require("crypto"); // GUID 생성을 위해 추가
// JSON 파일 경로
const jsonFilePath = "kids_note_mal.json";

// 다운로드할 기본 폴더
const baseDirectory = "Downloads2";

async function readJsonFile(filePath) {
  try {
      console.log("🔄 JSON 파일을 읽는 중...");
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
  } catch (error) {
      console.error("❌ JSON 파일을 읽는 중 오류 발생:", error);
      return null;
  }
}


function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📂 폴더 생성: ${folderPath}`);
  }
}

// GUID 생성 함수
function generateGuid() {
  return crypto.randomUUID();
}

// 텍스트 파일 저장
function saveContentFile(folderPath, date, content) {
  const contentFilePath = path.join(folderPath, `${date}-contents.txt`);
  if (!fs.existsSync(contentFilePath)) {
      fs.writeFileSync(contentFilePath, content, "utf8");
      console.log(`📄 텍스트 저장 완료: ${contentFilePath}`);
  } else {
      console.log(`📄 텍스트 파일 존재, 건너뜀: ${contentFilePath}`);
  }
}

// 이미지 다운로드
async function downloadImage(imageUrl, savePath) {
  if (fs.existsSync(savePath)) {
      console.log(`⏩ 이미 존재하는 파일, 건너뜀: ${savePath}`);
      return;
  }

  try {
      console.log(`🌐 다운로드 시작: ${imageUrl}`);
      const response = await axios({
          method: "GET",
          url: imageUrl,
          responseType: "stream",
      });

      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
          writer.on("finish", () => {
              console.log(`✅ 다운로드 완료: ${savePath}`);
              resolve();
          });
          writer.on("error", reject);
      });
  } catch (error) {
      console.error(`❌ 다운로드 실패: ${imageUrl}`, error);
  }
}

// 메인 실행 함수
async function main() {
  const response = await readJsonFile(jsonFilePath);
  if (!response || !response.results) {
      console.log("❌ JSON 데이터가 올바르지 않습니다.");
      return;
  }

  createFolder(baseDirectory);

  for (const result of response.results) {
      // 조건 확인: author.type === "teacher" && attached_images가 존재해야 함
      if (result.author.type === "teacher" && result.attached_images.length > 0) {
          const dateFolder = path.join(baseDirectory, result.date_written);
          createFolder(dateFolder);

          // Content 저장
          saveContentFile(dateFolder, result.date_written, result.content);

          // 이미지 다운로드
          for (const image of result.attached_images) {
              const originalFileName = path.basename(new URL(image.original).pathname);
              const fileExt = path.extname(originalFileName);
              const fileName = path.basename(originalFileName, fileExt);
              
              // 파일명에 GUID 추가
              const guidFileName = `${generateGuid()}-${fileName}${fileExt}`;
              const imageFilePath = path.join(dateFolder, guidFileName);

              await downloadImage(image.original, imageFilePath);
          }
      }
  }

  console.log("🎉 모든 다운로드 완료!");
}

// 실행
main();