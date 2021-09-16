'use strict';

import Game from "../game.js";

const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreNum = document.querySelector('.score');
const modal = document.querySelector('.modal');
const resultBtn = document.querySelector('.resultplay');
const gameRuleBtn = document.querySelector('.gameRuleBtn');

let startEnd = '';
let score = 0;
let mes = 3000;

const game = new Game();

function gameStart(){
    reset();
    setPositionX();
    foodMove();
    game.soundPlay('bg');
}

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
            target.className != 'meat' ? gameEnd() : target.style.zIndex = -1
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

function resultModal(icon, text, btn){
    const resultIcon = document.querySelector('.resultIcon');
    const resultText = document.querySelector('.resultWin');
    const resultScore = document.querySelector('.resultScore');

    modal.style.display = 'block';
    resultIcon.innerText = icon
    resultText.innerText = `YOU ${text}`;
    resultScore.innerText = score;
    resultBtn.innerText = btn; 
}

function gameEnd(text){
    startEnd = 'stop'

    for(let i=0; i < list.length; i++){
        list[i].style.zIndex = -1;
        list[i].getAnimations()[0] && list[i].getAnimations()[0].cancel();
    }

    if(text === 'win'){
        resultModal('🥇', 'WIN', 'NEXT')
        game.soundPlay('gameClear')
    } else {
        resultModal('🏅', 'LOSER', 'REPLAY');
        game.soundPlay('gameOver');
    }
}

function catchFood(e){
    const list = e.target.parentElement;

    list.style.zIndex = -1;
    list.getAnimations()[0].cancel();
    list.className === 'meat' ? gameEnd() : scoring(e);
}

function scoring(e){
    e.target.alt === 'noMeat' ? score += 4 : score++
    scoreNum.innerText = score;

    (e.target.alt ==='tomato' && score%5 == 0) && gameEnd('win')
    game.soundPlay('catch');
}

function replay(e){
    modal.style.display = 'none';

    if(e.target.innerText === 'NEXT'){
        mes -= 500;
        foodMove();
    } else gameStart();

}

stopBtn.addEventListener('click', gameEnd)
startBtn.addEventListener('click', gameStart);
item.addEventListener('click', e => e.target.tagName == 'IMG' && catchFood(e))
resultBtn.addEventListener('click', e => replay(e))
gameRuleBtn.addEventListener('click', () => {
    game.viewGameRule();
    game.soundPlay('gameRule');
})