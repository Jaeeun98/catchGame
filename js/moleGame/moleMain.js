
import Game from "../game.js";
import MoleField from "./moleField.js";

export class GameSetting {
    gameTimer(time){
        this.gameTimer = time;
        return this;
        //클래스 자체를 리턴해주면서 메서드 체이닝 할 수 있도록 만듦
    }

    moleNum(num){
        this.moleNum = num;
        return this;
    }

    bugNum(num){
        this.bugNum = num;
        return this;
    }

    setting(){
        return new MoleMain(this.gameTimer, this.moleNum, this.bugNum)
    }
}

export class MoleMain {
    constructor(gameTimer, moleNum, bugNum){
        this.count = document.querySelector('.count');
        this.ul = document.getElementsByTagName('ul')[0];
        this.ul.addEventListener('click', e => this.itemCatch(e));
        this.replayBtn = document.querySelector('.replayBtn');
        this.replayBtn.addEventListener('click', e => this.replay(e))
        this.time = gameTimer;
        this.moleNum = moleNum;
        this.timeout;
        this.resultCount;
        this.gameStart = false;
        this.game = new Game();
        this.moleField = new MoleField(moleNum, bugNum);
    }

    start(){
        this.reset();
        this.moleField.init();
        this.timer();
        this.game.soundPlay('bg');
    }

    end(result){
        this.gameStart = false;

        clearInterval(this.timeout);
        if(result == 'win'){
            this.popup('You Win🥇')
            this.game.soundPlay('game_win')
        } else {
            this.popup('You Loser😂');
            this.game.soundPlay('bug_pull');
        }
    }

    replay(e){
        this.popup();
        this.reset();
        this.moleField.fieldSeting();
        this.timer();
    }

    reset(){
        this.gameStart = true;
        this.score = 0;
        this.count.innerText = this.score;
    }

    timer(){
        const timer = document.querySelector('.timer');
        let timerCount = this.time;
        timer.innerText = `0:${timerCount}`;
         
        this.timeout = setInterval(() => {
            timerCount--;
            timer.innerText = `0:${timerCount}`;
        
            if(timerCount == 0) this.end('loser')
        }, 1000)
    }

    popup(resultText){
        const popup = document.querySelector('.popup'); 
        const result = document.querySelector('.result');
    
        if(resultText){
            popup.style.display = 'block';
            result.innerText = resultText;
        } else {
            popup.style.display = 'none';
        }
    }

    itemCatch(e){
        if(!this.gameStart) return; 

        if(e.target.tagName !== 'IMG') return;
        if(e.target.getAttribute('alt') == 'mole'){
            e.path[1].style.zIndex = '-1';
    
            this.score++;
            this.game.soundPlay('mole_pull');
    
            if(this.score == this.moleNum) this.end('win');
        } else this.end('loser');
    
        this.count.innerText = this.score;
    }
}