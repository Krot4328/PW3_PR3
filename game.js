import { Pokemon } from './pokemon.js';
import { random, generateLog, logAction } from './common.js';

const $btnAttack = document.getElementById('btn-attack');
const $btnHealthUp = document.getElementById('btn-health-up');
const $logs = document.getElementById('logs');

const character = new Pokemon('Dialga', 100, {
    health: 'health-character',
    progressBar: 'progressbar-character'
});
const enemy = new Pokemon('Palkia', 100, {
    health: 'health-enemy',
    progressBar: 'progressbar-enemy'
});

function attackAction() {
    const characterDamage = random(20);
    const enemyDamage = random(20);

    character.changeHP(characterDamage);
    enemy.changeHP(enemyDamage);

    logAction($logs, generateLog(character, enemy, characterDamage, enemyDamage));
}

function healthUpAction() {
    const healAmount = random(20);
    const target = Math.random() > 0.5 ? character : enemy;

    target.healHP(healAmount);
    logAction($logs, `${target.name} відновив ${healAmount} здоров'я!`);
}

function clickCounter(maxClicks, buttonElement, buttonName, action) {
    let clicks = 0;

    function updateButtonText() {
        buttonElement.innerText = `${buttonName} [${maxClicks - clicks}/${maxClicks}]`;
    }
    updateButtonText();

    return function () {
        if (clicks < maxClicks) {
            clicks++;
            console.log(`Кнопка "${buttonName}" натиснута ${clicks} разів. Залишилося натискань: ${maxClicks - clicks}`);
            updateButtonText();

            action();

            if (clicks === maxClicks) {
                buttonElement.disabled = true;
                console.log(`Кнопка "${buttonName}" більше не активна. Максимальна кількість натискань: ${maxClicks}.`);
            }
        }
    };
}

const clickBtnAttack = clickCounter(10, $btnAttack, 'Attack', attackAction);
const clickBtnHealthUp = clickCounter(10, $btnHealthUp, 'Health Up', healthUpAction);

$btnAttack.addEventListener('click', clickBtnAttack);
$btnHealthUp.addEventListener('click', clickBtnHealthUp);

function init() {
    character.renderHP();
    enemy.renderHP();
}

init();
