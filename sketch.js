var bg,bgi,squirrel,squirrel_animation,rock,rock1Img,rock2Img,rock3Img,rock4Img,ig;
var gameState = "play"
var heart1,heart2,heart3,heartImg;
var heart = 0
var nutCount = 0;

function preload(){
  bgi = loadImage("track.jpg")
  squirrel_animation = loadAnimation("W1-removebg-preview.png","W2-removebg-preview.png","W3-removebg-preview.png","W4-removebg-preview.png")
  goimg = loadImage("GO.png")
  rock1Img = loadImage("r1-removebg-preview.png")
  rock2Img =loadImage("r2-removebg-preview.png")
  rock3Img = loadImage("r3-removebg-preview.png")
  YWImg = loadImage("YW.jpg")
  sqimg = loadImage("sq.png")

  heartImg = loadImage("heart.png")
  nutimg = loadImage("nut-removebg-preview.png")
}

function setup(){
  createCanvas(600,500)
  bg = createSprite(300,200)
  bg.addImage(bgi)
  bg.velocityX = -5
  bg.scale = 4
  ig = createSprite(250,485,600,5)
  ig.visible = false;
  
  
  squirrel = createSprite(50,380)
  squirrel.addAnimation("squirrel",squirrel_animation)
  squirrel.scale = 0.5
   
rockGroup = new Group();
nutGroup = new Group();

  heart1 = createSprite(30,30,5,5)
  heart1.visible = true;
  heart1.addImage(heartImg)
  heart1.scale = 0.07
  heart2 = createSprite(50,30,5,5)
  heart2.visible = true;
  heart2.addImage(heartImg)
  heart2.scale = 0.07
  heart3 = createSprite(70,30,5,5)
  heart3 .visible = true;
  heart3.addImage(heartImg)
  heart3.scale = 0.07
 
  var nutText = createSprite(500,30,10,10)
      nutText.addImage(nutimg)
      nutText.scale = 0.06
}

function draw(){
  background("white")
  
  
  console.log(nutCount)
  if(gameState === "play"){
    if(bg.x < 200){
      bg.x = width/2
    }
    
      // console.log(squirrel.y)
       
      if(keyDown("space")) {
         squirrel.velocityY = -12;
         }
      //add gravity
      squirrel.velocityY = squirrel.velocityY + 0.8
      
      rocks(); 
      
      if(rockGroup.isTouching(squirrel)){
        console.log(heart)
        heart = heart + 1
        rockGroup.destroyEach(); 
        
      }
      if(heart === 1){
        heart1.visible = false;
      }
      if(heart === 2){
       heart2.visible = false;
     }
     if(heart === 3){
       heart3.visible = false;
     }

      if(heart > 3){
        gameState = "end";
      }
       nuts();
       babySquirrel();
       if(gameState === "youWon"){
        fill("azure") 
        var youWin = createSprite(300,250)
        youWin.addImage(YWImg)
       }
      if(nutGroup.isTouching(squirrel)){
 
        nutGroup.destroyEach();
        nutCount = nutCount + 1;

       
      }



  }

 if(gameState === "end"){
   console.log("gameOver");
   nutGroup.destroyEach();
   squirrel.visible = false
   bg.x = 300
   var gameOver = createSprite(300,250)
    gameOver.addImage(goimg)
 }
 squirrel.collide(ig);
  drawSprites();
  fill("black")
  textSize(20)
  text(": " + nutCount,520,35)
}

function rocks(){
  if(frameCount % 130 === 0){
    rock = createSprite(400,450)
    rock.velocityX = -5                     
    rock.scale = 0.3
    
    rockGroup.add(rock)


     switch(Math.round(random(1,3))){
      case 1:rock.addImage(rock1Img)
        break;
      case 2:rock.addImage(rock2Img)
        break;
      case 3:  rock.addImage(rock3Img)
    break;
    default: break;

           }

  }
  
  
}

function nuts(){

  if(frameCount % 20 === 0 ){

    nut = createSprite(300,300,10,10)
    nut.addImage(nutimg)
    nut.scale = 0.2
    nut.x = Math.round(random(90,150))
    nut.y = Math.round(random(100,500))
    nutGroup.add(nut)
  }
}
function babySquirrel(){
  if(frameCount % 1000 === 0){
   var sq = createSprite(550,450)
  sq.addImage(sqimg)
  sq.scale = 0.3
  sq.velocityX = -1

  

  }
  if(squirrel.isTouching(sq)){
    gameState === "youWon"
  }
}





