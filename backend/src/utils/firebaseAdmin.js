import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./credentials.json"), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  storageBucket: "leikhub.appspot.com",
});

export default admin;
