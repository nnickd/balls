let balls = [];
let ballStart = 0;

let ballGroups = [];
let groups = [];
let backgroundColor = 127;
let time = 1;

function setup() {
  createCanvas(displayWidth || windowWidth, displayHeight || windowHeight);
  for (let i = 0; i < ballStart; i++) {
    balls.push(new Ball());
  }
  
  //balls.push(new Ball(width / 2, height / 2, 1000000000000));
}
function draw() {
  background(backgroundColor);
  
  if (time %30 == 0) {
    console.log(ballGroups, groups);
  }
  
  for (let i = balls.length-1; i >= 0; i--) {
    if (balls[i].dead) {
      balls.splice(i, 1);
    }
  }
  
  
  //for (let i = groups.length-1; i >= 0; i--) {
  //  if (groups[i].dead) {
  //    groups.splice(i, 1);
  //  }
  //}
  
  
  for (let i = 0; i < ballGroups.length; i++) {
    let group = ballGroups[i];
    let lineColor = random(0, 70);
    
    
    for (let i = group.length-1; i >= 0; i--) {
      if (group[i].dead) {
        group.splice(i, 1);
      }
    }
    
      
      
      for (let i = 0; i < group.length; i++) {
        for (let j = i; j < group.length; j++) {
          if (i != j) {
            let distance = group[i].distanceTo(group[j].x, group[j].y);
            if (distance > 50) {
              group[i].follow(group[j].pos.x, group[j].pos.y, 5, group[j].diameter);
              group[j].follow(group[i].pos.x, group[i].pos.y, 5, group[i].diameter);
              
            } 
            //else if (distance < (group[i].diameter + group[j].diameter) / 2) {
              
            //  group[i].follow(group[j].x, group[j].y, -10, group[j].diameter);
            //  group[j].follow(group[i].x, group[i].y, -10, group[i].diameter);
            //}
          
             if (distance < 100) {
               
              push();
              stroke(lineColor);
              line(group[i].pos.x, group[i].pos.y, group[j].pos.x, group[j].pos.y);
              pop();
            }
          }
        }
      }
    }
    
    //for (let i = 0; i < groups.length; i++) {
    //  for (let j = i; j < groups.length; j++) {
    //    if (i != j) {
    //      if (groups[i].distanceTo(groups[j].x, groups[j].y) > 50) {
    //        groups[i].follow(groups[j].x, groups[j].y, 5);
    //        groups[j].follow(groups[i].x, groups[i].y, 5);
            
    //      }
    //      else {
    //        push()
    //        line(groups[i].x, groups[i].y, groups[j].x, groups[j].y)
    //        pop()
    //      }
    //    }
    //  }
    //}
  
  //for (let i = 0; i < balls.length; i++) {
  //  for (let j = i; j < balls.length; j++) {
  //    if (i != j) {
        
  //        balls[i].follow(balls[j].x, balls[j].y, 5, balls[i].diameter);
  //        balls[j].follow(balls[i].x, balls[i].y, 5, balls[j].diameter);
  //      //if (balls[i].distanceTo(balls[j].x, balls[j].y) < 100 ) {
          
          

  //      if (balls[i].distanceTo(balls[j].x, balls[j].y) < 200 && ballGroups.length == 0) {
  //        push()
  //        line(balls[i].x, balls[i].y, balls[j].x, balls[j].y)
  //        pop()
  //      }
  //    }
  //  }
  //}
  
  //for (let pair of pairs(balls)) {
  //    pair[0].follow(pair[1].x, pair[1].y, 0.5, pair[1].diameter);
  //    pair[1].follow(pair[0].x, pair[0].y, 0.5, pair[0].diameter);
  //}
  
  for (let i = 0; i < balls.length; i++) {
    
     //if (balls[i + 1]) {
     //  balls[i].follow(balls[i + 1].x, balls[i + 1].y, .5)
     //} else {
     //  balls[i].follow(mouseX, mouseY, 1)
     //}
    
    if (mouseIsPressed && balls[i].clicked) {
      
      balls[i].follow(mouseX, mouseY, 0.1);
    } 
    // else {
    //   ball.clicked = false;
    // }
    
    // balls[i].follow(mouseX, mouseY, .5)
    
    if (time % 60 == 0) {
      balls[i].colorDecrement(1);
    }
    
    balls[i].move();
    balls[i].turn();
    balls[i].display();
  }
  
  time++;
}

function keyPressed() {
  Interactions.keyPressed.deleteBalls(balls);
}


function mousePressed() {
  groups = balls.filter(x => x.clicked) || [];
  ballGroups.push(groups);
  
  for (let ball of balls) {
    if (ball.isInside(mouseX, mouseY)) {
      ball.colorDecrement();
      ball.clicked = true;
      Interactions.state.isBallClicked = true;
      
      ball.follow(mouseX, mouseY, 2, 100);
      // groups.push(ball)
    }
  }
}

function mouseDragged() {
  for (let ball of balls) {
    if (ball.isInside(mouseX, mouseY)) {
      ball.clicked = true;
      // groups.push(ball)
    }
  }
  
  if (!Interactions.state.isBallClicked && time % 2 == 0) {
    balls.push(new Ball(mouseX, mouseY));
  }
  
  groups = balls.filter(x => x.clicked);
  ballGroups[ballGroups.length - 1] = groups;
}

function mouseReleased() {
    for (let ball of balls) {
      if (ball.clicked) {
        ball.clicked = false;
      }
    }
  
    if (!Interactions.state.isBallClicked) {
      balls.push(new Ball(mouseX, mouseY));
    }
  Interactions.state.isBallClicked = false;
}
