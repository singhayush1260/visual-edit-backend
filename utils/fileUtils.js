const fs = require('fs').promises;
const path = require('path');

module.exports = {
  readImage: async (imagePath) => {
    return await fs.readFile(imagePath);
  },

  writeImage: async (outputPath, imageBuffer) => {
    await fs.writeFile(outputPath, imageBuffer);
  },

  getRelativePath: (fromPath, toPath) => {
    return path.relative(path.dirname(fromPath), toPath);
  },
};
