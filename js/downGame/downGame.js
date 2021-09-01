const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreNum = document.querySelector('.score');
const modal = document.querySelector('.modal');
const resultBtn = document.querySelector('.resultplay');
const gameRuleBtn = document.querySelector('.gameRuleBtn');
const bg = new Audio('../sound/bg.mp3');
let startEnd = '';
let score = 0;
let mes = 3000;

function setPositionX(){
    for(let i=0; i<list.length; i++){
        const random = Math.floor(Math.random() * 950);
        list[i].style.transform = `translateX(${random}px)`;
    }
}

function foodMove(){
    let i = 0;
    const moveAnimate = setInterval(() => {
        const sectionX = document.querySelector('section').getBoundingClientRect().left;
        const listX = list[i].getBoundingClientRect().left;
        const x = listX - sectionX;

        const ani = list[i].animate([
            { transform :`translate(${x}px, 400px)`}
        ], {
            duration:mes,
        })

        if(startEnd === 'stop'){
            list[i].getAnimations()[0].cancel();
            i = list.length;

            startEnd = 'start';
        } else {
            list[i].style.zIndex = 0;
            i++;
        }

        ani.addEventListener('finish', function(e){
            const target = e.target.effect.target;
            target.className != 'meat' ? gameOver() : target.style.zIndex = -1
        })
        i == list.length && clearInterval(moveAnimate);
    }, 500) 
}

function reset(){
    score = 0;
    scoreNum.innerText = 0;
    startEnd = '';
    mes = 3000;
}

function gameStart(){
    reset();
    setPositionX();
    foodMove();
    soundPlay('bg');
}

function resultModal(icon, text, btn){
    const resultIcon = document.querySelector('.resultIcon');
    const resultText = document.querySelector('.resultWin');
    const resultScore = document.querySelector('.resultScore');

    modal.style.display = 'block';
    resultIcon.innerText = icon
    resultText.innerText = `YOU ${text}`;
    resultScore.innerText = score;
    resultBtn.innerText = btn;

    text === 'WIN' ? soundPlay('gameClear') : soundPlay('gameOver');
}

function gameOver(){
    startEnd = 'stop'

    for(let i=0; i < list.length; i++){
        list[i].style.zIndex = -1;
        list[i].getAnimations()[0] && list[i].getAnimations()[0].cancel();
    }

    resultModal('🏅', 'LOSER', 'REPLAY');
}

function soundPlay(bgm){
    const catchBgm = new Audio('../sound/catch.mp3');
    const gameClearBgm = new Audio('../sound/gameClear.mp3');
    const gameOutBgm = new Audio('../sound/gameOut.mp3');
    const gameRuleModalBgm = new Audio('../sound/gameRuleModal.mp3');

    bgm === 'bg' && !bg.paused || bg.play();
    bgm === 'bgStop' && bg.pause();
    bgm === 'gameOver' && gameOutBgm.play();
    bgm === 'catch' && catchBgm.play();
    bgm === 'gameClear' && gameClearBgm.play();
    bgm === 'gameRule' && gameRuleModalBgm.play();

    
}

function catchFood(e){
    const list = e.target.parentElement;

    list.style.zIndex = -1;
    list.getAnimations()[0].cancel();

    list.className === 'meat' ? gameOver() : scoring(e);
    
}

function scoring(e){
    e.target.alt === 'noMeat' ? score += 4 : score++
    scoreNum.innerText = score;

    (e.target.alt ==='tomato' && score%5 == 0) && resultModal('🥇', 'WIN', 'NEXT')
    soundPlay('catch');
}

function replay(e){


    modal.style.display = 'none';
    if(e.target.innerText === 'NEXT'){
        mes -= 500;
        foodMove();
    } else {
        gameStart();
    } 
}

function viewGameRule(){
    const gameRule = document.querySelector('.gameRule');
    const closeBtn = document.querySelector('.closeBtn');
    gameRule.style.zIndex = '0';

    soundPlay('gameRule');

    closeBtn.addEventListener('click', () => {
        gameRule.style.zIndex = '-1';
    })
}

stopBtn.addEventListener('click', gameOver)
startBtn.addEventListener('click', gameStart);
item.addEventListener('click', e => e.target.tagName == 'IMG' && catchFood(e))
resultBtn.addEventListener('click', e => replay(e))
gameRuleBtn.addEventListener('click', viewGameRule)