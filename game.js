import pokemon from './pokemon.js';
import { pokemons } from './pokemons.js';
import { randomDamage } from './utils.js';

export default class game {
    constructor($control, $logs) {
        this.$control = $control;
        this.$logs = $logs;
        this.player1 = null;
        this.player2 = null;
    }

    startGame() {
        this.selectRandomPokemon();
        this.renderHP();
        this.addAttackButtons();
    }

    selectRandomPokemon() {
        const pikachu = pokemons.find(pokemon => pokemon.name === 'Pikachu');
        const randomIndex2 = Math.floor(Math.random() * pokemons.length);
        const randomPokemon2 = pokemons[randomIndex2];

        const savedHP = this.player1 ? this.player1.damageHP : pikachu.hp;
        const savedAttacks = this.player1 ? this.player1.attackCount : null;

        this.player1 = new pokemon(pikachu.name, pikachu.hp, savedHP, pikachu.img, 'player1', {
            ...pikachu,
            selectors: 'player1',
            savedAttacks: savedAttacks
        });

        this.player2 = new pokemon(randomPokemon2.name, randomPokemon2.hp, randomPokemon2.hp, randomPokemon2.img, 'player2', {
            ...randomPokemon2,
            selectors: 'player2',
        });

        console.log('Selected Pokemon 1 (Pikachu):', pikachu);
        console.log('Selected Pokemon 2:', randomPokemon2);

        this.renderCharacters();
    }

    renderCharacters() {
        const namePlayer1 = document.getElementById('name-player1');
        const namePlayer2 = document.getElementById('name-player2');
        const player1Image = document.getElementById('player1-image');
        const player2Image = document.getElementById('player2-image');
        player1Image.src = this.player1.src;
        player2Image.src = this.player2.src;
        namePlayer1.innerText = this.player1.name;
        namePlayer2.innerText = this.player2.name;
    }

    renderHP() {
        this.player1.renderHP();
        this.player2.renderHP();
    }

    addAttackButtons() {
        this.clearAttackButtons();

        const container1 = document.querySelector('.container1');
        this.player1.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            const formattedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            $btn.innerText = `${formattedName} [${this.player1.getRemainingAttacks(item.name)}]`;

            const btnCount = this.player1.attack(
                this.player1.getRemainingAttacks(item.name),
                $btn,
                formattedName,
                randomDamage(item.minDamage, item.maxDamage),
                this.$logs,
                this.player2,
                this
            );

            $btn.addEventListener('click', () => {
                console.log('Click button ', $btn.innerText);
                btnCount();

                if (this.player2.damageHP === 0) {
                    this.disableAttackButtons('container2');
                }
            });

            container1.appendChild($btn);
        });

        const container2 = document.querySelector('.container2');
        this.player2.attacks.forEach(item => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            const formattedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            $btn.innerText = `${formattedName} [${item.maxCount}]`;

            const btnCount = this.player2.attack(
                item.maxCount,
                $btn,
                formattedName,
                randomDamage(item.minDamage, item.maxDamage),
                this.$logs,
                this.player1,
                this
            );

            $btn.addEventListener('click', () => {
                console.log('Click button ', $btn.innerText);
                btnCount();

                if (this.player1.damageHP === 0) {
                    this.disableAttackButtons('container1');
                    this.disableAttackButtons('container2');
                }
            });

            container2.appendChild($btn);
        });
    }

    clearAttackButtons() {
        const container1 = document.querySelector('.container1');
        const container2 = document.querySelector('.container2');
        container1.innerHTML = '';
        container2.innerHTML = '';
    }

    disableAttackButtons(selector) {
        const buttons = document.querySelectorAll(`.${selector} .button`);
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    replacePlayer2() {
        const randomIndex2 = Math.floor(Math.random() * pokemons.length);
        const randomPokemon2 = pokemons[randomIndex2];

        this.player2 = new pokemon(randomPokemon2.name, randomPokemon2.hp, randomPokemon2.hp, randomPokemon2.img, 'player2', {
            ...randomPokemon2,
            selectors: 'player2',
        });

        console.log('New Player2:', randomPokemon2);

        this.renderCharacters();
        this.renderHP();
        this.addAttackButtons();
    }

    resetGame() {
        const container1 = document.querySelector('.container1');
        const container2 = document.querySelector('.container2');

        container1.innerHTML = '';
        container2.innerHTML = '';

        this.$logs.innerHTML = '';
        this.player1 = null;
        this.player2 = null;
        this.startGame();
    }
}
