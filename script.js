const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
const brickRow = 10;
const brickCol = 5;
const bricks = [];
let i,j;

//create ball properties
const ball = {
    x:canvas.width/2,
    y:canvas.height/2,
    size:10,
    speed:4,
    dx:4,
    dy:-4
}

//draw ball
const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2);
    ctx.fillStyle='#8e05f7';
    ctx.fill();
    ctx.closePath();
}

//create paddle properties
const paddle = {
    x:canvas.width/2-40,
    y:canvas.height-15,
    w:100,
    h:10,
    speed:10,
    dx:0
}

//draw paddle
const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#4e05fa';
    ctx.fill();
    ctx.closePath();
}

//draw scoreboard
const drawScore = () => {
    ctx.font='20px';
    ctx.fillText(`Score: ${score}`,canvas.width-100,20); 
}

//create brick properties
const brick = {
    w:60,
    h:20,
    padding:10,
    offsetX:50,
    offsetY:50,
    visible:true
}

//create bricks
for(i=0; i<brickRow; i++){
    bricks[i]=[];
    for(j=0;j<brickCol; j++){
        const x = i*(brick.w+brick.padding)+brick.offsetX;
        const y = j*(brick.h+brick.padding)+brick.offsetY;
        bricks[i][j]={x,y,...brick};
    }
}

//draw bricks
const drawBricks = () => {
    bricks.forEach(column => {
        column.forEach(row => {
            ctx.beginPath();
            ctx.rect(row.x,row.y,row.w,row.h);
            ctx.fillStyle=row.visible? '#4a7ff0':'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//show all the bricks
const showAll = () => {
    bricks.forEach(column => {
        column.forEach(row => (row.visible = true));
    });
}

//move ball
const moveBall = () => {
    ball.x+=ball.dx;
    ball.y+=ball.dy;

    //wall collision in x-axis
    if(ball.x+ball.size > canvas.width || ball.x-ball.size < 0)
        ball.dx *= -1;

    //wall collision in y-axis
    if(ball.y+ball.size > canvas.height || ball.y-ball.size < 0)
        ball.dy *= -1;

    //paddle collision
    if(ball.x-ball.size > paddle.x && 
       ball.x+ball.size < paddle.x+paddle.w && 
       ball.y+ball.size > paddle.y)
            ball.dy = -ball.speed;

    //brick collision
    bricks.forEach(column => {
        column.forEach(row => {
            if(row.visible){
                if( ball.x-ball.size > row.x && //left brick side
                    ball.x+ball.size < row.x+row.w && //right brick side
                    ball.y+ball.size > row.y && //top brick side
                    ball.y-ball.size < row.y+row.h //bottom brick side
                  ){
                      ball.dy *= -1;
                      row.visible = false;
                  }
                    
            }
        });
    });
    
    //hit bottom
    if(ball.y + ball.size > canvas.height){
        showAll();
        score = 0;
    }
}

//move paddle
const movePaddle = () => {
    paddle.x+=paddle.dx;
    //detect wall
    if(paddle.x+paddle.w>canvas.width)
        paddle.x=canvas.width-paddle.w;
    if(paddle.x<0)
        paddle.x=0;
}

document.addEventListener('keydown',(e) => {
    if(e.key==='Left'||e.key==='ArrowLeft')
        paddle.dx=-paddle.speed;    
    if(e.key==='Right'||e.key==='ArrowRight')
                paddle.dx=paddle.speed;
});

document.addEventListener('keyup',(e) => {
    if  (e.key==='Right'||
        e.key==='ArrowRight'||
        e.key==='Left'||
        e.key==='ArrowLeft')
        paddle.dx=0;
});

const draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

const update = () => {
    draw();
    movePaddle();
    moveBall();
    requestAnimationFrame(update);
}

update();