'use strict';

import Game from "../game.js";

const playBtn = document.querySelector('.playBtn');
const stopBtn = document.querySelector('.stopBtn');
const replayBtn = document.querySelector('.replayBtn');
const ul = document.getElementsByTagName('ul')[0];
const li = document.getElementsByTagName('li');
const popup = document.querySelector('.popup');
const count = document.querySelector('.count');
const gameRuleBtn = document.querySelector('.gameRuleBtn');

let timeout;
let resultCount = 0;

const game = new Game();

function gameStart(){
    fieldSeting();
    timerCountDown();
    game.soundPlay('bg');
    resultCount = 0;
    count.innerText = resultCount;
}

function timerCountDown(){
    const timer = document.querySelector('.timer');
    let timerCount = 10;
    timer.innerText = `0:${timerCount}`;
     
    timeout = setInterval(() => {
        timerCount--;
        timer.innerText = `0:${timerCount}`;
    
        if(timerCount == 0) gameEnd('loser')
    }, 1000)
}

function fieldSeting(){
    for(let i=0; i<li.length; i++){
        const randomX = Math.floor(Math.random() * 950);
        const randomY = Math.floor(Math.random() * 200);

        li[i].style.transform = `translate(${randomX}px, ${randomY}px)`;
        li[i].style.zIndex = '0';
    } 
}

function gameEnd(text){
    ul.removeEventListener('click', () => itemCatch);
    playBtn.removeEventListener('click', gameStart);
    clearInterval(timeout);
    if(text == 'win'){
        popupAdd('You Win🥇')
        game.soundPlay('game_win')
    } else {
        popupAdd('You Loser😂');
        game.soundPlay('bug_pull');
    }
}

function replay(){
    popup.style.display = 'none';
    gameStart();
}

function popupAdd(text){
    const result = document.querySelector('.result');

    popup.style.display = 'block';
    result.innerText = text;
}

function itemCatch(e){
    if(e.target.tagName !== 'IMG') return;
    if(e.target.getAttribute('alt') == 'carrot'){
        e.path[1].style.zIndex = '-1';

        resultCount++;
        game.soundPlay('carrot_pull');

        if(resultCount == 15) gameEnd('win');
    } else gameEnd('loser');

    count.innerText = resultCount;
}

playBtn.addEventListener('click', gameStart);
stopBtn.addEventListener('click', gameEnd);
replayBtn.addEventListener('click', e => replay(e));
ul.addEventListener('click', e => itemCatch(e));
gameRuleBtn.addEventListener('click', () => {
    game.viewGameRule();
    game.soundPlay('gameRule');
})