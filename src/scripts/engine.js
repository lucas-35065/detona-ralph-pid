const state = {
    views: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelectorAll('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        gameSpeed: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function playSound (){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.1;
    audio.play();
}

function countDown(){
    state.values.currentTime --;
    state.views.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);
        alert (`Game Over! O seu resultado foi: ${state.values.result}`);
    }
}

function randomSquare () {
    state.views.squares.forEach((square)=>{
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.views.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.views.squares.forEach((square) => {
        square.addEventListener('mousedown', ()=>{
            if(square.id === state.values.hitPosition)
                state.values.result++;
                state.views.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
        });
    });
}

function main () {
    addListenerHitBox();
}

main();
