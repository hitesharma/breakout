const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
const brickRow = 10;
const brickCol = 8;
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
    y:canvas.height-40,
    w:100,
    h:10,
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
const draw = () => {
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}
draw();