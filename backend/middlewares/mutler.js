import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");

export const multiUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },      // resume
  { name: "avatar", maxCount: 1 }     // profile photo
]);
