const ImageProcess = require('./process');

const image = new ImageProcess();

image.resize(100, 100, 'img/eiffel.png', 'img/resize_eiffel.png');
image.size('img/main.jpeg', (info) => {
  const width = info.width;
  const height = info.height;
  console.log(info);
});
image.composite('+100', '+100', 'img/main.jpeg', 'img/resize_eiffel.png', 'img/result.png');
image.compositeCorner('center', 'img/main.jpeg', 'img/frame.png', 'img/result2.png');
image.rotate('-90', 'img/eiffel.png', 'img/result3.png');
