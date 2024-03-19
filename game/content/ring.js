class Ring extends GameObject{

  static Radius = 350;
  static pool = [];

  constructor(){
    super(new Vector3(900/2,1600/2,0), new Size(1,1));
    Ring.ring = this;
    this.spawnpoint = Ring.getVec(0);
  }

  Update(){
    const pool = Ring.pool;
    if(Vector3.Distance(this.ls.pos, this.spawnpoint) > 70){
      const b = spawnBall();
      this.ls = b;
      pool.push(b);
    }

    const len = pool.length;
    for(let i = 0; i < len; i++){
      const ball = pool[i];
      const color = ball.color;
      const combo = [ball];

      for(let j = i + 1; j < len; j++){
        const jball = pool[j];

        if(color == jball.color){
          combo.push(jball);
        }
        else break;
      }

      const combolen = combo.length;
      if(combolen >= 3){
        for(let j = 0; j < combolen; j++){
          const cball = combo[j];
          pool.splice(pool.indexOf(cball),1);
          cball.Explode();
        }
        if(pool.length > 0) isMove =  false;
        else{
          const b = spawnBall();
          this.ls = b;
          pool.push(b);
        }
        break;
      }
    }
  }

  OnRender(rect){
    g.beginPath();
    g.arc(0, 0, Ring.Radius, 0, 2 * Math.PI);
    g.strokeStyle = 'white';
    g.lineWidth = 10;
    g.stroke();
  }

  static CheckBulletContact(bullet){
    const pool = Ring.pool;
    const bulletpos = bullet.pos;
    let pasteMode = true;
    let paste_in_noready = false;
    for(let i = pool.length - 1; i > -1; i--){
      const ball = pool[i];
      if(pasteMode){
        if(Vector3.Distance(ball.pos, bulletpos) < 64){
          const instance = new Ball(bullet.color, ball.a + 0.2);
          pool.splice(i, 0, instance);
          dim.map.splice(dim.map.indexOf(bullet),1);
          dim.addGameObject(instance);
          pasteMode = false;
          paste_in_noready = !ball.isReady;
        }
      } else if(ball.isReady || paste_in_noready){
        ball.a += 0.21;
      }
    }
  }

  static getVec(angle){
    const pos = Ring.ring.pos;
    const centerX = pos.x - 21;
    const centerY = pos.y - 21;

    const x = centerX + Math.cos(angle) * Ring.Radius;
    const y = centerY + Math.sin(angle) * Ring.Radius;

    return new Vector3(x, y, 1);
  }
}
