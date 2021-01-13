var PLAY=1;
var END=0;
var gamestate=1;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver,gameOverImg;
//loading images
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadImage("gameOver.png");
}

function setup(){
  //creating canvas
  createCanvas(400,400);
// Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;


//creating boy running
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.addAnimation("END",gameOverImg);
  boy.scale=0.08;
  

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  background(0);
  if(gamestate===PLAY){
    
  
  boy.x = World.mouseX;
  //creating edge sprites
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  //creating groups
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    //destroying objects and increasing score
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection+=50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection+=250;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection+=150;
      
    }else{
      if(swordGroup.isTouching(boy)){
        gamestate=END;
        
        
    }
  }
 }
  if(gamestate==END){
   swordGroup.destroyEach();
    //scaling animation
    boy.scale=0.5;
    //changing animation
    boy.changeAnimation("END",gameOverImg);
    //setting x and y positions
    boy.x=200;
    boy.y=180;
    path.velocityY=0;
    jwelleryG.destroyEach();
    cashG.destroyEach();
    diamondsG.destroyEach();
  }
  //drawing sprites
  drawSprites();
  //setting treasure collection
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}
//creating objects,giving random positions and giving image
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
 
  }
  
}