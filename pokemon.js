export class Pokemon {
    constructor(name, defaultHP, elementIDs) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = document.getElementById(elementIDs.health);
        this.elProgressBar = document.getElementById(elementIDs.progressBar);
    }

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
    }

    changeHP(damage) {
        if (this.damageHP < damage) {
            this.damageHP = 0;
            alert(`${this.name} програв!`);
            this.disableControls();
        } else {
            this.damageHP -= damage;
        }
        this.renderHP();
    }

    healHP(healAmount) {
        this.damageHP = Math.min(this.defaultHP, this.damageHP + healAmount);
        this.renderHP();
    }

    disableControls() {
        document.getElementById('btn-attack').disabled = true;
        document.getElementById('btn-health-up').disabled = true;
    }
}
