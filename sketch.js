//define variables for buttons
var startButton, start_img;
var helpButton, help_img;
var playButton, play_img;
var enemyAlert, enemyAlert_img;
var xButton, xButtons, xButton_img; 

//define variables tower images
var normal1_img, normal2_img, normal3_img, normalIcon;

//UI elements
var backdrop, backdrops, backdrop_img;

//define variables for stats
var money, moneyIcon, money_img;
var lives, livesIcon, lives_img;

//define fonts
var helpFont;
var UIFont;

//towers
var normalTower, normalWorkingTower;
var rangeDisplay, realRangeDisplay, range_img;
var towers, ranges;

//other variables
var placing;
var itemPlaced;
var gameState;
var getNewTower;

function preload() {
  //buttons
  start_img = loadImage("otherImages/startButton.png");
  help_img = loadImage("otherImages/helpButton.png");
  play_img = loadImage("otherImages/startWave.png");
  enemyAlert_img = loadImage("otherImages/newEnemyAlert.png");
  xButton_img = loadImage("otherImages/X.png");
  
  //stats
  money_img = loadImage("otherImages/money.png");
  lives_img = loadImage("otherImages/heart.png");

  //towers
  normal1_img = loadImage("gameTowers/Normal_Tier_1.png");
  normal2_img = loadImage("gameTowers/Normal_Tier_2.png");
  normal3_img = loadImage("gameTowers/Normal_Tier_3.png");

  //range
  range_img = loadImage("otherImages/range.png");

  //UI
  backdrop_img = loadImage("otherImages/rect.png");

  //fonts
  helpFont = loadFont("fonts/HelpFont.ttf");
  UIFont = loadFont("fonts/UIFont.ttf");
}

function setup() {
  //create canvas
  var cnv = createCanvas(700, 500);
  cnv.style('display', 'block');

  //set variables
  gameState = "waiting";
  placing = false;
  money = 500;
  lives = 100;

  //create arrays
  towers = [];
  ranges = [];
  xButtons = [];
  backdrops = [];

  //create buttons
  startButton = createSprite(350, 200);
  startButton.addImage("startButton", start_img);
  startButton.scale = 0.25;

  helpButton = createSprite(350, 300);
  helpButton.addImage("helpButton", help_img);
  helpButton.scale = 0.25;
}

function createBackgroundElements(){
  //create certain elements during playmode
  if(gameState === "playing"){
    //background of tower selection
    fill(166, 124, 80);
    strokeWeight(5);
    stroke(133, 97, 0);
    rect(600, -15, 200, 600);
    
    //the track
    strokeWeight(10);
    stroke(100, 100, 100);

    line(0, 100, 100, 100);
    line(100, 100, 100, 300);
    line(100, 300, 175, 300);
    line(175, 300, 175, 200);
    line(175, 200, 300, 200);
    line(300, 200, 300, 400);
    line(300, 400, 450, 400);
    line(450, 400, 450, 75);
    line(450, 75, 550, 75);
  }
}

function createUI(){
  //display text based on gamestate
  if(gameState === "learning"){
    //set the text font, alignment, and color
    fill(0, 0, 0);
    textFont(helpFont);
    textAlign(CENTER);

    //objective of the game
    textSize(20);
    text("Objective: Defend your home from the bad guys!", 350, 30);

    //set text size
    textSize(15);
    //wave start text
    text("Wave Start:\nClick to start a wave.\nWaves can be started\nonce all enemies of the\nlast wave have spawned.", playButton.x, playButton.y + 75);
    //enemy alert text
    text("Enemy Alert:\nAppears when you \nencounter a new\nenemy. Click it for\n details on the enemy.", enemyAlert.x, enemyAlert.y + 75);
    //money text
    text("Money:\nMoney can buy towers.\nKilling enemies\nor by finishing waves\ngives money", moneyIcon.x, moneyIcon.y + 75);
    //heart text
    text("Lives:\nIf an enemy gets past\nyou will lose lives\nequal to the enemy's\nremaining HP.", livesIcon.x, livesIcon.y + 75);
    //towers text
    text("Towers:\nTowers will defend you\nfrom the enemies\nEach tower has its own\nweakness so pick carefully!", normalIcon.x, normalIcon.y + 75);
  }
  
  //display several different UI elements during gameplay
  if(gameState === "playing"){
    //set the text up
    fill(0, 0, 0);
    noStroke();
    textSize(25);
    textFont(UIFont);

    //draw the text for money & lives
    text(lives, 30, livesIcon.y + 7.5);
    text(money, 30, moneyIcon.y + 7.5);
  }
}

function switchGameStates(){
  //show helpscreen if in "waiting"
  if(mousePressedOver(helpButton) && gameState === "waiting"){
    //set up the space
    helpButton.visible = false;
    startButton.y = 450;

    //switch the gamestate
    gameState = "learning";

    //show the wave start button
    playButton = createSprite(115, 100);
    playButton.addImage("playImg", play_img);
    playButton.scale = 0.2;

    //show the enemy alert
    enemyAlert = createSprite(350, 100);
    enemyAlert.addImage("enemyAlertImg", enemyAlert_img);
    enemyAlert.scale = 0.3;

    //show money
    moneyIcon = createSprite(585, 100);
    moneyIcon.addImage("moneyImg", money_img);
    moneyIcon.scale = 0.3;

    //show lives
    livesIcon = createSprite (160, 300);
    livesIcon.addImage("livesImg", lives_img);
    livesIcon.scale = 0.27;

    //show tower
    normalIcon = createSprite(570, 300);
    normalIcon.addImage("normal1Img", normal1_img);
    normalIcon.rotation = 50;
    normalIcon.scale = 0.3;
  }
  //proceed to the game once begin has been pressed
  if(mousePressedOver(startButton) && (gameState === "waiting" || gameState === "learning")){
    //delete the extra sprites if we were previously on the help page
    if(gameState === "learning"){
      enemyAlert.destroy();
      normalIcon.destroy();
      playButton.destroy();
      livesIcon.destroy();
      moneyIcon.destroy();
    }
    //set the next gamestate
    gameState = "playing";

    //make the buttons invisible
    startButton.visible = false;
    helpButton.visible = false;

    //create the wave start button
    playButton = createSprite(655, 465);
    playButton.addImage(play_img);
    playButton.scale = 0.1;

    //create the icons for money & lives
    livesIcon = createSprite(15, 15);
    livesIcon.addImage(lives_img);
    livesIcon.scale = 0.075;
    moneyIcon = createSprite(15, 40);
    moneyIcon.addImage(money_img);
    moneyIcon.scale = 0.075;

    //create the tower icons
    normalIcon = createSprite(650, 35);
    normalIcon.rotation = 90;
    normalIcon.addImage("normal1", normal1_img);
    normalIcon.scale = 0.2;
  }
}

function placeTowers(){
  //update the variable
  getNewTower = true;

  //place the tower
  if(mouseWentDown() && placing === true && mouseX < 570){
    placing = false;
    normalTower.destroy();
    normalWorkingTower = createSprite(mouseX - 20, mouseY - 20)
    normalWorkingTower.addImage(normal1_img);
    normalWorkingTower.scale = 0.2;

    rangeDisplay.destroy();
    rangeDisplay = createSprite(mouseX - 12.5, mouseY - 20)
    rangeDisplay.addImage(range_img);
    rangeDisplay.visible = false;
    rangeDisplay.scale = 4;

    backdrop = createSprite(200, 200);
    backdrop.visible = false;
    backdrop.addImage(backdrop_img);

    xButton = createSprite(200, 200);
    xButton.visible = false;
    xButton.addImage(xButton_img);

    normalWorkingTower.rotation = 90;
    money -= 100;

    towers.push([normalWorkingTower, "normal", false, 1, 75]);
    ranges.push(rangeDisplay);
    xButtons.push(xButton);
    backdrops.push(backdrop);
  }

   //delete tower if wanted
   if(mouseWentDown() && placing === true && mouseX >= 570){
    placing = false;
    getNewTower = false;
    normalTower.destroy();
    rangeDisplay.destroy();
  }

  //display the price when touching the sprite
  if(mouseIsOver(normalIcon) && placing === false){
    //filled green if you have enough money, red if not
    if(money >= 100){
      fill(0, 255, 0);
    }else{
      fill(255, 0, 0);
    }
    //rect behind the text
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(2);
    rect(mouseX - 15, mouseY - 27.5, 35, 25);

    //show the price text
    fill(0, 0, 0)
    noStroke();
    text("$100", mouseX - 30, mouseY - 20);
  }

  //create a placeable tower
  if(mousePressedOver(normalIcon) && mouseWentDown() && money >= 100 && getNewTower === true){
    //tower
    normalTower = createSprite(200, 200, 100, 100);
    placing = true;
    itemPlaced = 1;
    normalTower.addImage(normal1_img);
    normalTower.scale = 0.2;
    normalTower.rotation = 90;

    //tower range
    rangeDisplay = createSprite(mouseX, mouseY);
    rangeDisplay.addImage(range_img);
    rangeDisplay.scale = 4;
  }

  //move the tower
  if(placing === true){
    if(itemPlaced === 1){
      normalTower.x = mouseX - 20;
      normalTower.y = mouseY - 20;
      rangeDisplay.x = mouseX - 12.5;
      rangeDisplay.y = mouseY - 20;
    }
  }
}

function upgradeTowers(){
  //start looping
  for(var x = 0; x < towers.length; x++){
    //check if a tower is clicked 
    if(mousePressedOver(towers[x][0]) && mouseWentDown()){
      towers[x][2] = true;
    }

    //display upgrade screen
    xButtons[x].x = towers[x][0].x + 38; 
    backdrops[x].x = towers[x][0].x + 5; 
    if(towers[x][2] === true){
      //background
      fill("white");
      stroke("black");
      strokeWeight(3);
      xButtons[x].visible = true;
      backdrops[x].visible = true;
      backdrops[x].scale = 0.1;
      xButtons[x].scale = 0.6;
      if(towers[x][0].y > 50){
        xButtons[x].y = towers[x][0].y - 60.5; 
        backdrops[x].y = towers[x][0].y - 50; 
      }else{
        xButtons[x].y = towers[x][0].y + 60.5; 
        backdrops[x].y = towers[x][0].y + 50; 
      }
    }else{
      xButtons[x].visible = false;
      backdrops[x].visible = false;
    }

    //close the screen
    if(mouseX > xButtons[x].x + 2 && mouseX < xButtons[x].x + 20 &&
      mouseY > xButtons[x].y + 2 && mouseY < xButtons[x].y + 20 &&
      mouseWentDown() && towers[x][2] === true){
      towers[x][2] = false;
    }


    //display range when hovered over
    if(mouseIsOver(towers[x][0])){
      ranges[x].visible = true;
    }else{
      ranges[x].visible = false;
    }
  }
}

function draw() {
  //draw background
  background(210);

  //create background elements
  createBackgroundElements();

  //draw sprites
  drawSprites();
  
  //transition from one gamestate to another
  switchGameStates();

  //displays text and other details
  createUI();

  //things that happen only during gameplay
  if(gameState === "playing"){
    //upgrade the towers
    upgradeTowers();

    //place towers
    placeTowers();
  }
}