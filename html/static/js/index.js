var canvas = document.getElementById('canvas');
if(canvas.getContext) {
  var ctx = canvas.getContext('2d');
  window.requestAnimationFrame(draw);
} else {
  alert('君はモダンブラウザを使うフレンズじゃないんだね....');
}

var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var lineHeight = 30;
var comments = [];
var comment = document.getElementById('comment');
var tweet = document.getElementById('tweet');
tweet.addEventListener('click', (event) => {
  comments.push({
    msg: comment.value,
    x: canvasWidth,
    y: commentY()
  });
  comment.value = '';
});

/*
 * そのコメントのY座標を決定する
 * @return {number} 決定されたY座標を返す
 */
function commentY() {
  let count = 0;
  comments.forEach((val, index) => {
    if(val.x + ctx.measureText(val.msg).width > canvasWidth) {
      count++;
    }
  });
  console.log(count);
  return lineHeight * (count + 1);
}

function draw() {
  ctx.clearRect(0, 0, 300, 150);
  ctx.font = '30px serif';
  comments.forEach((val, index) => {
    ctx.fillText(val.msg, val.x, val.y);
    val.x -= 1;
    if(val.x + ctx.measureText(val.msg).width < 0) {
      console.log("消すよ");
      comments.splice(index, 1);
    }
  });

  window.requestAnimationFrame(draw);
}
