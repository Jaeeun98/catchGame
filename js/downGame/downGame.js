const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreNum = document.querySelector('.score');
const modal = document.querySelector('.modal');
const resultBtn = document.querySelector('.resultplay');
let startEnd = '';
let score = 0;

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
            duration:3000,
        })

        if(startEnd === 'stop'){
            list[i].getAnimations()[0].cancel();
            i = list.length;

            startEnd = 'start';
        } else {
            list[i].style.zIndex = 0;
            i++;
        }
        console.log(i);

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
}

function gameStart(){
    reset();
    setPositionX();
    foodMove();
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

function gameOver(){
    startEnd = 'stop'

    for(let i=0; i < list.length; i++){
        list[i].style.zIndex = -1;
    }
    resultModal('🏅', 'LOSER', 'REPLAY');
}

function catchFood(e){
    const list = e.target.parentElement;

    list.style.zIndex = -1;
    list.getAnimations()[0].cancel();
    list.className === 'meat' ? gameOver() : scoring(e)
}

function scoring(e){
    e.target.alt === 'noMeat' ? score += 4 : score++
    scoreNum.innerText = score;

    (e.target.alt ==='tomato' && score%5 == 0) && resultModal('🥇', 'WIN', 'NEXT')
}

function replay(e){
    for(let i=0; i<list.length; i++){
        list[i].getAnimations()[0] && list[i].getAnimations()[0].cancel();
    }

    modal.style.display = 'none';
    e.target.innerText === 'NEXT' ? foodMove() : gameStart();
}

stopBtn.addEventListener('click', gameOver)
startBtn.addEventListener('click', gameStart);
item.addEventListener('click', e => e.target.tagName == 'IMG' && catchFood(e))
resultBtn.addEventListener('click', e => replay(e))