const sharp = require("sharp");

const transformController = {
  transformImage: async (req, res) => {
    try {
      const { resize, crop, scale, rotate } = req.body;
      let image = sharp(req.file.buffer);

      if (resize) {
        const { width, height } = resize;
        image = image.resize(width, height);
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
        const { angle } = rotate;
        image = image.rotate(angle);
      }

      const transformedImageBuffer = await image.toBuffer();
      res.send(transformedImageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during image transformation.");
    }
  },
};

module.exports = transformController;
