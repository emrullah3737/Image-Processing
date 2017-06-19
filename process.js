const exec = require('child_process').exec;

module.exports = class ImageProcess {
  exec(command) {
    return new Promise((resolve) => {
      exec(command.join(' '), (err, stdout, stderr) => {
        if (err) throw err;
        resolve(stdout);
      });
    });
  }

  resize(height, width, sourceImage, resultImage) {
    const command = [
      'convert',
      sourceImage,
      '-resize',
      `${height}x${width}`,
      resultImage,
    ];
    this.exec(command);
  }

  composite(coorX, coorY, imageMain, imageIn, resultImage) {
    const command = [
      'composite',
      '-geometry',
      `${coorX}${coorY}`,
      imageIn,
      imageMain,
      resultImage,
    ];
    this.exec(command);
  }

  compositeCorner(position, imageMain, imageIn, resultImage) {
    const command = [
      'composite',
      '-gravity',
      position,
      imageIn,
      imageMain,
      resultImage,
    ];
    this.exec(command);
  }

  size(image, cb) {
    const command = ['identify', '-format', '%wx%h', image];
    this.exec(command).then((info) => {
      const width = info.split('x')[0];
      const height = info.split('x')[1];
      cb({ width, height });
    });
  }

  rotate(rotate, inputImg, outputImg) {
    const command = ['convert', inputImg, '-rotate', rotate, outputImg];
    this.exec(command);
  }
};
