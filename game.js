// https://keycode.info/
// https://p5js.org/reference/


/*
IF MOVEMENT WITH ARROW KEYS IS BEING BUGGY, MAKE SURE THE BLACK WINDOW IS AT FULL SIZE (pull down the console until you see white)
*/


let enemy1; 

let x = 100;
let y = 100;
let energy = 100;
let energyLoss = false;

let buttonActive = false;

// class Enemy {

//   constructor(name, size, speed, shape, trackPlayer) {
//     this.name = name;
//     this.size = size;
//     this.speed = speed;
//     this.shape = shape;
//     this.enemyX = Math.round(Math.random() * 300);
//     this.enemyY = Math.round(Math.random() * 300);
//   }

//   create() {
//     // console.log(`Spawned enemy! Name: ${this.name}`);
//     if (this.shape === 'ellipse') {
//       fill("red");
//       this.enemyX = 500;
//       this.enemyY = 0;
//       ellipse(this.enemyX, this.enemyY, this.size, this.size);
//     }

//     this.enemyX += 1;
//     this.enemyY -= 1;

//   }
  
  // move() {
  //   this.enemyX -= this.speed;
  //   this.enemyY -= this.speed;
  // }

// }

function preload() {
  spider = loadImage('Spider.png');
  frog = loadImage('phrogFinal2.png');
}

function setup() {
  // enemy1 = new Enemy("John", 15, 5, 'ellipse');
  createCanvas(500, 500);
  background('black');
  fill('white');
  // enemy1.create();
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

  // reloads frames and 'animates'
  clear();
  background('black');
  image(spider, x, y);
  fill('#CFFF99')
  rect(8, 7, 100, 5)
  fill('#87FF00')
  rect(8, 7, energy, 5)
  image(frog, 277, 184)
  // enemy1.create();
}