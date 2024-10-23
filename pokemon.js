import { generateLog } from './log.js';

class selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

export default class pokemon extends selectors {
    constructor(name, defaultHP, damageHP, src, selectors, { attacks = [], savedAttacks = null }) {
        super(selectors);
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = damageHP;
        this.attacks = attacks;
        this.src = src;

        this.attackCount = savedAttacks || attacks.map(attack => attack.maxCount);
        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP } = this;
        elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP = () => {
        this.elProgressbar.style.width = `${(this.damageHP / this.defaultHP) * 100}%`;
    }

    changeHP = (count, character, enemy, $logs, disableAttackButtonsCallback) => {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
            alert(this.name + ' програв бій!');

            if (this === enemy) {
                disableAttackButtonsCallback();
            }
        }

        const $p = document.createElement('p');
        const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
        $p.innerHTML = `${log}`;
        $logs.insertBefore($p, $logs.children[0]);

        this.renderHP();
    }

    getRemainingAttacks(attackName) {
        const attackIndex = this.attacks.findIndex(attack => attack.name === attackName);
        return this.attackCount[attackIndex];
    }

    attack(maxClicks, buttonElement, buttonName, damage, $logs, enemy, gameInstance) {
        let clicks = 0;

        const updateButtonText = () => {
            buttonElement.innerText = `${buttonName} [${maxClicks - clicks}/${maxClicks}]`;
        };
        updateButtonText();

        return () => {
            if (clicks < maxClicks) {
                clicks++;
                const attackIndex = this.attacks.findIndex(attack => attack.name === buttonName.toLowerCase());
                this.attackCount[attackIndex]--;
                updateButtonText();

                const $p = document.createElement('p');
                $p.innerHTML = `Використана атака: ${buttonName} [${maxClicks - clicks}/${maxClicks}]`;
                $logs.insertBefore($p, $logs.children[0]);

                enemy.changeHP(damage, this, enemy, $logs, () => {
                    if (enemy.damageHP === 0) {
                        if (this.name === 'Pikachu') {
                            gameInstance.replacePlayer2();
                        }
                    }
                });

                if (clicks === maxClicks) {
                    buttonElement.disabled = true;
                }
                return true;
            } else {
                return false;
            }
        };
    }
}
