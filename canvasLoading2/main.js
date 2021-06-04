var canvasWidth = 500;
var canvasHeight = 300;
var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var gradientAngle = 0.1;


function animate() {
  var gradient = ctx.createConicalGradient(250, 150, -Math.PI, Math.PI);
  gradientAngle += 0.01;
  if (gradientAngle > 0.9) {
    // TODO
    gradientAngle = 0.1;
  }
  else {
    gradient.addColorStop(0, '#FF0000');
    gradient.addColorStop(gradientAngle, 'white');
    gradient.addColorStop(1, '#FF0000');
  }


  // 紅色圓圈
  fillEllipse2(ctx, 250, 150, 200, 80, gradient.pattern);

  // 中間白色圓圈
  fillEllipse2(ctx, 250, 150, 120, 65, 'white');

  window.requestAnimationFrame(animate);
}

animate();

function fillEllipse2(context, x, y, a, b, fillStyle) {
  const step = (a > b) ? 1 / a : 1 / b;
  context.beginPath();
  context.moveTo(x + a, y);
  for (let i = 0; i < 2 * Math.PI; i += step) {
    context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
  }
  context.closePath();
  ctx.fillStyle = fillStyle;
  context.fill();
}

