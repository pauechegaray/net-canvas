
var TWO_PI = Math.PI * 2.0;

var canvas;
var context;

var circles;
var n = 10;

function init () {
  canvas  = document.getElementById('main-canvas');
  context = canvas.getContext('2d');

  circles = [];

  for (var i = 0; i < n; i++) {
    var position = {
      x : Math.random() * canvas.width,
      y : Math.random() * canvas.height
    };

    var angle = Math.random() * TWO_PI;
    var direction = {
      x : Math.cos(angle),
      y : Math.sin(angle)
    };

    var circle = {
      position  : position,
      direction : direction,
      radius    : random(5, 20),
      speed     : random(1.0, 3.0),
      connected : (random(0.0, 1.0) <= 0.8)
    };

    circles.push(circle);
  }
}

function random (start, end) {
  var range = end - start;
  return (Math.random() * range) + start;
}

function animate () {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    var x = circle.position.x;
    var y = circle.position.y

    if (circle.connected) {
      var nextX = circles[(i + 1) % circles.length].position.x;
      var nextY = circles[(i + 1) % circles.length].position.y;

      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(nextX, nextY);
      context.strokeStyle = '#aaa';
      context.stroke();
    }

    context.beginPath();
    context.arc(x, y, circle.radius, 0, TWO_PI, false);

    context.fillStyle = 'black';
    context.fill();

    updateCircle(circle);
  }

  requestAnimationFrame(animate);
}

function updateCircle (circle) {
  circle.position.x += (circle.direction.x * circle.speed);
  circle.position.y += (circle.direction.y * circle.speed);

  if (circle.position.x > canvas.width)  { circle.position.x = 0; }
  if (circle.position.y > canvas.height) { circle.position.y = 0; }
  if (circle.position.x < 0 ) { circle.position.x = canvas.width; }
  if (circle.position.y < 0 ) { circle.position.y = canvas.height; }
}

init();
animate();
