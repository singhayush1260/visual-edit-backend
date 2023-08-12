const sharp = require("sharp");

const adjustmentController = {
  adjustImage: async (req, res) => {
    console.log('adjustement controller'); 
    try {
      const { brightness, contrast, hue } = req.body;
      let image = sharp(req.file.buffer);
      if (brightness !== undefined) {
        image = image.modulate({ brightness });
      }
      if (contrast !== undefined) {
        image = image.modulate({ contrast });
      }
      if (hue !== undefined) {
        image = image.modulate({ hue });
      }
      const modifiedImageBuffer = await image.toBuffer();
      res.send(modifiedImageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during image adjustment.");
    }
  },
};

module.exports = adjustmentController;
