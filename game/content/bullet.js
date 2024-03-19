class Bullet extends GameObject{
  constructor(){
    super(new Vector3(900/2-32,1600/2-32,2), new Size(64,64));
    dim.addGameObject(this);
    this.OnUpdate = true;
    const len = Ring.pool.length;
    this.color = Ring.pool[getrand(0, len)].color;

    this.dir = false;
    this.Update();
  }

  static speed = 30;

  OnRender(rect){
    if(!this.dir){
      g.setLineDash([5, 5]);
      g.strokeStyle = 'white';
      g.beginPath();
      const y = rect.y + rect.h / 2;
      g.moveTo(rect.x, y);
      g.lineTo(rect.x+360, y);
      g.stroke();
    }

    drawBall(this.color);
  }

  Update(){
    const pos = this.pos;
    const dir = this.dir;
    if(dir){
      pos.x += dir.x;
      pos.y += dir.y;

      if(pos.x < -128 || pos.y < -128 || pos.x > 1000 || pos.y > 1630){
        dim.map.splice(dim.map.indexOf(this),1);
      }
      else{
        Ring.CheckBulletContact(this);
      }
    } else {
      this.Rotate = Math.atan2(my - pos.y, mx - pos.x);

      if(AnyMouseDown || AnyTouchUp){
        AnyMouseDown = false;
        AnyTouchUp = false;

        if(!Ring.ring.OnUpdate){
           $('#air').hide();
           Ring.ring.ls.OnUpdate = true;
           Ring.ring.OnUpdate = true;
           isMove = true;
           return;
        }

        this.dir = new Vector2(Math.cos(this.Rotate) * Bullet.speed, Math.sin(this.Rotate) * Bullet.speed);

        PlaySound('s');

        setTimeout(function(){
          new Bullet();
        }, 200);
      }
    }
  }
}
