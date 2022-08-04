function getRandomInt(min, max){
    return (Math.floor(Math.random() * (max-min)+min));
}

//GLOBAL VARIABLES
var game = document.getElementById('game');
const roundNumContent = document.getElementById('roundNum');
const damageLevelContent = document.getElementById('damageLevel')
const killCount = document.getElementById('kill-count');
const healthLevelContent = document.getElementById('healthLevel');
const ctx = game.getContext('2d');
console.log(game.width+" "+game.height);

let rambo; //Main Character
let health = 100;
let money; 
let damageLevel;
let totalKills = 0;

//PICTURE VARIABLES
achiliesFacingLeft = document.getElementById("AFL");
Enemy1Right1 = document.getElementById("Enemy1Right1");

//Game Progression
let roundNum = 1;
var arrayOfBullets = [];

//CLASSES
 
class Hero{
    constructor(x, y, width, height, color, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.image = image;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
class Enemy1{
    constructor(x, y, width, height, color, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.startPos = "Temp";
        this.rendered = false;
        this.health = 100;
        this.image = image;

        // this.render = function() {
        //     ctx.fillStyle = color;
        //     ctx.fillRect(this.x, this.y, this.width, this.height);
        // }
        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    
    
    
}

class Bullet{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
        this.collision = 0;
        this.render = function(){
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    moveBulletUp(){
        this.y -= 3;
        
        if (this.y <= 0 || this.y >= game.height || this.x <= 0 || this.x >= game.width){
            this.alive = false;
        }
    }

    moveBulletRight(){
        this.x +=6;
        this.render();
        if (this.y <= 0 || this.y >= game.height || this.x <= 0 || this.x >= game.width){
            this.alive = false;
        }
    }
    moveBulletDown(){
        this.y += 3;
        this.render();
        if (this.y <= 0 || this.y >= game.height || this.x <= 0 || this.x >= game.width){
            this.alive = false;
        }
    }
    moveBulletLeft(){
        this.x -=6;
        this.render();
        if (this.y <= 0 || this.y >= game.height || this.x <= 0 || this.x >= game.width){
            this.alive = false;
        }
    }
}

//Functions
function bulletUpdate(bullet){
    console.log(bullet.alive);
    console.log(bullet.y);
    if (bullet.alive){
            bullet.moveBulletUp();
    }
    if (bullet.y <= 0 || bullet.y >= game.height || bullet.x <= 0 || bullet.x >= game.width){
        bullet.alive = false;
    }
    bullet.render();
    
}

function detectHit(bulletClass, EnemyClass){
    let hitTest = 
    bulletClass.y + bulletClass.height > EnemyClass.y &&
    bulletClass.y < EnemyClass.y + EnemyClass.height &&
    bulletClass.x + bulletClass.width > EnemyClass.x &&
    bulletClass.x < EnemyClass.x + EnemyClass.width;

    if (hitTest){
        //alert("Enemy has been hit");
        bulletClass.collision++;
        EnemyClass.health -= 50;
        return true;
    }
}

function delay(arr, i) {
    setTimeout(() => {
      arr[i].render();
    }, 2000);
  }

//Starting Screen
document.addEventListener('keydown', movementHandler);
window.addEventListener('DOMContentLoaded', function() {
    rambo = new Hero((game.width/2)-12.75, (game.height/2)-16, 25.5, 32, 'blue', achiliesFacingLeft);
    //rambo = new Hero(achiliesFacingLeft, game.width/2, game.height/2);
    roundNumContent.textContent = `Round: ${roundNum}`;
    const runningGame = this.setInterval(gameLoop, 60);
    
});

///MOVEMENT HANDLER
let i = 0;
let testBullet = new Bullet(game.width/2, game.height/2, 1, 1, "yellow");
testBullet.alive = false;
arrayOfBullets.push(testBullet);
function movementHandler(event){
    
    console.log(`Movement is: ${event.key}`);
    
    if (arrayOfBullets[i].alive === false){
        i++;
        
        if (event.key === "ArrowUp"){
            arrayOfBullets.push(new Bullet(game.width/2, game.height/2, 1, 3, "yellow"));
            
            let upInterval = setInterval(function() {
                arrayOfBullets[i].moveBulletUp();
                arrayOfBullets[i].render();
                if (arrayOfBullets[i].alive === false) {
                    clearInterval(upInterval);
                }
            }, 20);
    
        }

        else if (event.key === "ArrowRight"){
            arrayOfBullets.push(new Bullet(game.width/2, game.height/2, 5, 1, "red"));
            let rightInterval = setInterval(function() {
                arrayOfBullets[i].moveBulletRight();
                if (arrayOfBullets[i].alive === false) {
                    clearInterval(rightInterval);
                }
            }, 20);
        }

        else if (event.key === "ArrowDown"){
            arrayOfBullets.push(new Bullet(game.width/2, game.height/2, 1, 3, "yellow"));
            let downInterval = setInterval(function() {
                arrayOfBullets[i].moveBulletDown();
                if (arrayOfBullets[i].alive === false) {
                    clearInterval(downInterval);
                }
            }, 20);
        }

        else if (event.key === "ArrowLeft"){
            arrayOfBullets.push(new Bullet(game.width/2, game.height/2, 5, 1, "red"));
            let leftInterval = setInterval(function() {
                // console.log(i);
                // console.log(arrayOfBullets[i].alive)
                arrayOfBullets[i].moveBulletLeft();
                if (arrayOfBullets[i].alive === false) {
                    clearInterval(leftInterval);
                }
            }, 20);
        }
    }

    console.log(arrayOfBullets);
    
}

let tempEnemy = new Enemy1(game.width-20, game.height/2, 20, 20, "purple");
let enemyArr = [];


//First Round
let startingPositions = ['Top', 'Right', 'Bottom', 'Left'];
let roundOneArr = [];
for (let i = 0; i < 5; i++){
    roundOneArr.push(new Enemy1(game.width-20, game.height/2-10, 16, 16, "purple", Enemy1Right1));
    roundOneArr[i].startPos = startingPositions[getRandomInt(0, 4)];
    if (roundOneArr[i].startPos === 'Top'){
        roundOneArr[i].x = game.width/2-10;
        roundOneArr[i].y = 0;
    }
    else if (roundOneArr[i].startPos === 'Right'){
        roundOneArr[i].x = game.width-20;
        roundOneArr[i].y = game.height/2-10;
    }
    else if (roundOneArr[i].startPos === 'Bottom'){
        roundOneArr[i].x = game.width/2-10;
        roundOneArr[i].y = game.height-20;
    }
    else if (roundOneArr[i].startPos === 'Left'){
        roundOneArr[i].x = 0;
        roundOneArr[i].y = game.height/2-10;
    }
}
console.log(roundOneArr);
//enemyArr.push(tempEnemy);

//Enemy Movement
let enemyCounter = 0;






//Game Loop
function gameLoop(){
    ctx.clearRect(0, 0, game.width, game.height);
    
    
    for (let i=0; i<roundOneArr.length; i++) {
        task(i);
     }
       
     function task(i) {
       setTimeout(function() {
           if (roundOneArr[i] !== undefined){
                roundOneArr[i].rendered = true;
           }
       }, 2000 * i+1);
    }

    
    for (let i = 0; i < roundOneArr.length; i++){
        if (roundOneArr[i].rendered === true){
            roundOneArr[i].render();
            
        }
    }
    

    
    setTimeout(function(){
        for (let i = 0; i < roundOneArr.length; i++){
            if (roundOneArr[i].rendered === true){
                if (roundOneArr[i].startPos === 'Top'){
                    roundOneArr[i].y += 0.5;
                }
                else if (roundOneArr[i].startPos === 'Right'){
                    roundOneArr[i].x -= 0.5;
                }
                else if (roundOneArr[i].startPos === 'Bottom'){
                    roundOneArr[i].y -= 0.5;
                }
                else if (roundOneArr[i].startPos === 'Left'){
                    roundOneArr[i].x += 0.5;
                }
            }
            
        }
         
        
    }, 10);
    for (let i = 0; i < roundOneArr.length; i++){
        if (detectHit(roundOneArr[i], rambo)){
            health -= 0.5;
            Math.round(health * 100) / 100
            healthLevelContent.textContent = `${health}`;
            if (health <= 0){
                //alert("GAME OVER");
                //break;
            }
        }
        if (arrayOfBullets[arrayOfBullets.length-1].collision === 0){
            detectHit(arrayOfBullets[arrayOfBullets.length-1], roundOneArr[i]);
            if (roundOneArr[i].health <= 0){
                roundOneArr.splice(i, 1);
                totalKills++;
                killCount.textContent = `Total Kills: ${totalKills}`;
            }
            
        }
    }

    
    
    

    rambo.render();
    

}




