var colors = null;
var allcolors = null;
var isMove = false;
var moveReady = false;
var kills = 0;

function spawnEnable(advend){
  allcolors = getTexs('f/',9);
  colors = getTexs('f/',4);
  kills = 0;
  scoremul = 1;
  $('#levelup').hide();
  Ring.ring.ls = spawnBall();
  Ring.pool.push(Ring.ring.ls);
  new Bullet();

  if(advend){
    Ring.ring.ls.OnUpdate = false;
    $('#air').show(100);
  }
  else{
    Ring.ring.OnUpdate = true;
    isMove = true;
  }
}

function AddScore(_score){
  kills++;

	score = parseInt(score + (_score * scoremul));
	scoreui.text(score);

  if(kills == 30 && colors.length != allcolors.length){
    colors.push(allcolors[colors.length]);
    kills = 0;
    scoremul++;

    $('#levelup').show(500);
    setTimeout(function(){
      $('#levelup').hide(500);
    }, 4000);
  }
}

function spawnBall(){
  let col = 0;
  do{
    col = getrand(0,colors.length);
  }
  while(col == spawnBall.last);
  const b = new Ball(colors[col]);
  dim.addGameObject(b);
  spawnBall.last = col;
  return b;
}

function drawBall(data){
  const radius = Ball.radius;
  g.drawImage(data, -radius, -radius, radius * 2, radius * 2);
}

spawnBall.last = 0;
