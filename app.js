const ImageProcess = require('./process');

const image = new ImageProcess();

image.size('img/main.png')
  .then(console.log);
image.resize(400, 400, 'img/eiffel.png', 'img/resize_eiffel.png')
  .then(() => image.composite('+100', '+100', 'img/main.png', 'img/resize_eiffel.png', 'img/result.png'))
  .then(() => image.compositeCorner('center', 'img/main.png', 'img/frame.png', 'img/result2.png'))
  .then(() => image.rotate('-90', 'img/eiffel.png', 'img/result3.png'))
  .then(() => image.fit('img/main.png', 'img/result4.png', '300', '300', 'west'))
  .then(() => image.contrast('img/main.png', 'img/result4.png', '20'))
  .catch(console.log);
