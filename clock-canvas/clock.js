var WINDOW_WIDTH;
var WINDOW_HEIGHT;//画框的宽高
var RADIUS;//小球半径
var MARGIN_LEFT;
var MARGIN_TOP;//第一个数字距顶部和左边的距离

var curShowTimeSeconds=0;

var balls=[];
const colors=["#FFC0CB","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
    WINDOW_WIDTH= document.body.clientWidth;
    WINDOW_HEIGHT= document.body.clientHeight;
    MARGIN_LEFT= Math.round(WINDOW_WIDTH/10);
    RADIUS= Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP= Math.round(WINDOW_HEIGHT/5);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    curShowTimeSeconds=getCurShowTimeSeconds();
    setInterval(
        function(){
            render(context);
            update();
        }
        ,
        50
    );
};
//返回现在时间的秒数
function getCurShowTimeSeconds(){
    var curTime=new Date();
    var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;
}
//update函数功能：时间改变，生成新的小球，对新生成的小球的运动变化更新
function update(){
    var nextShowTimeSeconds= getCurShowTimeSeconds();
    //render函数执行之后的
    var nextHours= parseInt(nextShowTimeSeconds/3600);
    var nextMinutes= parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds= nextShowTimeSeconds%60;
    //render函数执行之前的
    var curHours= parseInt(curShowTimeSeconds/3600);
    var curMinutes= parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds= curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        if( parseInt(curHours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0, MARGIN_TOP, parseInt(curHours/10));
        }
        if( parseInt(curHours%10)!=parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
        }
        if( parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if( parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        if( parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls( MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if( parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        }
        curShowTimeSeconds= nextShowTimeSeconds;
    }
    updateBalls();
}

function updateBalls(){
    for(var i=0; i<balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y -= balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y<=RADIUS){
            balls[i].y=RADIUS;
            balls[i].vy= -balls[i].vy*0.75;
        }
    }
    //将溢出
    var cnt=0;
    for(var i=0; i<balls.length; i++)
        if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH )
            balls[cnt++]=balls[i];
    while(balls.length> Math.min(300,cnt)){
        balls.pop();
    }
}
//生成小球的数组
function addBalls(x,y,num){
    for(var i=0; i<digit[num].length; i++)
        for(var j=0; j<digit[num][i].length; j++)
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000) )*4,//pow表示次方，ceil表示向上取整，值-4或+4
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length) ]//floor表示向上取整，值1~10
                }
                balls.push(aBall);
            }
}

function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//清空给定矩形内的指定像素。setInterval定时器函数每隔50毫秒重新绘制

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;
    //绘制倒计时小球，冒号占据宽度9*(RADIUS+1)
    renderDigit(MARGIN_LEFT,MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP, parseInt(seconds%10), cxt);
    //绘制往下落的多彩小球
    for(var i=0; i<balls.length; i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI ,true);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x,y, num, cxt){
    //倒计时小球的颜色
    cxt.fillStyle="#89cff0";
    //二维数组
    for(var i=0; i<digit[num].length; i++)
        for(var j=0; j<digit[num][i].length; j++)
            if(digit[num][i][j]==1){
               cxt.beginPath();
               cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI );
               cxt.closePath();
               cxt.fill();
            }
}
