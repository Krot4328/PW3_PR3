export function random(max) {
    return Math.ceil(Math.random() * max);
}

export function generateLog(firstPokemon, secondPokemon, characterDamage, enemyDamage) {
    const logs = [
        `${firstPokemon.name} згадав щось важливе, але несподівано ${secondPokemon.name}, не пам'ятаючи себе від переляку, вдарив у передпліччя ворога.`,
        `${firstPokemon.name} поперхнувся, і за це ${secondPokemon.name} з переляку приклав прямий удар коліном у лоб ворога.`,
        `${firstPokemon.name} забувся, але в цей час нахабний ${secondPokemon.name}, прийнявши вольове рішення, нечутно підійшовши ззаду, вдарив.`,
        `${firstPokemon.name} прийшов до тями, але несподівано ${secondPokemon.name} випадково завдав потужного удару.`,
        `${firstPokemon.name} поперхнувся, але в цей час ${secondPokemon.name} неохоче розтрощив кулаком <вирізано цензурою> супротивника.`,
        `${firstPokemon.name} здивувався, а ${secondPokemon.name}, похитнувшись, вліпив підлий удар.`,
        `${firstPokemon.name} висморкався, але несподівано ${secondPokemon.name} провів дроблячий удар.`,
        `${firstPokemon.name} похитнувся, і раптово нахабний ${secondPokemon.name} без причини вдарив у ногу супротивника.`,
        `${firstPokemon.name} засмутився, як раптом, несподівано ${secondPokemon.name} випадково вліпив стопою в живіт суперника.`,
        `${firstPokemon.name} намагався щось сказати, але раптом, несподівано ${secondPokemon.name} з нудьги розбив брову супернику.`
    ];

    const logMessage = logs[random(logs.length) - 1];
    
    const damageInfo = `${firstPokemon.name} отримав ${characterDamage} шкоди, а ${secondPokemon.name} отримав ${enemyDamage} шкоди. `;
    const remainingHPInfo = `У ${firstPokemon.name} залишилось ${firstPokemon.damageHP} HP. У ${secondPokemon.name} залишилось ${secondPokemon.damageHP} HP.`;

    return `${logMessage}\n${damageInfo}${remainingHPInfo}`;
}

export function logAction(logContainer, text) {
    const newLog = document.createElement('p');
    newLog.innerHTML = text.replace(/\n/g, '<br>');
    logContainer.insertBefore(newLog, logContainer.children[0]);
    logContainer.scrollTop = logContainer.scrollHeight;

    setTimeout(() => {
        newLog.style.transition = 'opacity 0.5s ease';
        newLog.style.opacity = 0;
        setTimeout(() => newLog.remove(), 500);
    }, 3000);
}
