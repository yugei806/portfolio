const canvas = document.getElementById('canvas');
canvas.width=600;
canvas.height=410;
const underMove = document.getElementById('underMove');
const skyMove = document.getElementById('skyMove');
const rightMove = document.getElementById('rightMove');
const leftMove = document.getElementById('leftMove');
const moveUp = document.getElementById('moveUp');
const sucoa = document.getElementById('sucoa');
const ma = document.getElementById('massege');
var isMoveMino=true;
var isInterval=true;
var intervalMove;
var mino = canvas.getContext('2d');
var ranmino;
var moveSpead = 1500;
var bigPoint = 0;

var underPlase=0;
var widthPlase=0;

var blookCoordinate1=[0,0];
var blookCoordinate2=[0,0];
var blookCoordinate3=[0,0];
var blookCoordinate4=[0,0];


//盤面の定義 何列目か
var coordinate=[
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
 [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true],
];


function viewFlam(){
mino.strokeStyle='blue';
mino.strokeRect(0,0,200,400);
mino.strokeStyle='red';
mino.strokeRect(60,0,80,40);
}
viewFlam();
function romdamMake(){
  var ran = Math.random()*10;
  var tetomino = [];
  if(ran<2){
    tetomino = [[0,0,0,0],
                [0,0,0,0],
                [0,1,1,0],
                [0,1,1,0]];
    blookCoordinate1=[4,2];
    blookCoordinate2=[4,3];
    blookCoordinate3=[5,2];
    blookCoordinate4=[5,3];
  }else if(ran<4){
    tetomino = [[0,0,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,1,0]]
    blookCoordinate1=[4,1];
    blookCoordinate2=[4,2];
    blookCoordinate3=[4,3];
    blookCoordinate4=[5,3];
  }else if(ran<6){
    tetomino = [[0,0,0,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,1,1,0]]
    blookCoordinate1=[4,3];
    blookCoordinate2=[5,1];
    blookCoordinate3=[5,2];
    blookCoordinate4=[5,3];
  }else if(ran<8){
    tetomino = [[0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0]]
    blookCoordinate1=[4,0];
    blookCoordinate2=[4,1];
    blookCoordinate3=[4,2];
    blookCoordinate4=[4,3];
  }else if(ran<10){
    tetomino = [[0,0,0,0],
                [0,1,1,0],
                [0,1,0,0],
                [0,1,0,0]]
    blookCoordinate1=[4,1];
    blookCoordinate2=[4,2];
    blookCoordinate3=[4,3];
    blookCoordinate4=[5,1];
  }
  return tetomino;
}
/**
 * 移動や新しくミノが出る時などに表示させる
 * @param {Number} w 横
 * @param {Number} h 縦
 */

function makeMino(w,h){
  mino.clearRect(0,0,1000,1000)
  showMino();
  if(isMoveMino){
  ranmino = romdamMake();
  isMoveMino=false;
  }
  console.log(ranmino);
  for(var q=0;q<4;q++){
    for(var t=0;t<4;t++){
      console.log(ranmino[q][t])
        if(ranmino[q][t] === 1){
          mino.fillRect(60+(t*20)+w,0+(q*20)+h,20,20);
        }
      }
    }
    if(isInterval){
      intervalMove=setInterval(undermino,moveSpead);
      isInterval=false;
    }
  }
//既存のミノの表示
function showMino(){
  for(var i=0;i<10;i++){
    for(var a=0;a<20;a++){
      if(coordinate[i][a]){
        var height=a*20;
        var width=i*20;
        mino.fillRect(width,height,20,20);
      }
    }
  }
  viewFlam();
}

/**
 * 列がそろうと消して加点する
 */
function deleateMino(){
  var point = 0;
  for(var a=0;a<20;a++){
    var blookCounter=0;
    for(var b=0;b<10;b++){
      if(coordinate[b][a]){
        blookCounter++
      }
    }
    if(blookCounter === 10){
      point++;
      for(var c=0;c<10;c++){
        coordinate[c][a]=false;
      };
      for(var d=0;d<a;d++){
        for(var e=0;e<10;e++){
          if(coordinate[9-e][a-d]){
          coordinate[9-e][a-d]=false;
          coordinate[9-e][(a-d)+1]=true;
          }
        }
      }
    }
  }
  if(point > 0){
  ma.innerText=point+'ライン消去';
  };
  bigPoint+= (point*100)*10;
  sucoa.innerText='得点'+bigPoint
  point = 0;
};

function gameOver(){
  moveUp.innerText='ゲームオーバー'
}


function undermino(){
    if(coordinate[blookCoordinate1[0]][blookCoordinate1[1]+1] || 
       coordinate[blookCoordinate2[0]][blookCoordinate2[1]+1] || 
       coordinate[blookCoordinate3[0]][blookCoordinate3[1]+1] || 
       coordinate[blookCoordinate4[0]][blookCoordinate4[1]+1]  ){
         for(var a=3;a<7;a++){
           for(var b=0;b<2;b++){
             if(coordinate[a][b]){
               gameOver();
               makeMino=null;
               return;
             }
           }
         }
        coordinate[blookCoordinate1[0]][blookCoordinate1[1]]=true;
        coordinate[blookCoordinate2[0]][blookCoordinate2[1]]=true;  
        coordinate[blookCoordinate3[0]][blookCoordinate3[1]]=true;
        coordinate[blookCoordinate4[0]][blookCoordinate4[1]]=true;
        isMoveMino = true;
        isInterval = true;
        ma.innerText='';
        clearInterval(intervalMove);
        deleateMino();
        showMino();
        underPlase=0;
        widthPlase=0;
        makeMino(0,0);
       }else{
         blookCoordinate1[1]+=1;
         blookCoordinate2[1]+=1;
         blookCoordinate3[1]+=1;
         blookCoordinate4[1]+=1;
         underPlase+=20
         makeMino(widthPlase,underPlase);
       }
}

function rightmino(){
  if(blookCoordinate1[0] !== 9 &&
     blookCoordinate2[0] !== 9 &&
     blookCoordinate3[0] !== 9 &&
     blookCoordinate4[0] !== 9){
       if(!coordinate[blookCoordinate1[0]+1][blookCoordinate1[1]] && 
          !coordinate[blookCoordinate2[0]+1][blookCoordinate2[1]] && 
          !coordinate[blookCoordinate3[0]+1][blookCoordinate3[1]] && 
          !coordinate[blookCoordinate4[0]+1][blookCoordinate4[1]] ){
       blookCoordinate1[0]+=1;
       blookCoordinate2[0]+=1;
       blookCoordinate3[0]+=1;
       blookCoordinate4[0]+=1;
       widthPlase+=20;
       makeMino(widthPlase,underPlase);
          };
     };
};

function leftmino(){
  if(blookCoordinate1[0] !== 0 &&
     blookCoordinate2[0] !== 0 &&
     blookCoordinate3[0] !== 0 &&
     blookCoordinate4[0] !== 0){
       if(!(coordinate[blookCoordinate1[0]-1][blookCoordinate1[1]]) && 
        !(coordinate[blookCoordinate2[0]-1][blookCoordinate2[1]]) && 
        !(coordinate[blookCoordinate3[0]-1][blookCoordinate3[1]]) && 
        !(coordinate[blookCoordinate4[0]-1][blookCoordinate4[1]]) ){
      blookCoordinate1[0]-=1;
      blookCoordinate2[0]-=1;
      blookCoordinate3[0]-=1;
      blookCoordinate4[0]-=1;
      widthPlase-=20;
      makeMino(widthPlase,underPlase);
        };
     };
};
makeMino(0,0);
rightMove.onclick=rightmino;
leftMove.onclick=leftmino;
underMove.onclick=undermino;
moveUp.onclick=()=>{
  if(moveSpead >= 100){
    moveSpead -= 700;
  clearInterval(intervalMove);
  intervalMove=setInterval(undermino,moveSpead)
  };
}

