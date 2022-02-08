// preloads images
function preload() {
  spider = loadImage('Images/Spider.png');
  sad = loadImage('Images/sadFace.png');

  fastFrog = loadImage('Images/FrogsPixArt/FastFrog.png');
  frog = loadImage('Images/FrogsPixArt/BasicFrog.png');
  fasterFrog = loadImage('Images/FrogsPixArt/FasterFrog.png');
  fastestFrog = loadImage('Images/FrogsPixArt/FastestFrog.png');
  frogDeath = loadImage('Images/FrogsPixArt/FrogDeath.png');

  heart = loadImage('Images/HeartLife.png');
  inStar = loadImage('Images/Invincibility.png');
  icicle = loadImage('Images/icicle.png');
}


////////// consumables \\\\\\\\\\\

// heart container
function heartConsumable(startTime, lifeSpan) {

  if (timer >= startTime && timer < startTime+(lifeSpan-2) && !dead) {

    if (!consumedHeart) {

      image(heart, heartX, heartY);
      
      let d = dist(x + spider.width/2, y - spider.height/4, heartX + heart.width/2, heartY + heart.height/4 )

      if  (d < heart.width/2 + spider.width/2) {
        consumedHeart = true;
        heartX = random(100, 400);
        heartY = random(100, 400);
        
        for (var i = 0; i < 30; i++) {
          if (life < 100) {
            life += 1;
            text("+30", 480, 25);
          }
        }
      }
    }
  }

  if (timer == startTime+(lifeSpan-1)) {
    consumedHeart = false;
  }
}

// invincibility star
function starConsumable(starX, starY, file) {

  if ( !consumedStar ) {

    image(file, starX, starY)

    let d = dist(x + spider.width/2, y - file.height/4, starX + file.width/2, starY - file.height/4);

    if ( d < file.width/2 + spider.width/2 ) {
      console.log("Star collision")

      if ( life > 0 && !invincible ) {
        consumedStar = true;
        invincible = true;
        timeGot = parseInt(timer);
      }
    }
  } else if ( parseInt(timer) >= timeGot + 5 && consumedStar ) {
    invincible = false;
  }
}

// icicle consumable--freezes frogs
function iceConsumable(iceX, iceY, file) {

  if ( !consumedIce ) {
    image(file, iceX, iceY)
    console.log("Ice alive");

    let d = dist(x + spider.width/2, y - file.height/4, iceX + file.width/2, iceY - file.height/4);

    if ( d < file.width/2 + spider.width/2 ) {
      console.log("Ice collision")

      if ( life > 0 && !frozen ) {
        consumedIce = true;
        frozen = true;
        timeGot = parseInt(timer);
        tint("#40EAED");
      }
    }
  } else if ( parseInt(timer) >= timeGot + 3 && consumedIce ) {
    frozen = false;
    noTint();
  }
}



class Frog {

  // initializes frog variables
  constructor(enemyX, enemyY, xspeed, yspeed, file) {
    this.enemyX = enemyX;
    this.enemyY = enemyY;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.x = x;
    this.y = y;
    this.file = file;
  }

  // frog movement and bouncing off walls
  move() {
    
    if ( !frozen ){
      this.enemyX += this.xspeed;
      this.enemyY += this.yspeed;

      if (this.enemyX + frog.width >= width) {
        this.xspeed = -this.xspeed + Math.random(-0.2, 0.2);
        this.enemyX = width - frog.height;
      } else if (this.enemyX <= 0) {
        this.xspeed = -this.xspeed + Math.random(-0.2, 0.2);
        this.enemyX = 0;
      }

      if (this.enemyY + frog.height >= height) {
        this.yspeed = -this.yspeed + Math.random(-0.2, 0.2);
        this.enemyY = height - frog.height;
      } else if (this.enemyY <= 0) {
        this.yspeed = -this.yspeed + Math.random(-0.2, 0.2);
        this.enemyY = 0;
      }
    }
  }
  
  // displays frog
  show() {
    image(this.file, this.enemyX, this.enemyY);
  }
}



function setup() {

  // setups variables to be reset
  x = 75;
  y = 75;

  life = 100;
  energy = 100;
  energyLoss = false;

  dTime = 0;
  deltaTimer = 0;
  timer = 0;

  frogs = [];
  frogNames = [frog, fastFrog, fasterFrog, fastestFrog, frogDeath];

  heartX = random(100, 400);
  heartY = random(100, 400);
  consumedHeart = false;

  rStarX = random(100, 400);
  rStarY = random(100, 400);
  randTime = random(35, 45);

  consumedStar = false;
  invincible = false;

  rIceX = random(100, 400);
  rIceY = random(100, 400);
  randTimeIce = random(20, 30);

  frozen = false;
  consumedIce = false;

  timeGot = 1000;

  dead = false;

  buttonActive = false;
  frog67spawn = false;
  frog89spawn = false;
  frog1011spawn = false;
  frog1213spawn = false;


  // adds first 5 frogs
  for (let i = 0; i < 5; i++) {
    frogs[i] = new Frog(random(500), 500, 4, 4, frog);
  }
  
  // adds html text below the canvas because I didn't know how to do it in actual html :v
  let movementTxt = createElement('p', 'Use the arrow keys or wasd to move.');
  movementTxt.position(200, 485);
  let shiftTxt = createElement('p', 'Use shift to sprint, but be careful, this uses stamina.');
  shiftTxt.position(200, 505)
  let frogSpawnTxt = createElement('p', 'In increments of 30 sec., extra frogs will spawn at the bottom of the screen.');
  frogSpawnTxt.position(200, 525);
  let avoidScrn = createElement('p', 'Avoid the bottom of the screen during these times.');
  avoidScrn.position(200, 545);
  

  // creates canvas
  let canvas = createCanvas(500, 500);
  canvas.position(200, 0);
  background('black');
  fill('white');
}



// for ease-of-access. displays coordinate where clicked
function mousePressed() {
  console.log(`(${mouseX}, ${mouseY})`);
}



// resets screen if you hit space and you're dead
function keyPressed() {
  if (keyCode === 32 && dead) {
    setup();
    draw();
    loop();
  }
}



function draw() {
  
  if (invincible) {
    lifeColor = 'gold';
  } else {
    lifeColor = 'red'
  }

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

    // energy manipulation
    if (energyLoss && !buttonActive) {
      
      buttonActive = true;

      if (energy <= 0) {
        speed = 5
      }
      if (energy > 0) {
        energy -= 1.5
      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
    }

    x -= speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25

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

      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
    }

    x += speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25

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

      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
    }

    y += speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25

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
      }

    } else if (energy < 100 && !buttonActive) {
        energy += 0.25
    }

    y -= speed;

  } else {
    if (energy < 100 && !buttonActive){
      energy += 0.25

    buttonActive = false;
    }
  }

  buttonActive = false;
  

  // once timer hits 30, adds two more fast frogs
  if (timer >= 30 && !frog67spawn && !dead) {
    heartX = random(200, 400);
    heartY = random(200, 400);
    fill('green');
    frog6 = new Frog(random(500), 500, 5, 5, fastFrog);
    frog7 = new Frog(random(500), 500, 5, 5, fastFrog);
    frogs.push(frog6);
    frogs.push(frog7);
    frog67spawn = true;
  }

  // once timer hits 60, adds two more even faster frogs
  if (timer >= 60 && !frog89spawn && !dead) {
    frog8 = new Frog(random(500), 500, 6, 6, fasterFrog);
    frog9 = new Frog(random(500), 500, 6, 6, fasterFrog);
    frogs.push(frog8);
    frogs.push(frog9);
    frog89spawn = true;
  }

  // once timer hits 90, adds two more EVEN FASTER frogs
  if (timer >= 90 && !frog1011spawn && !dead) {
    frog10 = new Frog(random(500), 500, 7, 7, fastestFrog);
    frog11 = new Frog(random(500), 500, 7, 7, fastestFrog);
    frogs.push(frog10);
    frogs.push(frog11);
    frog1011spawn = true;
  }

  // once timer hits 120, adds two EVEN FASTER frogs
  if (timer >= 120 && !frog1213spawn && !dead) {
    frog12 = new Frog(random(500), 500, 8, 8, frogDeath);
    frog13 = new Frog(random(500), 500, 8, 8, frogDeath);
    frogs.push(frog12);
    frogs.push(frog13);
    frog1213spawn = true;
  }

  // once timer hits 4 minutes, you die.
  if (timer >= 240 && !dead) {
    timer = "Die."
    frogStampede = new Frog(random(500), 500, 10, 10, random(frogNames));
    frogs.push(frogStampede);
  }

  clear();

  // frame "animation"
  background('black');

  image(spider, x, y);

  heartConsumable(35, 35);
  heartConsumable(70, 35);
  heartConsumable(105, 35);
  heartConsumable(140, 35);
  heartConsumable(175, 35);
  heartConsumable(210, 35);
  
  if (timer >= randTime && !dead) {
    starConsumable(rStarX, rStarY, inStar)
  }
  if (timer >= randTime + 40 && !dead) {
    starConsumable(rStarX + Math.random(-30, 30), rStarY + Math.random(-30, 30), inStar)
  }
  if (timer >= randTime + 80 && !dead) {
    starConsumable(rStarX + Math.random(-30, 30), rStarY + Math.random(-30, 30), inStar)
  }

  if (timer >= randTimeIce && !dead) {
    iceConsumable(rIceX, rIceY, icicle);
  }
  if (timer >= randTimeIce+25 && !dead) {
    iceConsumable(rIceX + Math.random(-30, 30), rIceY + Math.random(-30, 30), icicle);
  }
  if (timer >= randTimeIce+50 && !dead) {
    iceConsumable(rIceX + Math.random(-30, 30), rIceY + Math.random(-30, 30), icicle);
  }
  if (timer >= randTimeIce+60 && !dead) {
    iceConsumable(rIceX + Math.random(-30, 30), rIceY + Math.random(-30, 30), icicle);
  }

  // stamina bar and text
  textSize(12);
  fill('#FFFFFF')
  rect(8, 7, 100, 5)
  fill('#07E835')
  rect(8, 7, energy, 5)
  textFont('Verdana');
  text("stamina", 115, 13.5)

  // life bar and text
  fill('#FFFFFF');
  rect(396, 7, 100, 5);
  fill('red')
  text("life", 375, 13.5);
  fill(lifeColor);
  rect(396, 7, life, 5);

  // timer
  fill('#FFFFFF');
  textFont("Open Sans");
  text(timer, 247, 13.5);

  // rules
  fill('black');
  textSize(18);


  // timer calculation
  dTime = deltaTime / 1000;

  if (dTime < 1) {
    deltaTimer += dTime;

    timer = deltaTimer.toString().split(".")[0];
  }
  

  // moves and shows frogs
  for (f of frogs) {

    if (!dead) {
      f.move();
      f.show();
    }

    // checks collision 
    let d = dist(x + spider.width/2, y - spider.height/4, f.enemyX + frog.width/2, f.enemyY - frog.height/4);

    if (d < frog.width/2 + spider.width/2 && !invincible) {
      textSize(12);
      fill('red');
      text("-1", 485, 25);

      // checks and ends game if you run out of life

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
        image(sad, 145, 210, 200, 200);
        textSize(18);
        text("Press 'space' to continue.", 140, 210);
        textSize(18);
        text(`You survived for ${timer} seconds`, 140, 190);
        dead = true;
      }
    }
  }
}