// https://keycode.info/
// https://p5js.org/reference/


/*
IF MOVEMENT WITH ARROW KEYS IS BEING BUGGY, MAKE SURE THE BLACK WINDOW IS AT FULL SIZE (pull down the console until you see white)
*/

let x = 100;
let y = 100;

class Enemy {
  constructor(name, size, speed) {
    this.name = name;
    this.size = size;
    this.speed = speed;
  }

  spawnEnemy() {
    console.log(`Spawned ${this.name}`);
    var randX = Math.round(Math.random() * 500);
    var randY = Math.round(Math.random() * 500);
    ellipse(randX, randY, this.size, this.size);
    randX -= speed
    randY -= speed
  }
}

function setup() {
  createCanvas(500, 500);
  background('black');
  fill('white');
}

function mousePressed() {
  console.log(`(${mouseX}, ${mouseY})`)
}

function draw() {
  if (keyIsDown(16) || keyIsDown(13)) {
    speed = 10;
  } else {
    speed = 5;
  }
  if (keyIsDown(LEFT_ARROW) && (x > 34) || keyIsDown(65) && (x > 34)) {
    x -= speed;
  }
  if (keyIsDown(RIGHT_ARROW) && (x < 464) || keyIsDown(68) && (x < 464)) {
    x += speed;
  }
  if (keyIsDown(DOWN_ARROW) && (y < 464) || keyIsDown(83) && (y < 464)) {
    y += speed;
  }
  if (keyIsDown(UP_ARROW) && (y > 34) || keyIsDown(87) && (y > 34)) {
    y -= speed;
  }
  
  // spawnEnemy('John', 5, 10);

  clear();
  background('black');
  ellipse(x, y, 50, 50);
}