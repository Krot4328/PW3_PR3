const $btnAttack = document.getElementById('btn-attack'); 
const $btnHealthUp = document.getElementById('btn-health-up');
const $logs = document.getElementById('logs');

const character = {
    name: 'Dialga',
    defaultHP: 100,
    damageHP: 90,
    elHP: document.getElementById('health-character'),
    elProgressBar: document.getElementById('progressbar-character'),
    
    renderHP() {
        const { defaultHP, damageHP, elHP, elProgressBar } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
        elProgressBar.style.width = `${(damageHP / defaultHP) * 100}%`;
        
        if (damageHP > 50) {
            elProgressBar.classList.remove('low', 'critical');
        } else if (damageHP <= 50 && damageHP > 20) {
            elProgressBar.classList.add('low');
            elProgressBar.classList.remove('critical');
        } else {
            elProgressBar.classList.add('critical');
        }
    },
    
    changeHP(damage) {
        const { name, damageHP } = this;
        
        if (damageHP < damage) {
            this.damageHP = 0;
            alert(`${name} програв!`);
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
        const { defaultHP, damageHP, elHP, elProgressBar } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
        elProgressBar.style.width = `${(damageHP / defaultHP) * 100}%`;
        
        if (damageHP > 50) {
            elProgressBar.classList.remove('low', 'critical');
        } else if (damageHP <= 50 && damageHP > 20) {
            elProgressBar.classList.add('low');
            elProgressBar.classList.remove('critical');
        } else {
            elProgressBar.classList.add('critical');
        }
    },
    
    changeHP(damage) {
        const { name, damageHP } = this;
        
        if (damageHP < damage) {
            this.damageHP = 0;
            alert(`${name} програв!`);
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

    logAction(generateLog(character, enemy, characterDamage, enemyDamage));
}

function healthUp(maxHeal) {
    const healAmount = random(maxHeal);
    const target = Math.random() > 0.5 ? character : enemy;
    
    const { name: targetName, defaultHP, damageHP } = target;
    
    target.damageHP = Math.min(defaultHP, damageHP + healAmount);
    target.renderHP();
    
    logAction(`${targetName} відновив ${healAmount} здоров'я!`);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog({ name: firstPersonName }, { name: secondPersonName }, characterDamage, enemyDamage) {
    const logs = [
        `${firstPersonName} згадав щось важливе, але несподівано ${secondPersonName}, не пам'ятаючи себе від переляку, вдарив у передпліччя ворога.`,
        `${firstPersonName} поперхнувся, і за це ${secondPersonName} з переляку приклав прямий удар коліном у лоб ворога.`,
        `${firstPersonName} забувся, але в цей час нахабний ${secondPersonName}, прийнявши вольове рішення, нечутно підійшовши ззаду, вдарив.`,
        `${firstPersonName} прийшов до тями, але несподівано ${secondPersonName} випадково завдав потужного удару.`,
        `${firstPersonName} поперхнувся, але в цей час ${secondPersonName} неохоче розтрощив кулаком <вирізано цензурою> супротивника.`,
        `${firstPersonName} здивувався, а ${secondPersonName}, похитнувшись, вліпив підлий удар.`,
        `${firstPersonName} висморкався, але несподівано ${secondPersonName} провів дроблячий удар.`,
        `${firstPersonName} похитнувся, і раптово нахабний ${secondPersonName} без причини вдарив у ногу супротивника.`,
        `${firstPersonName} засмутився, як раптом, несподівано ${secondPersonName} випадково вліпив стопою в живіт суперника.`,
        `${firstPersonName} намагався щось сказати, але раптом, несподівано ${secondPersonName} з нудьги розбив брову супернику.`
    ];
    return logs[random(logs.length) - 1];
}

function logAction(text) {
    const newLog = document.createElement('p');
    newLog.textContent = text;
    $logs.insertBefore(newLog, $logs.children[0]);
    $logs.scrollTop = $logs.scrollHeight;

    setTimeout(() => {
        newLog.style.transition = 'opacity 0.5s ease';
        newLog.style.opacity = 0;
        setTimeout(() => {
            newLog.remove();
        }, 500);
    }, 3000);
}

init();
