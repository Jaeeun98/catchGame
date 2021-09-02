const button = document.getElementsByTagName('button');
const ul = document.getElementsByTagName('ul')[0];
const li = document.getElementsByTagName('li');
const popup = document.querySelector('.popup');
const count = document.querySelector('.count');
const gameRuleBtn = document.querySelector('.gameRuleBtn');
const bg = new Audio('../sound/bg.mp3');
let timeout;
let resultCount = 0;

function timerCountDown(){
    let timer = document.querySelector('.timer');
    let timerCount = 10;
    timer.innerText = `0:${timerCount}`;
     
    timeout = setInterval(() => {
        timerCount--;
        timer.innerText = `0:${timerCount}`;
    
        if(timerCount == 0){
            clearInterval(timeout);
            popupAdd('You Loser😂');
        }
    }, 1000)
}

function play(){
    if(button[0].className == `play stopBtn`){
        button[0].innerHTML = `&#9632;`
        clearInterval(timeout);
        popupAdd('Replay?!');

        return;
    } else {
        button[0].classList.add('stopBtn');
        button[0].innerHTML = `&#9654;`
    }

    for(let i=0; i<li.length; i++){
        const randomX = Math.floor(Math.random() * 950);
        const randomY = Math.floor(Math.random() * 200);

        li[i].style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
    resultCount = 0;
    count.innerText = resultCount;
    
    timerCountDown();
    audioPlay('bg');
    ul.style.display = 'block';   
}

function replay(){
    for(let i=0; i<li.length-7; i++){
        li[i].style.display = 'block';
    }
    
    popup.style.display = 'none';
    play();
}

function popupAdd(text){
    clearInterval(timeout);
    button[0].classList.remove('stopBtn');

    const result = document.querySelector('.result');

    popup.style.display = 'block';
    result.innerText = text;

    text == 'You Win🥇' ? audioPlay('game_win') : audioPlay('bug_pull');
}

function audioPlay(sound){
    const audio = new Audio(`../sound/${sound}.mp3`);

    sound === 'bg' && !bg.paused || bg.play();
    sound !== 'bg' && audio.play();
}

function del(e){
    if(e.target.tagName !== 'IMG') return;
    if(e.target.getAttribute('alt') == 'carrot'){
        e.path[1].style.display = 'none';

        resultCount++;
        if(resultCount == 15) popupAdd('You Win🥇');

        audioPlay('carrot_pull');
        
    } else popupAdd('You Loser😂');

    count.innerText = resultCount;
}

function viewGameRule(){
    const gameRule = document.querySelector('.gameRule');
    const closeBtn = document.querySelector('.closeBtn');
    gameRule.style.zIndex = '0';

    audioPlay('gameRule');

    closeBtn.addEventListener('click', () => gameRule.style.zIndex = '-1')
}

button[0].addEventListener('click', play);
button[1].addEventListener('click', e => replay(e));
ul.addEventListener('click', e => del(e));
gameRuleBtn.addEventListener('click', viewGameRule)


/*

*css tip*

css의 경우 크기나 색상 같은것은 root를 통해 변수로 만든 후 작성하는 것이 좋음
▶와 같은 것들은 폰트어썸을 통해 만드는 것이좋음
세로 정렬하는 방법 : inline-block or display:flex, colum으로 정렬
position을 사용하지 않고, transform의 translate를 사용하면 위치를 이동시킬 수 있음



*/