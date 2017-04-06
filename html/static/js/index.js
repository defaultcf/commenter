var canvas = document.getElementById('canvas');
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
  window.requestAnimationFrame(draw);
} else {
  alert('君はモダンブラウザを使うフレンズじゃないんだね....');
}

var alice = {
  msg: 'hello',
  x: 300,
  y: 100
};

function draw() {
  ctx.clearRect(0, 0, 300, 150);
  ctx.font = '30px serif';
  ctx.fillText(alice.msg, alice.x, alice.y);
  alice.x -= 1;

  window.requestAnimationFrame(draw);
}
