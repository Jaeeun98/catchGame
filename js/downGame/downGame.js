const item = document.querySelector('.item');
const list = document.querySelectorAll('.item')[0].children
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const scoreNum = document.querySelector('.score');
const modal = document.querySelector('.modal');
const replayBtn = document.querySelector('.replay');
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
            duration:4000,
        })

        if(startEnd === 'stop'){
            list[i].getAnimations()[0].cancel();
            i = list.length;

            startEnd = 'start';
        } else {
            list[i].style.zIndex = 0;
            i++;
        }

        i == list.length && clearInterval(moveAnimate);
        ani.addEventListener('finish', function(e){
            const target = e.target.effect.target;

            
            target.className != 'meat' ? gameStop() : target.style.zIndex = -1
        })
    }, 1000)

    
}

function gameStart(){
    setPositionX();
    foodMove();
    score = 0;
}

function viewModal(){
    const resultScore = document.querySelector('.resultScore');

    for(let i=0; i < list.length; i++){
        list[i].style.zIndex = -1;
    }

    modal.style.display = 'block';
    resultScore.innerText = score;
    scoreNum.innerText = 0;

    startEnd = 'stop'
}

function gameStop(){
   viewModal();
}


function catchFood(e){
    e.style.zIndex = -1;
    e.getAnimations()[0].cancel();

    e.className === 'meat' ? gameStop() : scoring(e)
}

function scoring(e){
    e.className === 'noMeat' ? score += 4 : score++
    scoreNum.innerText = score;
}

stopBtn.addEventListener('click', gameStop)

replayBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    gameStart();
});
startBtn.addEventListener('click', gameStart);
item.addEventListener('click', e => {
    e.target.tagName == 'IMG' && catchFood(e.target.parentElement);
})
