var cvs = document.getElementById("gamepad");

var ctx = cvs.getContext("2d");

// load images

var agent = new Image();
var bg = new Image();
var fg = new Image();
var pipeSouth = new Image();
var bullet = new Image();
var pika = new Image();
var cloud = new Image();

pika.src="images/sprite.png";

agent.src = "images/rick.png";

bg.src = "images/mario.png";
fg.src = "images/track.png";
pipeSouth.src = "images/pipeSouth.png";
bullet.src = "images/Bullet.png"
cloud.src = "images/cloud.png"



// some variables
var constant;

var bX = 100;
var bY = 130;
var base = bY;

var gravity = 0;

var score = 0;

var spriteWidth = 4440; 
var spriteHeight = 400;
var colms = 8;
var singlewidth = spriteWidth/colms; 
var frame_num = 0;
var total_frame = 8; 


// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "audio/wing.wav";
scor.src = "audio/point.wav";


document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 100;
    fly.play();
    setTimeout(land,500);
}

function land() {
	bY = base;
	// body...
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// pipe coordinates

constant = 150;

var pipe = [];
var cld = [];
var blt = [];

pipe[0] = {
    px : cvs.width,
    py : constant
};


cld[0] = {
    cx : cvs.width,
    cy : 0
};

blt[0] = {
    bx : cvs.width,
    by : 0
};


var bullet_speed = 2;


function draw(){
    
    ctx.fillStyle = "#5c94fa";
	ctx.fillRect(0, 0, cvs.width, cvs.height);
    /*ctx.drawImage(bg,390,0);*/
    
    for (var j = 0; j < cld.length; j++) {

        	ctx.drawImage(cloud,cld[j].cx,cld[j].cy,80,80);
        	cld[j].cx-=1;

        	if( cld[j].cx == 100 ){
            	cld.push({
                	cx : cvs.width,
                	cy : getRandomArbitrary(cvs.height/3,cvs.height/2)
            	}); 
        	
        }
        }

    for(var i = 0; i < pipe.length; i++){
        
        
        ctx.drawImage(pipeSouth,pipe[i].px,pipe[i].py);
        ctx.drawImage(fg,pipe[i].px,cvs.height-fg.height/2,fg.width,fg.height/2);

        /*ctx.drawImage(bullet,blt[i].bx,blt[i].by,30,30);*/
             
        pipe[i].px-=10;  // this should be such that if condition for equality should be
        //satisfied with cvs.weidth (canvas width) 
        /*blt[i].bx-=1;*/
        
        if( pipe[i].px == 200 ){
            pipe.push({
                px : cvs.width,
                py : getRandomArbitrary(cvs.height/3,cvs.height-fg.height)
                /*py : Math.floor(Math.random()*cvs.height/2)*/
            }); 
        }

        
        /*if( blt[i].bx == 10 ){
            blt.push({
                bx : cvs.width,
                by : getRandomArbitrary(cvs.height/20,cvs.height/2)
            }); 
        }*/  

        // detect collision
        
        if( /*pipe[i].x < bX + 50 ||*/ pipe[i].y > bY +100){
            location.reload(); // reload the page
        }
        

        if(pipe[i].px < 10){
            score+=0.0001;
            scor.play();
        }    
        
    }
    


    ctx.drawImage(agent,bX,bY,50,100);

    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,20);
    
    requestAnimationFrame(draw);
}

draw();

