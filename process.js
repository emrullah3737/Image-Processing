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
    return new Promise((resolve) => {
      const command = [
        'convert',
        sourceImage,
        '-resize',
        `${height}x${width}`,
        resultImage,
      ];
      this.exec(command)
        .then(resolve);
    });
  }

  composite(coorX, coorY, imageMain, imageIn, resultImage) {
    return new Promise((resolve) => {
      const command = [
        'composite',
        '-geometry',
        `${coorX}${coorY}`,
        imageIn,
        imageMain,
        resultImage,
      ];
      this.exec(command)
        .then(resolve);
    });
  }

  compositeCorner(position, imageMain, imageIn, resultImage) {
    return new Promise((resolve) => {
      const command = [
        'composite',
        '-gravity',
        position,
        imageIn,
        imageMain,
        resultImage,
      ];
      this.exec(command)
        .then(resolve);
    });
  }

  size(image) {
    return new Promise((resolve) => {
      const command = ['identify', '-format', '%wx%h', image];
      this.exec(command).then((info) => {
        const width = info.split('x')[0];
        const height = info.split('x')[1];
        resolve({ width, height });
      });
    });
  }

  rotate(rotate, inputImg, outputImg) {
    return new Promise((resolve) => {
      const command = ['convert', inputImg, '-rotate', rotate, outputImg];
      this.exec(command)
        .then(resolve);
    });
  }

  fit(inputImg, outputImg, height, width, gravity) {
    return new Promise((resolve) => {
      const command = ['convert', inputImg, '-thumbnail', `${height}x${width}^`, '-gravity', gravity, '-extent', `${height}x${width}`, outputImg];
      this.exec(command)
        .then(resolve);
    });
  }

  contrast(inputImg, outputImg, contrast) {
    return new Promise((resolve) => {
      const command = ['convert', inputImg, '-sigmoidal-contrast', `${contrast},0%`, outputImg];
      this.exec(command)
        .then(resolve);
    });
  }
};
