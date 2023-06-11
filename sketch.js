var path,boy;
var pathImg,boyImg,endImg;
var animalGroup,animalImg,animal;
var carG,car1,car2,car3,car4
var cars = 0;
var jumpSound, dieSound


//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  car1 = loadImage("black.gif");
  car2 = loadImage("blue.gif");
  car3 = loadImage("green.gif");
  car4 = loadImage("yellow.gif");
  animalImg = loadImage("animal.gif");
  endImg =loadAnimation("gameOver.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device 

createCanvas(windowWidth, windowHeight);

path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityY = 4
path.y =height/2;



//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
carG=new Group();
animalGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }

    createCar();
    createanimal();

    if (carG.isTouching(boy)) {
      carG.destroyEach();
      jumpSound.play()
      cars=cars+5;
    }  
    else{
      if(animalGroup.isTouching(boy)) {
        gameState=END;
        dieSound.play()
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        carG.destroyEach();
        animalGroup.destroyEach();
        
        carG.setVelocityYEach(0);
        animalGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("cars:"+ cars,width-150,30);
  }

}

function createCar() {
  if (World.frameCount % 200 == 0) {
   // Modify the positions of cash 
  var car = createSprite(Math.round(random(20, windowWidth-20),40, 10, 10));
  car.scale=0.9;
  car.velocityY = 5;
  // //generate random obstacles
  var rand = Math.round(random(1,4));
  switch(rand) {
    case 1: car.addImage(car1);
            break;
    case 2: car.addImage(car2);
            break;
    case 3: car.addImage(car3);
            break;
    case 4: car.addImage(car4);
            break;
    default: break;
  }
  car.lifetime = 200;
  carG.add(car);
  }
}

function createanimal(){
  if (World.frameCount % 530 == 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var animal = createSprite(Math.round(random(20, windowWidth-20),40, 10, 10));
    animal.addImage(animalImg);
    animal.scale=0.2;
    animal.velocityY = 4;
    animal.lifetime = 200;
    animalGroup.add(animal);
  }
}
