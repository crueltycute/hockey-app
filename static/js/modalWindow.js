let modal = document.getElementsByClassName('modal-section')[0];
let modalVisible = false;

/* Закрытие модалки по нажатию вне модального окна */
modal.addEventListener('click', (event) => {
    if (event.target === modal && modalVisible) {
        modal.classList.add('hidden');
        modalVisible = !modalVisible;
    }
});

/* Объект с текущими данными об игроке для открытой модалки */
let currentModalWindowData = {
    "index": null,
    "name": null,
    "section": null,
    "position": null,
    "number": null,
    "eraseData": function () {
        this.index = null;
        this.name = null;
        this.section = null;
        this.position = null;
        this.number = null;
    }
};

/* Открытие модалки с занесением в нее данных выбранного игрока */
let players = document.getElementsByClassName('player');

for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('click', () => {
        if (!modalVisible) {
            /* В currentModalWindowData получаем данные игрока, на которого кликнули */
            currentModalWindowData.index = i;
            currentModalWindowData.name = players[i].getElementsByClassName('player__name')[0].innerText;
            currentModalWindowData.number = +players[i].getElementsByClassName('player__number')[0].innerText;

            document.getElementsByClassName('player-name')[0].innerHTML = currentModalWindowData.name +
                                                                     + ', номер ' + currentModalWindowData.number;

            modal.classList.remove('hidden');
            modalVisible = !modalVisible;
        }
    });
}

/* Обработка нажатия на кнопки секций и занесение последней кликнутой в currentModalWindowData */
let sectionNumbers = document.getElementsByClassName('sections__item');

for (let num of sectionNumbers) {
    num.addEventListener('click', () => {
        if (currentModalWindowData.section !== num.innerText) {
            if (currentModalWindowData.section !== null) {
                sectionNumbers[currentModalWindowData.section - 1].classList.remove('sections__item_selected');
            }
            currentModalWindowData.section = num.innerText;
            num.classList.add('sections__item_selected');
        }
    });
}

/* Обработка нажатия на кнопки позиций и занесение последней кликнутой в currentModalWindowData */
let sectionPositions = document.getElementsByClassName('position');

for (let pos of sectionPositions) {
    pos.addEventListener('click', () => {
        if (currentModalWindowData.position !== +pos.id) {
            if (currentModalWindowData.position === null) {
                currentModalWindowData.position = +pos.id;
            }
            if (currentModalWindowData.position !== null) {
                sectionPositions[currentModalWindowData.position - 1].classList.remove('position_selected');
            }
            currentModalWindowData.position = +pos.id;

            pos.innerHTML = currentModalWindowData.number;
            pos.classList.add('position_selected');
        }
    });
}

const submitButton = document.getElementsByClassName('modal__button')[0];

/* Обработка нажатия на кнопку "Подтвердить" в модалке,
 * занесение данных из модалки в поле игрока,
 * очистка currentModalWindowData */
submitButton.addEventListener('click', () => {
    if (currentModalWindowData.section) {
        let sectionToInsert = players[currentModalWindowData.index]
            .getElementsByClassName('player__section')[0];

        sectionToInsert.innerHTML = 'Секция ' + currentModalWindowData.section;

        sectionNumbers[currentModalWindowData.section - 1].classList.remove('sections__item_selected');
    }

    if (currentModalWindowData.position) {
        let positionToInsert = players[currentModalWindowData.index].getElementsByClassName('player__position')[0];
        switch (currentModalWindowData.position) {
            case 1:
                positionToInsert.innerHTML = 'нападающий по центру';
                break;
            case 2:
                positionToInsert.innerHTML = 'нападающий слева';
                break;
            case 3:
                positionToInsert.innerHTML = 'нападающий справа';
                break;
            case 4:
                positionToInsert.innerHTML = 'защитник слева';
                break;
            case 5:
                positionToInsert.innerHTML = 'нападающий справа';
                break;
        }

        sectionPositions[currentModalWindowData.position - 1].classList.remove('position_selected');
    }

    currentModalWindowData.eraseData();
});

/* Скрываем модалку при нажатии на "Подтвердить" */
submitButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalVisible = false;
});