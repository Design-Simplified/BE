import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { TimeUtils } from './time-utils';

export class SharpUtils {
  static async resizePhotoProfile(
    uploadPath: string,
    userId: string,
  ): Promise<string> {
    try {
      const dir = path.dirname(uploadPath);
      const userDir = path.join(dir, 'users', userId);
      const profileDir = path.join(userDir, 'photo_profile');
      const extension = path.extname(uploadPath);
      const newImagePath = path.join(
        profileDir,
        `${TimeUtils.getTimeStringStamp()}_photo_profile_${userId}${extension}`,
      );

      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      if (!fs.existsSync(profileDir)) {
        fs.mkdirSync(profileDir, { recursive: true });
      }

      await sharp(uploadPath).resize(1000, 1000).toFile(newImagePath);

      fs.unlinkSync(uploadPath);

      return newImagePath;
    } catch (error) {
      throw error;
    }
  }
}
