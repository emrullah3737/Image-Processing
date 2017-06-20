const ImageProcess = require('./process');

const image = new ImageProcess();

image.size('img/main.jpeg')
  .then(console.log);
image.resize(100, 100, 'img/eiffel.png', 'img/resize_eiffel.png')
  .then(() => image.composite('+100', '+100', 'img/main.jpeg', 'img/resize_eiffel.png', 'img/result.png'))
  .then(() => image.compositeCorner('center', 'img/main.jpeg', 'img/frame.png', 'img/result2.png'))
  .then(() => image.rotate('-90', 'img/eiffel.png', 'img/result3.png'))
  .catch(console.log);
