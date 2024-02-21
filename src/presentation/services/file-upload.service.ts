import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { UuidAdapter } from "../../config";
import { CustomError } from "../../domain";

export class FileUploadService {
  constructor(private readonly uuid = UuidAdapter.v4()) {}

  private checkFolter(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif", "pdf"]
  ) {
    try {
      const fileExtension = file.mimetype.split("/").at(1) ?? "";

      if (!validExtensions.includes(fileExtension)) {
        throw CustomError.badRequest(
          `Invalid extension: ${fileExtension}, valid ones ${validExtensions}`
        );
      }

      const destination = path.resolve(__dirname, "../../../", folder);
      this.checkFolter(destination);

      const filename = `${this.uuid}.${fileExtension}`;
      file.mv(`${destination}/${filename}`);
      return { filename };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = "uploads",
    validExtensions: string[] = ["png", "jpg", "jpeg", "gif", "pdf"]
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExtensions))
    );
    return fileNames;
  }
}
