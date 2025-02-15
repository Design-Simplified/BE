import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export class SharpUtils {
  static async resizeImage(imagePath: string): Promise<string> {
    const dir = path.dirname(imagePath);
    const extension = path.extname(imagePath);
    const name = path.basename(imagePath, extension);

    const newImagePath = path.join(dir, `resized_${name}${extension}`);
    await sharp(imagePath).resize(1920, 1080).toFile(newImagePath);

    fs.unlinkSync(imagePath);

    return newImagePath;
  }
}
