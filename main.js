import Game from './game.js';

const $logs = document.querySelector('#logs');
const $control = document.querySelector('.control');
const game = new Game($control, $logs);

const $btnStartGame = document.getElementById('startGame');
const $playground = document.querySelector('.playground');
const $btnResetGame = document.getElementById('resetGame');

$btnStartGame.addEventListener('click', () => {
    $btnStartGame.style.display = 'none';
    
    $playground.style.display = 'flex';
    $btnResetGame.style.display = 'block';
    
    game.startGame();
});

$btnResetGame.addEventListener('click', () => {
    game.resetGame();
});
