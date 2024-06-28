import express from "express";
import { graphClient } from "./auth/authCoonfig.js";
import {
  OneDriveLargeFileUploadTask,
  FileUpload,
} from "@microsoft/microsoft-graph-client";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const fileOriginal = req.file;
  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const fileSize = req.file.size;

    console.log("File Name:", fileName);
    console.log("File Size:", fileSize);

    // Convert Buffer to ArrayBuffer
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength
    );

    console.log("ArrayBuffer:", arrayBuffer);

    const options = {
      path: "/",
      fileName: fileName,
      rangeSize: 1024 * 1024, // must be a multiple of 320 KiB
    };

    const fileUpload = new FileUpload({
      name: fileName,
      content: arrayBuffer,
      size: fileSize,
    });

    const uploadTask = await OneDriveLargeFileUploadTask.create(
      client,
      fileUpload,
      options
    );

    // Upload the file
    const response = await uploadTask.upload();

    res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error uploading file");
  }
  res.json({ data: "response" });
});

app.listen(4002, () => {
  console.log("Server started");
});
