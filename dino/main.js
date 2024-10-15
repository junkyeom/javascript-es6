var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100 ;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dinosaur.png'

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y, this.width,this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height)
    }
}

var img1 = new Image();
img1.src = 'cactus.png'
 
class Cactus{
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y, this.width,this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}


var timer = 0;
var jumpTimer = 0;
var cacti = [];
var animation;

function 프레임마다실행() {
    animation = requestAnimationFrame(프레임마다실행);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height)

    if (timer % 120 === 0) {
        var cactus = new Cactus();
        cacti.push(cactus);
    }

    cacti.forEach((a,i,o) => {
        if(a.x<0) {
            o.splice(i,1)
        }
        a.x -=5;
        충돌했나(dino, a)
        a.draw();
    });

    if(jump == true) {
        dino.y-=3;
        jumpTimer++;
    }
    if(jump == false) {
        if(dino.y < 200) {
            dino.y+=3; 
        }
    }
    if(jumpTimer > 30) {
        jump = false;
        jumpTimer = 0;
    }

    // dino.y-=2; 
    // dino.x++;
    dino.draw();
}

프레임마다실행();


/** 충돌 확인 */
function 충돌했나(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height)
    if (x축차이 < 0 && y축차이 < 0) {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation); 
    }
}




// 점프 키

var jump = false;

document.addEventListener('keydown', (e)=>{
    if (e.code === 'Space') {
        jump = true;
    }
})