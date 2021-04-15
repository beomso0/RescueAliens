let score=0;
let stage =0;
let clickedX = 0;
let clickedY = 0;
let y = 150;
let s = 0.5;
let startX = 200;
let startY = 190;
let startS = 0.5;
let rectStartY = 0;
let onTarget = false;
let rescuedAliens = [];
let rightStartY = 400;
let setSeed = 0;
let launchColor = 66;
let launched = false;
let shipY = 0;
let shipSpeed = 0.3;
let accel = 0.001;
let accel_2 = 0.0005;
let goRed = true;
let refugees = [];
let stars_1 = [];
let stars_2 = [];

function preload() {
  myFont = loadFont('./BMEULJIROTTF.ttf');
}

function setup() {
  //캔버스
  createCanvas(800, 400); 

  //배경 외계인들 array 만들기
  for(let i=0; i<20; i++) {
    refugees.push([random(0,400), random(0,400), random(-90,90), random(0.5,0.8), false]);
  }

  //배경 별 array 만들기
  for(let n=0; n<150; n++) {
    stars_1.push([random(0,400), random(0,180),1]);
    stars_2.push([random(400,800), random(0,400),1]);
  }
}

function draw() {  

  //section 1
  
  ///하늘과 땅 그리기
  drawNightSky(250,0,400);  
  fill(groundColor);
  ellipse(200, 400, 800, 400);

  //section1 별 그리기
  stars_1.forEach(function(item) {
    push();
    noStroke();
    fill(241, 255, 117);
    circle(item[0],item[1],item[2]);
    pop();
  })

  //배경 외계인 그리기
  refugees.forEach(function(item){
      push();
      translate(-200,-200);
      drawAilen(item[0],item[1],item[2],item[3], item[4]);
      pop();
  })

  //새총 틀 그리기
  push();
  translate(0,40);
  strokeCap(SQUARE);
  strokeWeight(10);
  stroke(slingShotColor);
  noFill();  
  line(200,180,200,300);
  arc(200,130,200,100,0,180);
  pop(); 
  
  //오른쪽 배경
  drawNightSky(400,400,800);

  //section2 별 그리기
  stars_2.forEach(function(item) {
    push();
    noStroke();
    fill(241, 255, 117);
    circle(item[0],item[1],item[2]);
    pop();
  })
  
  //새총 동작
  operateShot();

  // section 2

  //section 2 배경 

  //우주선 동작
  if (launched) {
    push();
    launchColor = 255;
    translate(0,-shipY);
    drawSpaceShip();
    shipY += shipSpeed;
    shipSpeed += accel;
    accel += accel_2;
    pop();

    if(shipY > 250){
      push();
      background(115, 115, 115,150);
      textAlign(CENTER);
      fill(255);
      textFont(myFont);
      textSize(25);
      text(rescuedAliens.length + "명의 외계 친구들이 무사히 집으로 돌아갔어요!", 400,200);
      textSize(15);
      text("다시 하려면 R키를 누르세요", 400,300);
      pop();
    }
  } else {
    if (mouseIsPressed && dist(mouseX,mouseY, 600,287) <= 7) {
              
      launchColor += 3;
     
      drawSpaceShip();
      if(launchColor > 300) {
        launched = true;
      }
    } else {
      launchColor = 66;
      drawSpaceShip();
    }
  }
}

//배경 하늘 그리기
function drawNightSky(yEnd, xStart,xEnd) {  
  push();
  noFill();
  for (var y = 0; y < yEnd; y++) {
      var gradientStart = color(0,0,0);
      var gradientEnd = color(13, 0, 77); 
      var inter = map(y, 0, yEnd, 0, 1);
      var c = lerpColor(gradientStart, gradientEnd, inter);
      stroke(c)
      strokeCap(SQUARE)
      strokeWeight(2);
      line(xStart,y,xEnd,y)
  }
  pop();
}

//외계인 개체 그리기
function drawAilen(x = 0, y = 0, angle = 0, scaleParam = 1, rescued = false) {
  push();
  stroke(0);
  translate(x,y);
  translate(200,200);
  scale(scaleParam);
  rotate(angle);
  translate(-200,-200);
  fill(alienColor);
  strokeWeight(3);

  //다리 그리기
  makeBody(0);
  makeBody(-30);
  makeBody(-60);


  //머리 그리기
  ellipse(200,200,40,50);  

  //눈 그리기
  fill(0);
  noStroke();
  ellipse(192,195,7,13);
  ellipse(211,195,7,13);
  fill(255);
  ellipse(192,193,3,3)
  ellipse(191,197,2,2)
  ellipse(211,193,3,3)
  ellipse(210,197,2,2)

  //입그리기
  
  noFill();
  stroke(0);
  strokeWeight(3);
  if(rescued) {
    arc(202,210,8,8,360,180);
  } else {
    arc(202,210,8,8,180,360);
  }

  pop();
}

// 외계인 다리 그리기
function makeBody(angle) { 
  push();
  angleMode(DEGREES);
  translate(200,200);
  rotate(angle);
  translate(-200,-200);
  beginShape();
  curveVertex(186, 218, );
  curveVertex(186, 218);
  curveVertex(171, 236, );
  curveVertex(175, 243, );
  curveVertex(187, 233, );
  curveVertex(195, 222, );
  curveVertex(195, 222,  );
  endShape(CLOSE);
  pop();
}

// 우주선 그리기
function drawSpaceShip() {  
    push();
    stroke(3, 111, 252);
    strokeWeight(3);
    translate(600,250);
    angleMode(DEGREES);
    // rotate(-10);
    arc(0,0,300,100,0,180);
    ellipse(0,0,300,50);
    pop();
    rescuedAliens.forEach(function(item){
      push();
      translate(-200,-200);
      drawAilen(item[0],item[1],item[2],item[3], item[4]);
      pop();
    })
    push();  
    translate(600,250);
    angleMode(DEGREES);
    stroke(116, 185, 255);
    strokeWeight(1);
    fill(116, 185, 255,50);
    arc(0,0,220,350,180,360);
    noStroke();

    let buttonTrans = 127;    
    if(dist(mouseX,mouseY, 600,287) <= 7){
      buttonTrans = 230;
    } 
    fill(launchColor, 155, 245,buttonTrans);
    ellipse(0,37,14,14);
    pop();
}

// 새총 발사 동작
function operateShot() {

  switch(stage) {
    case 0:
      //default (mouse Out)
      push();  
      noStroke();
      fill(shotColor);
      rect(175,170,50,20);
      stroke(255);
      strokeWeight(3);
      line(175, 170+20/2, 100,173); //뒤가 고정
      line(225,170+20/2, 300,173); // 뒤가 고정점
      pop();

      if (mouseX<225 && mouseX >175 && mouseY >170 && mouseY <190) {
        stage = 1;
      }
      break;
    
    case 1: // mouse Over
      push();  
      noStroke();
      fill(shotColor);
      rect(mouseX-25,mouseY-10,50,20);
      stroke(255);
      strokeWeight(3);
      line(mouseX-25, mouseY, 100,173); //뒤가 고정
      line(mouseX+25,mouseY, 300,173); // 뒤가 고정점

      //타겟팅 판정
      if(mouseX >155 && mouseX <245 && mouseY > 270 && mouseY <360) {
        onTarget = true;
      } else {
        onTarget = false;
      }         

      translate(-200,-200);
      drawAilen(mouseX,mouseY-10,0,0.5);
      pop(); 

      //targeting
      push();
      strokeWeight(1);
      stroke(0,255,255);
      if (onTarget){
        fill(214, 48, 49,125);
      } else {
        fill(255,255,255,125);
      }
      rect(155,270,90,90);
      pop();
      
      
      startY = mouseY -10;
      startX = mouseX;
      rectStartY = startY

      break;
    
    case 2: //mouse clicked
      push();
      noStroke();
      fill(shotColor);  


      //새총 제자리 찾아가기
      let virtualLimit =  100;
          
      rect(175,rectStartY,50,20);
      stroke(255);
      strokeWeight(3);
      line(175, rectStartY+10, 100,173); //뒤가 고정
      line(225,rectStartY+10, 300,173); // 뒤가 고정점

      
      alienSpeed = map(startY, 180, 400, 15, 20);
      rectSpeed = map(startY, 180, 400, 15, 20)
      
      if(rectStartY > 170){
        rectStartY -= alienSpeed;
      } else {
        rectStartY += alienSpeed;
      }

      // 외계인 날아가기
      translate(-200,-200);
      drawAilen(200, startY-10, 0, 0.5);      
      
      startY -= alienSpeed;

      if (startY <0) {
        stage = 3;
        startY = 190;
        setSeed = random(0,10000);
      }     

      pop();
      break;
    
    case 3: //외계인 우주선에 태우기
      push();
      noStroke();
      fill(shotColor);
      rect(175,170,50,20);
      stroke(255);
      strokeWeight(3);
      line(175, 170+20/2, 100,173); //뒤가 고정
      line(225,170+20/2, 300,173); // 뒤가 고정점

      if (onTarget) {  //527,154,144,95
        randomSeed(setSeed);
        let randomX = random(527,527+144);
        let randomY = random(154,154+75);

        translate(-200,-200);
        if(rightStartY>230){
          drawAilen(randomX,rightStartY,0,0.5);
          rightStartY -= alienSpeed;
        } else {
          rightStartY = 400;
          rescuedAliens.push([randomX,randomY,0,0.5, true]);
          stage = 0;
        }
        randomSeed();
      } else {
        stage = 0;
      }
      pop();
      break;
  }
}

// 클릭 시 stage 변환 및 적중 판정
function mousePressed() {
  if (stage ==1 && mouseX >155 && mouseX <245 && mouseY > 270 && mouseY <360) {
    stage = 2;
    onTarget = true;
  } else if(stage ==1 && !(mouseX >155 && mouseX <245 && mouseY > 270 && mouseY <360)) {
    stage = 2;
    onTarget = false;
  }
}

// 초기화
function reInit() {
  score=0;
  stage =0;
  clickedX = 0;
  clickedY = 0;
  y = 150;
  s = 0.5;
  startX = 200;
  startY = 190;
  startS = 0.5;
  rectStartY = 0;
  onTarget = false;
  rescuedAliens = [];
  rightStartY = 400;
  setSeed = 0;
  launchColor = 66;
  launched = false;
  shipY = 0;
  shipSpeed = 0.3;
  accel = 0.001;
  accel_2 = 0.0005;
  goRed = true;
}

// 초기화 이벤트 리스너
function keyPressed() {
  if (key == 'r') {
    stage = 0;
    reInit();
  } 
}