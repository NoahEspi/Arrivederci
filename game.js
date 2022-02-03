// https://keycode.info/
// https://p5js.org/reference/

// DVD bouncing
// https://editor.p5js.org/Lllucas/sketches/zRcCe8EKM

function preload() {
  spider = loadImage('Spider.png');
  frog = loadImage('phrogFinal2.png');
  sad = loadImage('sadFace.png');
}

function setup() {

  x = 75;
  y = 75;

  life = 100;
  energy = 100;
  energyLoss = false;

  dTime = 0;
  deltaTimer = 0;
  timer = 0;

  frogs = [];

  dead = false;

  buttonActive = false;
  frog67spawn = false;
  frog89spawn = false;
  frog1011spawn = false;
  frog1213spawn = false;

  for (let i = 0; i < 5; i++) {
    randomSpeed = random(3, 5);
    frogs[i] = new Frog(random(500), 500, randomSpeed, randomSpeed, i);
  }
  
  createCanvas(500, 500);
  background('black');
  fill('white');
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
}

function mousePressed() {
  console.log(`(${mouseX}, ${mouseY})`);
}

function keyPressed() {
  if (keyCode === 32 && dead) {
    setup();
    draw();
    loop();
  }
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
  if (keyIsDown(65) && (x > 10)) {

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
  if (keyIsDown(68) && (x < 440)) {

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
  if (keyIsDown(83) && (y < 440)) {

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
  if (keyIsDown(87) && (y > 15)) {

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
  
  if (timer >= 30 && !frog67spawn && !dead) {
    fill('green');
    frog6 = new Frog(random(500), 500, 5, 5);
    frog7 = new Frog(random(500), 500, 5, 5);
    frogs.push(frog6);
    frogs.push(frog7);
    frog67spawn = true;
    }

  if (timer >= 60 && !frog89spawn && !dead) {
    frog8 = new Frog(random(500), 500, 6, 6);
    frog9 = new Frog(random(500), 500, 6, 6);
    frogs.push(frog8);
    frogs.push(frog9);
    frog89spawn = true;
  }
  if (timer >= 90 && !frog1011spawn && !dead) {
    frog10 = new Frog(random(500), 500, 7, 7);
    frog11 = new Frog(random(500), 500, 7, 7);
    frogs.push(frog10);
    frogs.push(frog11);
    frog1011spawn = true;
  }
  if (timer >= 120 && !frog1213spawn && !dead) {
    frog12 = new Frog(random(500), 500, 8, 8);
    frog13 = new Frog(random(500), 500, 8, 8);
    frogs.push(frog12);
    frogs.push(frog13);
    frog1213spawn = true;
  }
  if (timer >= 240 && !dead) {
    timer = "Die."
    frogDeath = new Frog(random(500), 500, 10, 10);
    frogs.push(frogDeath);
  }

  clear();
  background('black');
  image(spider, x, y);

  textSize(12);
  fill('#FFFFFF')
  rect(8, 7, 100, 5)
  fill('#07E835')
  rect(8, 7, energy, 5)
  textFont('Verdana');
  text("stamina", 115, 13.5)

  fill('#FFFFFF')
  rect(396, 7, 100, 5);
  fill('red');
  rect(396, 7, life, 5);
  text("life", 375, 13.5)

  fill('#FFFFFF')
  textFont("Open Sans")
  text(timer, 247, 13.5)


  dTime = deltaTime / 1000;

  if (dTime < 1) {
    deltaTimer += dTime

    timer = deltaTimer.toString().split(".")[0];
  }
  

  for (f of frogs) {
    
    // f.checkCollision();

    f.move();
    f.show();

    let d = dist(x + spider.width/2, y - spider.height/4, f.enemyX + frog.width/2, f.enemyY - frog.height/4);

    if (d < frog.width/2 + spider.width/2) {
      fill('red')
      text("-1", 485, 25);

      if (life > 0) {
        life -= 2;
      } else {
        noLoop();
        clear();
        background(0);
        fill('grey');
        rect(100, 100, 300, 300);
        fill('white');
        textFont('Helvetica');
        textSize(60);
        text("You Died", 131, 169);
        image(sad, 145, 200, 200, 200);
        textSize(18);
        text("Press 'space' to continue.", 150, 190)
        dead = true;
      }
      
    }
    
  }

  // enemy1.create();
}