const sharp = require('sharp');

const filterFunctions = {
  grayscale: sharpInstance => sharpInstance.grayscale(),
  sepia: sharpInstance => sharpInstance.sepiatone(),
  negative: sharpInstance => sharpInstance.negate(),
  sharpen: sharpInstance => sharpInstance.sharpen(),
  blur: sharpInstance => sharpInstance.blur(),
  emboss: sharpInstance => sharpInstance.emboss(),
  posterize: sharpInstance => sharpInstance.posterize(),
  oilpaint: sharpInstance => sharpInstance.oilpaint(),
  solarize: sharpInstance => sharpInstance.solarize(),
  threshold: sharpInstance => sharpInstance.threshold(),
  gamma: sharpInstance => sharpInstance.gamma(),
  modulate: sharpInstance => sharpInstance.modulate(),
  normalize: sharpInstance => sharpInstance.normalize(),
  colorize: sharpInstance => sharpInstance.colorize(),
  convolve: sharpInstance => sharpInstance.convolve(),
  edge: sharpInstance => sharpInstance.edge(),
  median: sharpInstance => sharpInstance.median()
};

const filterController = {
  applyFilter: async (req, res) => {
    try {
      const { filter } = req.body;
      let image = sharp(req.file.buffer);

      if (filterFunctions[filter]) {
        image = filterFunctions[filter](image);
      } else {
        res.status(400).send('Invalid filter specified.');
        return;
      }

      const filteredImageBuffer = await image.toBuffer();
      res.send(filteredImageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while applying the filter.');
    }
  }
};

module.exports = filterController;
