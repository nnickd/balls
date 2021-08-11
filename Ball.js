// Ball class
class Ball {
  constructor(x=random(width), y=random(height), mass = null) {
    this.pos = createVector(x + random(-1, 1), y + random(-1, 1));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(0, 0);
    this.diameter = random(10, 50);
    this.color = 250;
    this.dead = false;
    this.limit = 5;
  }
  move() {
    this.vel.add(this.acc);
    
    if (this.xspeed > this.limit) {
      this.xspeed = this.limit;
    }
    if (this.yspeed > this.limit) {
      this.yspeed = this.limit;
    }
    
    if (this.vel.mag() > this.limit) {
      this.vel.normalize().mult(this.limit); 
    }
    
    this.pos.add(this.vel);
    
    this.acc.mult(0);
  }
  // Bounce when touch the edge of the canvas
  turn() {
    let radius = this.diameter / 2;
    
    if (this.pos.x < radius) {
      this.pos.x = radius;
      this.vel.x *= -1;
    } else if (this.pos.y < radius) {
      this.pos.y = radius;
      this.vel.y *= -1;
    } else if (this.pos.x > width - radius) {
      this.pos.x = width - radius;
      this.vel.x *= -1;
    } else if (this.pos.y > height - radius) {
      this.pos.y = height - radius;
      this.vel.y *= -1;
    }
  }

  display() {
    push();
    fill(this.color);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    pop();
  }
  
  isInside(x, y) {
    //let inside = Math.sqrt((this.x - x)**2 + (this.y - y)**2) <= this.diameter;
    let inside = this.distanceTo(x, y) <= this.diameter;
    
    return inside;
  }
  
  bump() {
    //this.xspeed = random(-2, 2);
    //this.yspeed = random(-2, 2);
  }
  
  colorDecrement(num = 10) {
    this.color = this.color - num;
    if (this.color < 50) {
      this.color = 250;
      this.dead = true;
    }
    if (this.color > 255) {
      this.color = 50;
    }
  }
  
  follow(x, y, factor=1, mass=1) {
    let target = p5.Vector.sub(createVector(x, y), this.pos);
    let mag = target.mag();
    target.normalize();
    let force = (this.diameter**2 * mass**2) / mag**2;
    this.acc.add(target.add(force).div(mass));
  }
  
  distanceTo(x, y) {
    return Math.sqrt((this.pos.x - x)**2 + (this.pos.y - y)**2);
  }
   
}
