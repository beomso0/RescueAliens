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

function setup() {
  createCanvas(800, 400);

  //별 그리기
  for (let n = 1; n<150; n++) {
    push();
    noStroke();
    fill(starColor);
    ellipse(random(0,400), random(0,180), 1,1)
    pop();
  }
}

function draw() {
  
  
  ///하늘과 땅 그리기
  drawNightSky(250,0,400);
  fill(groundColor);
  ellipse(200, 400, 800, 400);
  //section 구분선
  line(400,0,400,400);

  //오른쪽 배경
  drawNightSky(400,400,800);

  //section 1

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

  operateShot();

  // section 2

  //section 2 배경

  

  //우주선 
  if (launched) {
    push();
    launchColor = 255;
    translate(0,-shipY);
    drawSpaceShip();
    shipY += shipSpeed;
    shipSpeed += accel;
    accel += accel_2;
    pop();
    
  } else {
    if (mouseIsPressed) {
      launchColor += 3;
      drawSpaceShip();
      if(launchColor > 255) {
        launched = true;
      }
    } else {
      launchColor = 66;
      drawSpaceShip();
    }
  }  
}

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


function makeBody(angle) { //다리 그리기  
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
    fill(launchColor, 155, 245,127);
    ellipse(0,37,14,14);
    pop();
}

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

function mousePressed() {
  if (stage ==1 && mouseX >155 && mouseX <245 && mouseY > 270 && mouseY <360) {
    stage = 2;
    onTarget = true;
  } else if(stage ==1 && !(mouseX >155 && mouseX <245 && mouseY > 270 && mouseY <360)) {
    stage = 2;
    onTarget = false;
  }
  
  console.log(mouseX, Math.round(mouseY));
  navigator.clipboard.writeText(Math.round(mouseX) + ", " + Math.round(mouseY) + ", ");
}

function keyPressed() {
  if (key == 'r') {
    stage = 0;
  }
}