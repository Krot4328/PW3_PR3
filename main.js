const $btnAttack = document.getElementById('btn-attack');
const $btnHealthUp = document.getElementById('btn-health-up');
const $log = document.getElementById('log');

const character = {
    name: 'Dialga',
    defaultHP: 100,
    damageHP: 90,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character')
};

const enemy = {
    name: 'Palkia',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy')
};

$btnAttack.addEventListener('click', function () {
    attack(20);
});

$btnHealthUp.addEventListener('click', function () {
    healthUp(20);
});

function init() {
    updateHealthDisplay(character);
    updateHealthDisplay(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressBarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressBarHP(person) {
    person.elProgressBar.style.width = person.damageHP + '%';
    if (person.damageHP > 50) {
        person.elProgressBar.classList.remove('low', 'critical');
    } else if (person.damageHP <= 50 && person.damageHP > 20) {
        person.elProgressBar.classList.add('low');
        person.elProgressBar.classList.remove('critical');
    } else {
        person.elProgressBar.classList.add('critical');
    }
}

function updateHealthDisplay(person) {
    renderHPLife(person);
    renderProgressBarHP(person);
}

function attack(maxDamage) {
    const characterDamage = random(maxDamage);
    const enemyDamage = random(maxDamage);
    changeHP(characterDamage, character);
    changeHP(enemyDamage, enemy);
    logAction(`${enemy.name} отимав ${enemyDamage} урону!`);
    logAction(`${character.name} отримав ${characterDamage} урону!`);
}

function healthUp(maxHeal) {
    const healAmount = random(maxHeal);
    const target = Math.random() > 0.5 ? character : enemy;
    target.damageHP = Math.min(target.defaultHP, target.damageHP + healAmount);
    updateHealthDisplay(target);
    logAction(`${target.name} відновив ${healAmount} здоров'я!`);
}

function changeHP(damage, person) {
    if (person.damageHP < damage) {
        person.damageHP = 0;
        alert(person.name + ' програв!');
        $btnAttack.disabled = true;
        $btnHealthUp.disabled = true;
    } else {
        person.damageHP -= damage;
    }
    updateHealthDisplay(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function logAction(text) {
    const newLog = document.createElement('p');
    newLog.textContent = text;
    $log.appendChild(newLog);
    $log.scrollTop = $log.scrollHeight;

    setTimeout(() => {
        newLog.style.transition = 'opacity 0.5s ease';
        newLog.style.opacity = 0;
        setTimeout(() => {
            newLog.remove();
        }, 500);
    }, 3000);
}

init();