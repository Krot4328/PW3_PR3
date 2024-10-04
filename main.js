const $btnAttack = document.getElementById('btn-attack');
const $btnHealthUp = document.getElementById('btn-health-up');
const $log = document.getElementById('log');

const character = {
    name: 'Dialga',
    defaultHP: 100,
    damageHP: 90,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
    
    renderHP() {
        this.renderHPLife();
        this.renderProgressBarHP();
    },
    
    renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    
    renderProgressBarHP() {
        this.elProgressBar.style.width = this.damageHP + '%';
        if (this.damageHP > 50) {
            this.elProgressBar.classList.remove('low', 'critical');
        } else if (this.damageHP <= 50 && this.damageHP > 20) {
            this.elProgressBar.classList.add('low');
            this.elProgressBar.classList.remove('critical');
        } else {
            this.elProgressBar.classList.add('critical');
        }
    },
    
    changeHP(damage) {
        if (this.damageHP < damage) {
            this.damageHP = 0;
            alert(this.name + ' програв!');
            $btnAttack.disabled = true;
            $btnHealthUp.disabled = true;
        } else {
            this.damageHP -= damage;
        }
        this.renderHP();
    }
};

const enemy = {
    name: 'Palkia',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressBar: document.getElementById('progressbar-enemy'),
    
    renderHP() {
        this.renderHPLife();
        this.renderProgressBarHP();
    },
    
    renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    },
    
    renderProgressBarHP() {
        this.elProgressBar.style.width = this.damageHP + '%';
        if (this.damageHP > 50) {
            this.elProgressBar.classList.remove('low', 'critical');
        } else if (this.damageHP <= 50 && this.damageHP > 20) {
            this.elProgressBar.classList.add('low');
            this.elProgressBar.classList.remove('critical');
        } else {
            this.elProgressBar.classList.add('critical');
        }
    },
    
    changeHP(damage) {
        if (this.damageHP < damage) {
            this.damageHP = 0;
            alert(this.name + ' програв!');
            $btnAttack.disabled = true;
            $btnHealthUp.disabled = true;
        } else {
            this.damageHP -= damage;
        }
        this.renderHP();
    }
};

$btnAttack.addEventListener('click', function () {
    attack(20);
});

$btnHealthUp.addEventListener('click', function () {
    healthUp(20);
});

function init() {
    character.renderHP();
    enemy.renderHP();
}

function attack(maxDamage) {
    const characterDamage = random(maxDamage);
    const enemyDamage = random(maxDamage);
    character.changeHP(characterDamage);
    enemy.changeHP(enemyDamage);
    logAction(`${enemy.name} отримав ${enemyDamage} урону!`);
    logAction(`${character.name} отримав ${characterDamage} урону!`);
}

function healthUp(maxHeal) {
    const healAmount = random(maxHeal);
    const target = Math.random() > 0.5 ? character : enemy;
    target.damageHP = Math.min(target.defaultHP, target.damageHP + healAmount);
    target.renderHP();
    logAction(`${target.name} відновив ${healAmount} здоров'я!`);
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