function Niancat(){
document.getElementById('anime').style.display='block';
document.getElementById('Enable').style.display='none';
document.getElementById('Disable').style.display='block';}
function Niancat1(){
document.getElementById('anime').style.display='none';
document.getElementById('Enable').style.display='block';
document.getElementById('Disable').style.display='none';}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
if(!localStorage.getItem("highscore")){
localStorage.setItem("highscore",0);}
var rightPressed=false;
var leftPressed=false;
var text=[];
var r=20;
var vx = 1;
var vy = 0;
var gravity = 0.05;
var ballcolor=[];
var balls=[];
var mballs=[];
var dt=[];
var org=[];
var orgstr=[];
var orgrad=[];
var score1={text:"Score",x:435,y:30};
var score={text:0,x:465,y:30};
var buster = {x:0,y:270,width:50,height:30};
var ball = {x:100,y:30,r:20};
var bullet1 = {x:15,y:270,width:4,height:8};
var bullet3 = {x:35,y:270,width:4,height:8};
var bullet2 = {x:25,y:270,width:4,height:8};
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
var colors=[];
colors.push("Blue"); colors.push("Green"); colors.push("Purple"); colors.push("White");
function drawBall(x,y,z,t) {
  ctx.beginPath();
    ctx.arc(x,y,z, 0, Math.PI*2);
    ctx.fillStyle =colors[t];
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    var pogba= document.getElementById("spaceship");
   ctx.drawImage(pogba,buster.x,buster.y,buster.width,buster.height);
}
function drawBullets() {
    var bullet=document.getElementById("bullet")
     ctx.drawImage(bullet,bullet1.x,canvas.height-bullet1.height-r, bullet1.width, bullet1.height);
     ctx.drawImage(bullet,bullet2.x,canvas.height-bullet2.height-r, bullet2.width, bullet2.height);
 ctx.drawImage(bullet,bullet3.x,canvas.height-bullet3.height-r, bullet3.width, bullet3.height);
}
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);
    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }
    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }
    var dx11=distX-rect.w/2;
    var dy12=distY-rect.h/2;
    return (dx11*dx11+dy12*dy12<=(circle.r*circle.r));
}
function addartificial(x,y,q,str,rad){
balls.push({x:x,y,y,r:rad}); 
balls.push({x:x,y,y,r:rad}); 
org.push(q);
org.push(q);
orgrad.push(0);
orgrad.push(0);
orgstr.push(0);
orgstr.push(0);
dt.push({dx:vx,dy:vy});
dt.push({dx:-vx,dy:vy});
text.push({text:str,x:x,y:y});
text.push({text:str,x:x,y:y});
var hg=Math.floor(Math.random()*4);
ballcolor.push(hg);
ballcolor.push(hg);}
function add(){
var p=Math.floor(Math.random()*50)+1;
var q=Math.floor(Math.random()*150)+1;
var w=Math.floor(Math.random()*20)+20;
if(score.text>40000){
p+=60;}
else if(score.text>20000){
p+=50;}
else if(score.text>10000){
p+=40;}
else if(score.text>5000){
p+=20;}
if(balls.length%2==0){
balls.push({x:w+1,y:q,r:w});}
else{
balls.push({x:500-w-1,y:q,r:w});}
org.push(q);
dt.push({dx:vx,dy:vy});
text.push({text:p,x:balls[0].x,y:balls[0].y});
orgrad.push(w);
orgstr.push(p);
var hg=Math.floor(Math.random()*4);
ballcolor.push(hg);}
add();
function draw1() {
ctx.clearRect(0,0,canvas.width,canvas.height);
var img = document.getElementById("img");
ctx.drawImage(img,0,0,500,300);
drawBullets();
drawPaddle();
ctx.strokeStyle = "Red";
ctx.strokeText(score1.text,score1.x,score1.y);
ctx.strokeStyle = "Red";
ctx.strokeText(score.text,score.x,score.y);
for(var k=0;k<balls.length;k++){
drawBall(balls[k].x,balls[k].y,balls[k].r,ballcolor[k]);
ctx.strokeStyle = "Red";
    ctx.strokeText(text[k].text,balls[k].x,balls[k].y);}
for(var i=0;i<balls.length;i++){
if(balls[i].x + dt[i].dx > canvas.width-balls[i].r || balls[i].x + dt[i].dx < balls[i].r) {
        vx*= -1;
    }
    if(balls[i].y + dt[i].dy > canvas.height-balls[i].r) {
        vy*=-1;
    }
dt[i].dy+=gravity;
balls[i].x+=dt[i].dx;
balls[i].y+=dt[i].dy;
}
if(rightPressed && buster.x < canvas.width-buster.width) {
        buster.x += 7;
    }
    else if(leftPressed && buster.x > 0) {
        buster.x -=7;}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet1.x &&
   balls[i].x - balls[i].r < (bullet1.x + bullet1.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet1.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet1.height-r + bullet1.height)){ 
    bullet1={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet3.x &&
   balls[i].x - balls[i].r < (bullet3.x + bullet3.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet3.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet3.height-r + bullet3.height)){ 
    bullet3={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet2.x &&
   balls[i].x - balls[i].r < (bullet2.x + bullet2.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet2.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet2.height-r + bullet2.height)){ 
    bullet2={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
r+=score.text*0.001+5;
if(r>292){
r=20;
bullet1.x=buster.x+15;
bullet1.y=canvas.height-bullet1.height-r;
bullet1.width=4;
bullet1.height=8;
bullet2.x=buster.x+35;
bullet2.y=canvas.height-bullet1.height-r;
bullet2.width=4;
bullet2.height=8;
bullet3.x=buster.x+25;
bullet3.y=canvas.height-bullet1.height-r;
bullet3.width=4;
bullet3.height=8;
}
score.text+=1;}
function draw() {
ctx.clearRect(0,0,canvas.width,canvas.height);
var img = document.getElementById("img");
ctx.drawImage(img,0,0,500,300);
drawBullets();
drawPaddle();
ctx.strokeStyle = "Red";
ctx.strokeText(score1.text,score1.x,score1.y);
ctx.strokeStyle = "Red";
ctx.strokeText(score.text,score.x,score.y);
for(var k=0;k<balls.length;k++){
drawBall(balls[k].x,balls[k].y,balls[k].r,ballcolor[k]);
ctx.strokeStyle = "Red";
    ctx.strokeText(text[k].text,balls[k].x,balls[k].y);}
for(var i=0;i<balls.length;i++){
if(balls[i].x + dt[i].dx > canvas.width-balls[i].r || balls[i].x + dt[i].dx < balls[i].r) {
        dt[i].dx*= -1;
    }
    if(balls[i].y + dt[i].dy > canvas.height-balls[i].r) {
        dt[i].dy*=-1;
    }
dt[i].dy+=gravity;
balls[i].x+=dt[i].dx;
balls[i].y+=dt[i].dy;
}
if(rightPressed && buster.x < canvas.width-buster.width) {
        buster.x += 7;
    }
    else if(leftPressed && buster.x > 0) {
        buster.x -=7;
    }
for(var j=0;j<balls.length;j++){
var circle={x:balls[j].x,y:balls[j].y,r:balls[j].r};
var rect={x:buster.x,y:buster.y,w:buster.width,h:buster.height};
var bool1;
bool1=RectCircleColliding(circle,rect);
if(bool1===true&&circle.r!=0){
draw1();
function update(){
setTimeout(function(){ alert("Game Over");
if(score.text>localStorage.getItem("highscore")){
localStorage.setItem("highscore",score.text);
alert("Your score is " + score.text + " and that's the new highscore!");}
else{
alert("Your score is " + score.text);
alert("The highscore is " + localStorage.getItem("highscore"));}
document.getElementById("canvas").onclick = function() {randFunction()};
function randFunction() {
document.location.reload();}}, 300);}
update();
clearInterval(interval1);
clearInterval(interval3);
clearInterval(interval2);}}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet1.x &&
   balls[i].x - balls[i].r < (bullet1.x + bullet1.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet1.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet1.height-r + bullet1.height)){ 
    bullet1={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet3.x &&
   balls[i].x - balls[i].r < (bullet3.x + bullet3.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet3.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet3.height-r + bullet3.height)){ 
    bullet3={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
for(var i=0;i<balls.length;i++){
if(balls[i].x + balls[i].r >  bullet2.x &&
   balls[i].x - balls[i].r < (bullet2.x + bullet2.width) &&
   balls[i].y + balls[i].r >  canvas.height-bullet2.height-r &&
   balls[i].y - balls[i].r < (canvas.height-bullet2.height-r + bullet2.height)){ 
    bullet2={x:0,y:0};  
    text[i].text-=1; 
if(text[i].text<=0){
var q1=Math.floor(balls[i].r/2);
var q2=Math.floor(orgstr[i]/2);
if(q1>0&&q2>0){
addartificial(balls[i].x,balls[i].y,org[i],q2,q1);}
score.text+=1000;
balls[i].x=0;
balls[i].y=0;
balls[i].r=0;
text[i].x=0;
text[i].y=0;
text[i].text="";}}}
if(score.text<=10000){
r+=score.text*0.0001+10;}
else{
r+=12;}
if(r>292){
r=20;
bullet1.x=buster.x+15;
bullet1.y=canvas.height-bullet1.height-r;
bullet1.width=4;
bullet1.height=8;
bullet2.x=buster.x+35;
bullet2.y=canvas.height-bullet1.height-r;
bullet2.width=4;
bullet2.height=8;
bullet3.x=buster.x+25;
bullet3.y=canvas.height-bullet1.height-r;
bullet3.width=4;
bullet3.height=8;
}
score.text+=1;}
var interval3=setInterval(add,15000);
var interval1=setInterval(drawBullets,10);
var interval2=setInterval(draw,10);


