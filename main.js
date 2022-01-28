import { Pokemon } from './pokemon.js'
import { random } from './tools.js'

const buttons = document.querySelectorAll('.button.action-button')
const logsWrapper = document.querySelector('#logs')

logsWrapper.scrollTop = logsWrapper.scrollHeight;

let isGameFinished = false

const initCounter = () => {
    const LIMIT = 7;
    let counter = 0

    return () => {
        counter = counter + 1 >= LIMIT ? LIMIT : counter + 1    

        if (counter != LIMIT) {
            console.log(`[${counter}/${LIMIT-1}]`);
        }
        else {
            console.log(`The end`)
        }

        return counter + 1 <= LIMIT
    }
}

const finishGame = () => {
    isGameFinished = true

    Array.from(buttons).forEach((button) => {
        button.disabled = true;
    })
}

const Pikachu = new Pokemon(
    'Pikachu',
    document.querySelector('#health-character'),
    document.querySelector('#progressbar-character')
)

const Charmander = new Pokemon(
    'Charmander',
    document.querySelector('#health-enemy'),
    document.querySelector('#progressbar-enemy')
)

const listenerHandler = (limits) => {
    if (!isGameFinished) {
        const pikachuLog = Pikachu.changeHP(random(...limits), Charmander);

        if (Pikachu.isDead) {
            finishGame()
        } else {
            const charmLog = Charmander.changeHP(random(...limits), Pikachu);
            logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`<p>${pikachuLog}</p>`, `<p>${charmLog}</p>`)
            logsWrapper.scrollTop = logsWrapper.scrollHeight;
        }

        if (Charmander.isDead) {
            finishGame()
        }
    }
}

Array.from(buttons).forEach((button) => {
    const limitsDamage = button.dataset.damage.split(', ')

    const inc = initCounter()
    
    button.addEventListener('click', () => {
        if (inc()) {
            listenerHandler(limitsDamage);
        }
        else {
            button.disabled = true;
            logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`--------- Your character is tired and cannot make this attack ---------`);
            logsWrapper.scrollTop = logsWrapper.scrollHeight;
        }

    })
})

Pikachu.renderHP()
Charmander.renderHP()