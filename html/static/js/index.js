var canvas = document.getElementById('canvas');
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
  window.requestAnimationFrame(draw);
} else {
  alert('君はモダンブラウザを使うフレンズじゃないんだね....');
}

resizer();
window.addEventListener('resize', resizer);
function resizer() {
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
}

var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var lineHeight = 30;
var lane = Math.floor(canvasHeight / lineHeight);
var comments = [];
var comment = document.getElementById('comment');
comment.addEventListener('keydown', (event) => {
  if(event.keyCode == 13) {
    commentWidth = ctx.measureText(comment.value).width;
    comments.push({
      msg: comment.value,
      speed: commentSpeed(commentWidth),
      x: canvasWidth,
      lane: commentLane(commentWidth)
    });
    comment.value = '';
  }
});

function commentSpeed(commentWidth) {
  let speed = (canvasWidth+commentWidth) / 500;
  return speed;
}

/*
 * そのコメントのY座標を決定する
 * @return {number} 決定されたY座標を返す
 */
function commentLane(commentWidth) {
  for(let i = 0; i < lane; i++) {
    let sameLane = comments.filter((element, index, array) => {
      return element.lane == i;
    });
    if(sameLane.length == 0) return i;
    let last = sameLane.pop();
    if((last.x+ctx.measureText(last.msg).width) / last.speed < canvasWidth / commentSpeed(commentWidth)) {
      return i;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = '30px serif';
  comments.forEach((val, index) => {
    ctx.fillText(val.msg, val.x, lineHeight*(val.lane+1));
    val.x -= val.speed;
    if(val.x + ctx.measureText(val.msg).width < 0) {
      comments.splice(index, 1);
    }
  });

  window.requestAnimationFrame(draw);
}
