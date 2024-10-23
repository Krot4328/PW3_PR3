export const pokemons = [
    {
        name: 'Pikachu',
        type: 'electric',
        hp: 274,
        img: '/assets/pikachu.png',
        attacks: [
            { name: "thunder jolt", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "electro ball", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "volt tackle", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "thunder crack", maxDamage: 100, minDamage: 70, maxCount: 5 }
        ]
    },
    {
        img: '/assets/charmander.png',
        name: 'Charmander',
        type: 'fire',
        hp: 282,
        attacks: [
            { name: "ember", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "flamethrower", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "burning tail", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "fire spin", maxDamage: 70, minDamage: 50, maxCount: 5 }
        ]
    },
    {
        img: '/assets/bulbasaur.png',
        name: 'Bulbasaur',
        type: 'grass',
        hp: 294,
        attacks: [
            { name: "tackle", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "vine whip", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "razor leaf", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "solar beam", maxDamage: 70, minDamage: 50, maxCount: 5 }
        ]
    },
    {
        img: '/assets/squirtle.png',
        name: 'Squirtle',
        type: 'water',
        hp: 292,
        attacks: [
            { name: "bubble", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "water gun", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "shell attack", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "hydro pump", maxDamage: 70, minDamage: 50, maxCount: 5 }
        ]
    },
    {
        img: '/assets/pidgey.png',
        name: 'Pidgey',
        type: 'air',
        hp: 284,
        attacks: [
            { name: "Air Slash", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "Razor Wind", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "Heat Wave", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "Sky Attack", maxDamage: 70, minDamage: 50, maxCount: 5 }
        ]
    },
    {
        img: '/assets/mew.png',
        name: 'Mew',
        type: 'psychic',
        hp: 404,
        attacks: [
            { name: "Pound", maxDamage: 20, minDamage: 10, maxCount: 40 },
            { name: "Ancient Power", maxDamage: 30, minDamage: 20, maxCount: 15 },
            { name: "Aura Sphere", maxDamage: 35, minDamage: 25, maxCount: 10 },
            { name: "Psychic", maxDamage: 70, minDamage: 50, maxCount: 5 }
        ]
    }
];
