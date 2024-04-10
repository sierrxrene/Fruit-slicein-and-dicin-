let fruits = [];
let timer = 25;
let fruitCount = 0;
let startTime;
let duration = 30000;
let highScore = 0;

function preload() {
  img = loadImage("cuttingboard.jpg");
  fruit = loadImage("apple.png");
}

function setup() {
  createCanvas(600, 400);
  reset();
  startTime = millis();
}

function draw() {
  imageMode(CORNER);
  background(220);
  image(img, 0, 0, width, height);
  textFont('helvetica');
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].show();
    fruits[i].move();
    fruits[i].rollover(mouseX, mouseY);
  }

  fruitSpawner();
  fruitCounter();

  timer--;

  elapsedTime = millis() - startTime;
  
  let timeLeft = duration - elapsedTime;
  timeLeft = max(0, timeLeft);
  let seconds = Math.floor(timeLeft / 1000);
  textAlign(CENTER);
  textSize(25);
  text("time: " + seconds, 500, 375);
  
  if (timeLeft <= 0) {
    gameOver();
  }
}

function gameOver() {
  updateHighScore(fruitCount);
  background(255, 0, 0);
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text("Game Over", width / 2, height / 2);
  text('High Score: ' + highScore, width/2, 375);
  
  function updateHighScore(newScore) {
  if (newScore > highScore) {
    highScore = newScore;
  }
}
}

function reset() {
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(0, 430);
    fruits[i] = new Fruit(x, y, 35, 3);
  }
}

function bounce() {
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].x > width || fruits[i].x < 0) {
      fruits[i].xspeed *= -1;
    }
    if (fruits[i].y > height || fruits[i].y < 0) {
      fruits[i].yspeed *= -1;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i].rollover(mouseX, mouseY)) {
      fruits.splice(i, 1);
      fruitCount++;
    }
  }
}

class Fruit {
  constructor(tempX, tempY, tempR, tempB) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    this.brightness = tempB;
    this.xspeed = random(-5, 5);
    this.yspeed = random(-5, 5);
  }

  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.r;
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  show() {
    stroke(255);
    noStroke();
    noFill();
    ellipse(this.x, this.y, this.r);
    imageMode(CENTER);
    image(fruit, this.x, this.y, this.r, this.r);
  }
}

function fruitSpawner() {
  if (timer < 0) {
    let fruit = new Fruit(random(width), random(height), 50, 1);
    fruits.push(fruit);
    timer = random(50);
  }
  if (fruits.length > 30) {
    fruits.splice(0, 1);
  }
}

function fruitCounter() {
  fill(255);
  textSize(25);
  text("fruits collected = " + fruitCount, 150, 375);
}
