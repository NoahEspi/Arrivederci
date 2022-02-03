// https://keycode.info/
// https://p5js.org/reference/

// DVD bouncing
// https://editor.p5js.org/Lllucas/sketches/zRcCe8EKM


let x = 75;
let y = 75;
let energy = 100;
let energyLoss = false;
let xspeed;
let frogWidth;

let frogs = [];

let buttonActive = false;

function preload() {
  spider = loadImage('Spider.png');
  frog = loadImage('phrogFinal2.png');
}

// frogWidth = frog.width;

class Frog {
  constructor(enemyX, enemyY, xspeed, yspeed, name="joe") {
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
    this.name = name;
  }

  move() {

    this.enemyX += this.xspeed;
    this.enemyY += this.yspeed;

    if (this.enemyX + frog.width >= width) {
      this.xspeed = -this.xspeed + Math.random(-0.1, 0.2);
      this.enemyX = width - frog.height;
    } else if (this.enemyX <= 0) {
      this.xspeed = -this.xspeed + Math.random(-0.1, 0.2);
      this.enemyX = 0;
    }

    if (this.enemyY + frog.height >= height) {
      this.yspeed = -this.yspeed + Math.random(-0.1, 0.2);
      this.enemyY = height - frog.height;
    } else if (this.enemyY <= 0) {
      this.yspeed = -this.yspeed + Math.random(-0.1, 0.2);
      this.enemyY = 0;
    }
  }
  
  show() {
    image(frog, this.enemyX, this.enemyY);
  }

  // checkCollision() {
    
  //   if (this.x < this.enemyX + frog.width && this.enemyX < this.x + spider.width && this.y < this.enemyY + frog.height && this.enemyY < this.y + spider.height){
      
  //     background(100, 0, 200)
  //     // console.log(`collision with ${this.name}`);

  //   }
  // }
}

function setup() {

  for (let i = 0; i < 5; i++) {
    randomSpeed = random(3, 5);
    frogs[i] = new Frog(random(500), 500, randomSpeed, randomSpeed, i);
  }
  
  createCanvas(500, 500);
  background('black');
  fill('white');
}

function mousePressed() {
  console.log(`(${mouseX}, ${mouseY})`);
}

function draw() {

  // sprint key functions
  if (keyIsDown(16) || keyIsDown(13)) {
    if (energy > 2) {
      speed = 10;
      energyLoss = true;
    }
  } else {
    speed = 5;
    energyLoss = false;
  }


  // left arrow functions
  if (keyIsDown(LEFT_ARROW) && (x > 10) || keyIsDown(65) && (x > 10)) {

    if (energyLoss && !buttonActive) {
      
      buttonActive = true;

      if (energy <= 0) {
        speed = 5
      }
      if (energy > 0) {

        energy -= 1.5
        // console.log(`Losing energy! ${energy}`)

      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
        // console.log(`Recovering! ${energy}`)
    }

    x -= speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25
      // console.log(`Recovering! ${energy}`)

    buttonActive = false;
    }
  }

  // right arrow functions
  if (keyIsDown(RIGHT_ARROW) && (x < 440) || keyIsDown(68) && (x < 440)) {

    if (energyLoss && !buttonActive) {
      
      buttonActive = true;

      if (energy <= 0) {
        speed = 5
      }
      if (energy > 0) {

        energy -= 1.75
        // console.log(`Losing energy! ${energy}`)

      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
        // console.log(`Recovering! ${energy}`)
    }

    x += speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25
      // console.log(`Recovering! ${energy}`)

    buttonActive = false;
    }
  }

  // down arrow functions
  if (keyIsDown(DOWN_ARROW) && (y < 440) || keyIsDown(83) && (y < 440)) {

    if (energyLoss && !buttonActive) {
      
      buttonActive = true;

      if (energy <= 0) {
        speed = 5
      }
      if (energy > 0) {

        energy -= 2
        // console.log(`Losing energy! ${energy}`)

      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
        // console.log(`Recovering! ${energy}`)
    }

    y += speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25
      // console.log(`Recovering! ${energy}`)

    buttonActive = false;
    }
  }
  

  // left arrow functions
  if (keyIsDown(UP_ARROW) && (y > 15) || keyIsDown(87) && (y > 15)) {

    if (energyLoss && !buttonActive) {
      
      buttonActive = true;

      if (energy <= 0) {
        speed = 5
      }

      if (energy > 0) {
        energy -= 2.25
        // console.log(`Losing energy! ${energy}`)
      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
        // console.log(`Recovering! ${energy}`)
    }

    y -= speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25
      // console.log(`Recovering! ${energy}`)

    buttonActive = false;
    }
  }

  buttonActive = false;
  
  clear();
  background('black');
  image(spider, x, y);

  for (f of frogs) {
    
    // f.checkCollision();

    f.move();
    f.show();

    let d = dist(x + spider.width/2, y - spider.height/4, f.enemyX + frog.width/2, f.enemyY - frog.height/4);

    if (d < frog.width/2 + spider.width/2) {
      fill('red');
      rect(387, 47, 10, 10)
      
    }
    
  }

  
  fill('#FFF3BD')
  rect(8, 7, 100, 5)
  fill('#FFD100')
  rect(8, 7, energy, 5)

  // enemy1.create();
}