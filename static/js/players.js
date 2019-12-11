/* Массив позиций на поле */
let positions = [
    { isOccupied: false, name: 'нападающий по центру' },
    { isOccupied: false, name: 'нападающий слева' },
    { isOccupied: false, name: 'нападающий справа' },
    { isOccupied: false, name: 'защитник слева' },
    { isOccupied: false, name: 'защитник справа' }
];

/**
 * Класс игрока
 *
 * name - имя
 * number - номер
 * section - текущая секция (по умолчанию 1)
 * position - текущая позиция на поле
 **/
class Player {
    constructor(name, number, section=1, position='') {
        this.name = name;
        this.number = number;
        this.section = section;
        this.position = position;
        this.playerBlock = this.createPlayerBlock();
    }

    setSection(section) {
        if (this.section !== section) {
            this.section = section;
        }
    }

    setPosition(position) {
        if (this.section !== position) {
            this.position = position;
        }
    }

    /* Метод создания DOM-элемента */
    createPlayerBlock() {
        let nameSectionAndPosition = document.createElement('div');

        let name = document.createElement('div');
        name.classList.add('player__name');
        name.innerHTML = this.name;

        let section = document.createElement('div');
        section.classList.add('player__section');
        if (this.section) {
            section.innerHTML = 'Звено ' + this.section;
        }

        let position = document.createElement('div');
        position.classList.add('player__position');
        if (this.position) {
            position.innerHTML = positions[this.position - 1].name;
        }

        nameSectionAndPosition.append(name, section, position);

        let number = document.createElement('div');
        number.classList.add('player__number');
        number.innerHTML = this.number;
        number.before(document.createElement('div'));

        let player = document.createElement('div');
        player.classList.add('player');

        player.appendChild(nameSectionAndPosition);
        player.appendChild(number);

        return player;
    };
}

/* Создание и вставка игроков на страницу */
let playersMap = new Map();

(function initPlayers() {
    playersMap.set(13, new Player('Алексей Климкин', 13));
    playersMap.set(21, new Player('Павел Башаринов', 21));
    playersMap.set(3, new Player('Андрей Гардт', 3));
    playersMap.set(24, new Player('Александр Горячев', 24));
    playersMap.set(15, new Player('Алексей Захаров', 15));

    let playersBlock = document.getElementsByClassName('players')[0];

    playersMap.forEach(player => {
        playersBlock.appendChild(player.playerBlock);
    });
})();


/* Модальное окно */
const modalWindow = {
    modalBlock: document.getElementsByClassName('modal-background')[0],
    isVisible: false,
    updateVisibility: function () {
        if (this.modalBlock.classList.contains('hidden')) {
            this.modalBlock.classList.remove('hidden');
        } else {
            this.modalBlock.classList.add('hidden');
        }

        this.isVisible = !this.isVisible;
    }
};

/* Объект с текущими данными об игроке для открытой модалки */
let currentModalWindowData = {
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

/* Закрытие модалки по нажатию вне модального окна */
(function hideModal() {
    modalWindow.modalBlock.addEventListener('click', (event) => {
        if (event.target === modalWindow.modalBlock && modalVisible) {
            modalWindow.updateVisibility();
        }
    });
})();

/* Открытие модалки с занесением в нее данных выбранного игрока */
(function initModal() {
    for (let [key, value] of playersMap) {
        value.playerBlock.addEventListener('click', () => {
            if (!modalWindow.isVisible) {
                /* В currentModalWindowData получаем данные игрока, на которого кликнули */
                currentModalWindowData.name = value.name;
                currentModalWindowData.number = key;

                document.getElementsByClassName('player-name')[0].innerHTML = currentModalWindowData.name +
                    ', номер ' + currentModalWindowData.number;

                modalWindow.updateVisibility();
            }
        });
    }
})();

/* Добавление обработчиков в модалку */
(function initModalListeners() {
    /* Обработка нажатия на кнопки позиций и занесение последней кликнутой в currentModalWindowData */
    const positionButtonCollection = document.getElementsByClassName('position_modal');

    for (let position of positionButtonCollection) {
        position.addEventListener('click', () => {
            const positionNumber = +position.id.slice(-1);
            if (currentModalWindowData.position !== positionNumber) {
                if (currentModalWindowData.position) {
                    positionButtonCollection[currentModalWindowData.position - 1].classList.remove('position_selected');
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
            /* Добавление данных в блок игрока */
            console.log(currentModalWindowData.number);
            let sectionToInsert = playersMap.get(currentModalWindowData.number).playerBlock
                .getElementsByClassName('player__section')[0];
            sectionToInsert.innerHTML = 'Звено ' + currentModalWindowData.section;

            let positionToInsert = playersMap.get(currentModalWindowData.number).playerBlock
                .getElementsByClassName('player__position')[0];
            positionToInsert.innerHTML = positions[currentModalWindowData.position - 1].name;

            /* Убираем подсветку текущей позиции */
            positionButtonCollection[currentModalWindowData.position - 1].classList.remove('position_selected');

            /* Добавление в секцию на другой вкладке */
            let otherTabSection = document.getElementById('unit-' + currentModalWindowData.section);
            let otherTabPosition = otherTabSection
                .getElementsByClassName('position')[currentModalWindowData.position - 1];

            otherTabPosition.classList.add('position_occupied');
            otherTabPosition.getElementsByClassName('position__name')[0].innerHTML =
                currentModalWindowData.number;
        }

        currentModalWindowData.eraseData();
    });

    /* Скрываем модалку при нажатии на "Подтвердить" */
    submitButton.addEventListener('click', () => {
        modalWindow.updateVisibility();
    });
})();