
import Game from "../game.js";
import CarrotField from "./carrotField.js";

export class GameSetting {
    gameTimer(time){
        this.gameTimer = time;
        return this;
        //클래스 자체를 리턴해주면서 메서드 체이닝 할 수 있도록 만듦
    }

    carrotNum(num){
        this.carrotNum = num;
        return this;
    }

    bugNum(num){
        this.bugNum = num;
        return this;
    }

    setting(){
        return new CarrotMain(this.gameTimer, this.carrotNum, this.bugNum)
    }
}

export class CarrotMain {
    constructor(gameTimer, carrotNum, bugNum){
        this.count = document.querySelector('.count');
        this.ul = document.getElementsByTagName('ul')[0];
        this.ul.addEventListener('click', e => this.itemCatch(e));
        this.replayBtn = document.querySelector('.replayBtn');
        this.replayBtn.addEventListener('click', e => this.replay(e))
        this.game = new Game();
        this.carrotField = new CarrotField(carrotNum, bugNum);
        this.time = gameTimer;
        this.carrotNum = carrotNum;
        this.timeout;
        this.resultCount;
    }

    start(){
        this.reset();
        this.carrotField.init();
        this.timer();
    }

    replay(e){
        this.popup();
        this.reset();
        this.carrotField.fieldSeting();
        this.timer();
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

    reset(){
        this.score = 0;
        this.count.innerText = this.score;
    }

    end(result){
        clearInterval(this.timeout);
        if(result == 'win'){
            this.popup('You Win🥇')
            this.game.soundPlay('game_win')
        } else {
            this.popup('You Loser😂');
            this.game.soundPlay('bug_pull');
        }
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
        if(e.target.tagName !== 'IMG') return;
        if(e.target.getAttribute('alt') == 'carrot'){
            e.path[1].style.zIndex = '-1';
    
            this.score++;
            this.game.soundPlay('carrot_pull');
    
            if(this.score == this.carrotNum) this.end('win');
        } else this.end('loser');
    
        this.count.innerText = this.score;
    }

    
}