const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

const transformController = {
  transformImage: async (req, res) => {
    console.log('transform controller', req.body);
    try {
      const { imageName, resize, crop, rotate, scale } = req.body; 

      const controllerFilePath = 'E:\\Coding Resources\\Resume Projects\\self\\visual-edit-backend\\controllers\\transformController.js';
      const imageFilePath = 'E:\\Coding Resources\\Resume Projects\\self\\visual-edit-backend\\uploads\\'+imageName;
      const processedImagePath = 'E:\\Coding Resources\\Resume Projects\\self\\visual-edit-backend\\processed_image';
      
      const relativePathToUploads = path.relative(
        path.dirname(controllerFilePath),
        path.dirname(imageFilePath)
      );

      const relativePathToProcessedImages = path.relative(
        path.dirname(controllerFilePath),
        path.dirname(processedImagePath)
      );
      
      const imagePath = path.join(
        path.dirname(controllerFilePath),
        relativePathToUploads,
        path.basename(imageFilePath)
      );

      const processedImagesFolderPath = path.join(
        path.dirname(controllerFilePath),
        relativePathToProcessedImages,
        path.basename(processedImagePath)
      );

      console.log('imagePath', imagePath);

      let image = sharp(await fs.readFile(imagePath));

      if (resize) {
        const{ newWidth, newHeight }=resize;
        console.log(newWidth,newHeight);
        image = image.resize(newWidth, newHeight);
      }
      if (crop) {
        const { left, top, width, height } = crop;
        image = image.extract({ left, top, width, height });
      }
      if (scale) {
        const { factor } = scale;
        image = image.scale(factor);
      }
      if (rotate) {
        const { degree } = rotate;
        image = image.rotate(degree);
      }
      const outputImagePath = path.join(
        path.dirname(controllerFilePath),
        relativePathToUploads,
        '__' + imageName // You can adjust the naming convention as needed
      );
      
      const transformedImageBuffer = await image.toBuffer();

      await fs.writeFile(outputImagePath, transformedImageBuffer);

      console.log('0/p',outputImagePath);

    res.setHeader('Content-Type', 'image/jpeg'); // Change the Content-Type header as needed
    res.setHeader('Content-Disposition', 'attachment; filename="transformedImage.jpg"'); 
      
    res.send(transformedImageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred during image transformation.');
    }
  },
};

module.exports = transformController;

