// https://keycode.info/

let x = 100;
let y = 100;

function setup() {
  createCanvas(500, 500);
  background('black')
  fill('white')
}

function draw() {
  if (keyIsDown(16) || keyIsDown(13)) {
    speed = 10
  } else {
    speed = 5
  }
  if (keyIsDown(LEFT_ARROW) && (x > 35) || keyIsDown(65) && (x > 35)) {
    x -= speed
  }
  if (keyIsDown(RIGHT_ARROW) && (x < 465) || keyIsDown(68) && (x < 465)) {
    x += speed
  }
  if (keyIsDown(UP_ARROW) && (y > 35) || keyIsDown(87) && (y > 35)) {
    y -= speed
  }
  if (keyIsDown(DOWN_ARROW) && (y < 465) || keyIsDown(83) && (y < 465)) {
    y += speed
  }
  
  clear();
  background('black')
  ellipse(x, y, 50, 50)
}