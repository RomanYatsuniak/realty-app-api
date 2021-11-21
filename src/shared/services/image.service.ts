import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
@Injectable()
export class ImageService {
  async uploadFile(dataBuffer, fileName) {
    const s3 = new S3();
    const res = await s3
      .upload({
        Bucket: 'realty-app',
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();
    return res.Location;
  }

  async uploadGallery(photos: Array<Express.Multer.File>) {
    const photosLinks = await Promise.all(
      photos.map((p) => {
        return this.uploadFile(p.buffer, p.originalname);
      }),
    );
    return photosLinks;
  }
}
