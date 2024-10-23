export function random(num) {
    return Math.ceil(Math.random() * num);
}

export function randomDamage(a, b) {
    return Math.floor(Math.random() * (Math.floor(b) - Math.ceil(a) + 1)) + Math.ceil(a);
}

