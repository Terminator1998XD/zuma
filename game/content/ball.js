class Ball extends GameObject{

  static speed = 0.01;
  static radius = 32;

  constructor(color, angle = 0){
    super(Ring.getVec(angle), new Size(64,64));
    this.a = angle;
    this.color = color;
    this.OnUpdate = true;
    this.isReady = true;
  }

  Explode(){
    dim.map.splice(dim.map.indexOf(this),1);
    new Explode(this.pos,this.size);
    PlaySound('b');

    if(!_loseflag){
      AddScore(1);
    }
  }

  OnRender(rect){
    drawBall(this.color);
  }

  Update(){
    if(isMove) this.a+=Ball.speed;
    else{
      const pool = Ring.pool;
      const index = pool.indexOf(this);
      let next = pool[index+1];
      next = next == null ? 0 : next.a;
      if(this.a - next > 0.2){
        this.a-=Ball.speed;
        moveReady = false;
        this.isReady = false;
      }
      else this.isReady = true;
    }

    this.pos = Ring.getVec(this.a);

    if(this.a > 6.19){
      Lose();
    }
  }
}
