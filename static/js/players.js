/* Захардкоженный массив игроков */
let playersData = [
    {   'name': 'Алексей Климкин',
        'section': '',
        'position': '',
        'number': 13,
    },
    {   'name': 'Павел Башаринов',
        'section': '',
        'position': '',
        'number': 21,
    },
    {   'name': 'Андрей Гардт',
        'section': '',
        'position': '',
        'number': 3,
    },
    {   'name': 'Александр Горячев',
        'section': '',
        'position': '',
        'number': 24,
    },
    {   'name': 'Алексей Захаров',
        'section': '',
        'position': '',
        'number': 15,
    },
];

/**
 * Функция создания html-элемента с данными игрока
 *
 * @param {Object} playerData - объект с данными об игроке: имя, секция, позиция, номер
 * @returns {Object}
 * */
const createPlayer = function(playerData) {
    let firstInlineEl = document.createElement('div');
    firstInlineEl.classList.add('inline');

    let nameEl = document.createElement('div');
    nameEl.classList.add('player__name');
    nameEl.innerHTML = playerData.name;

    firstInlineEl.appendChild(nameEl);

    let sectionEl = document.createElement('div');
    sectionEl.classList.add('player__section');
    if (playerData.section) {
        sectionEl.innerHTML = playerData.section;
    }

    firstInlineEl.appendChild(sectionEl);

    let positionEl = document.createElement('div');
    positionEl.classList.add('player__position');
    if (playerData.position) {
        positionEl.innerHTML = playerData.position;
    }

    firstInlineEl.appendChild(positionEl);

    let secondInlineEl = document.createElement('div');
    secondInlineEl.classList.add('inline');

    let numberEl = document.createElement('div');
    numberEl.classList.add('player__number');
    numberEl.innerHTML = playerData.number;

    secondInlineEl.appendChild(numberEl);

    let playerEl = document.createElement('div');
    playerEl.classList.add('player');

    playerEl.appendChild(firstInlineEl);
    playerEl.appendChild(secondInlineEl);

    return playerEl;
};

let parentsBlock = document.getElementsByClassName('players')[0];

playersData.forEach(playerData => {
    parentsBlock.appendChild(createPlayer(playerData));
});