/* Массив позиций на поле */
const positions = {
    1: { isOccupied: false, name: 'нападающий по центру' },
    2: { isOccupied: false, name: 'нападающий слева' },
    3: { isOccupied: false, name: 'нападающий справа' },
    4: { isOccupied: false, name: 'защитник слева' },
    5: { isOccupied: false, name: 'защитник справа' }
};

/**
 * Класс игрока
 **/
class Player {
    constructor(name, number, section=1, position='') {
        this.name = name;
        this.number = number;
        this.section = section;
        this.position = position;
        this.isOnField = false;
        this.playerBlock = this.createPlayerBlock();
    }

    setSection(section) {
        if (this.section !== section) {
            this.section = section;

            this.playerBlock.getElementsByClassName('player__section')[0].innerHTML =
                'Звено ' + section;
        }
    }

    setPosition(position) {
        if (this.position !== position) {
            this.position = position;

            this.isOnField = true;

            this.playerBlock.getElementsByClassName('player__position')[0].innerHTML =
                positions[position].name;
        }
    }

    /* Метод создания DOM-элемента */
    createPlayerBlock() {
        const nameSectionAndPosition = document.createElement('div');

        const name = document.createElement('div');
        name.classList.add('player__name');
        name.innerHTML = this.name;

        const section = document.createElement('div');
        section.classList.add('player__section');
        if (this.section) {
            section.innerHTML = 'Звено ' + this.section;
        }

        const position = document.createElement('div');
        position.classList.add('player__position');
        if (this.position) {
            position.innerHTML = positions[this.position].name;
        }

        nameSectionAndPosition.append(name, section, position);

        const number = document.createElement('div');
        number.classList.add('player__number');
        number.innerHTML = this.number;
        number.before(document.createElement('div'));

        const player = document.createElement('div');
        player.classList.add('player');

        player.appendChild(nameSectionAndPosition);
        player.appendChild(number);

        return player;
    };
}

/* Создание и вставка игроков на страницу */
const playersMap = new Map();

(function initPlayers() {
    playersMap.set(13, new Player('Алексей Климкин', 13));
    playersMap.set(21, new Player('Павел Башаринов', 21));
    playersMap.set(3, new Player('Андрей Гардт', 3));
    playersMap.set(24, new Player('Александр Горячев', 24));
    playersMap.set(15, new Player('Алексей Захаров', 15));

    const playersBlock = document.getElementsByClassName('players')[0];

    playersMap.forEach(player => {
        playersBlock.appendChild(player.playerBlock);
    });
})();


/* Модальное окно */
const modalWindow = {
    modalBlock: document.getElementsByClassName('modal-background')[0],
    isVisible: false,
    updateVisibility: function () {
        this.modalBlock.classList.toggle('hidden');

        this.isVisible = !this.isVisible;
    }
};

/* Объект с текущими данными об игроке для открытой модалки */
const currentModalWindowData = {
    name: null,
    section: 1,
    position: null,
    number: null,

    eraseData: function () {
        this.name = null;
        this.position = null;
        this.number = null;
    }
};


const positionButtonCollection = document.getElementsByClassName('position_modal');

/* Закрытие модалки по нажатию вне модального окна */
(function hideModal() {
    modalWindow.modalBlock.addEventListener('click', (event) => {
        if (event.target === modalWindow.modalBlock && modalWindow.isVisible) {
            modalWindow.updateVisibility();
            if (currentModalWindowData.position) {
                positionButtonCollection[currentModalWindowData.position - 1].classList.remove('position_selected');
                positionButtonCollection[currentModalWindowData.position - 1].innerHTML = '?';
            }
            currentModalWindowData.eraseData();
        }
    });
})();

/* Открытие модалки с занесением в нее данных выбранного игрока */
(function initModal() {
    for (let [key, value] of playersMap) {
        value.playerBlock.addEventListener('click', () => {
            if (!value.position) {
                if (!modalWindow.isVisible) {
                    /* В currentModalWindowData получаем данные игрока, на которого кликнули */
                    currentModalWindowData.name = value.name;
                    currentModalWindowData.number = key;

                    document.getElementsByClassName('player-name')[0].innerHTML = currentModalWindowData.name +
                        ', номер ' + currentModalWindowData.number;

                    modalWindow.updateVisibility();
                }
            }
        });
    }
})();

/* Добавление обработчиков в модалку */
(function initModalListeners() {
    /* Обработка нажатия на кнопки позиций и занесение последней кликнутой в currentModalWindowData */

    for (let position of positionButtonCollection) {
        position.addEventListener('click', () => {
            const positionNumber = +position.id.slice(-1);

            if (currentModalWindowData.position !== positionNumber && !positions[positionNumber].isOccupied) {
                if (currentModalWindowData.position) {
                    positionButtonCollection[currentModalWindowData.position - 1].classList.remove('position_selected');
                    positionButtonCollection[currentModalWindowData.position - 1].innerHTML = '?';
                }

                currentModalWindowData.position = positionNumber;

                position.innerHTML = currentModalWindowData.number;
                position.classList.add('position_selected');
            }
        });
    }

    /* Обработка нажатия на кнопку "Подтвердить" в модалке,
     * занесение данных из модалки в поле игрока,
     * очистка currentModalWindowData */
    const submitButton = document.getElementsByClassName('modal-button')[0];

    submitButton.addEventListener('click', () => {
        if (currentModalWindowData.position) {
            if (!positions[currentModalWindowData.position].isOccupied &&
                !playersMap.get(currentModalWindowData.number).isOnField) {

                /* Добавление данных в блок игрока */
                playersMap.get(currentModalWindowData.number).setSection(currentModalWindowData.section);
                playersMap.get(currentModalWindowData.number).setPosition(currentModalWindowData.position);
                playersMap.get(currentModalWindowData.number).playerBlock.classList.add('player_busy');

                positions[currentModalWindowData.position].isOccupied = true;

                /* Убираем подсветку текущей позиции и помечаем ее как занятую */
                positionButtonCollection[currentModalWindowData.position - 1].classList.remove('position_selected');
                positionButtonCollection[currentModalWindowData.position - 1].classList.add('position_occupied');

                /* Добавление в секцию на другой вкладке */
                const otherTabSection = document.getElementById('unit-' + currentModalWindowData.section);
                const otherTabPosition = otherTabSection
                    .getElementsByClassName('position')[currentModalWindowData.position - 1];

                otherTabPosition.classList.add('position_occupied');
                otherTabPosition.getElementsByClassName('position__name')[0].innerHTML =
                    currentModalWindowData.number;
            }
        }

        currentModalWindowData.eraseData();
    });

    /* Скрываем модалку при нажатии на "Подтвердить" */
    submitButton.addEventListener('click', () => {
        modalWindow.updateVisibility();
    });
})();