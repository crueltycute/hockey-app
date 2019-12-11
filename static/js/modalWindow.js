function modalWindow(modal) {
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
        index: null,
        name: null,
        section: 1,
        position: null,
        number: null,
        eraseData: function () {
            this.index = null;
            this.name = null;
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
                currentModalWindowData.number = players[i].getElementsByClassName('player__number')[0].innerText;

                document.getElementsByClassName('player-name')[0].innerHTML = currentModalWindowData.name +
                    ', номер ' + currentModalWindowData.number;

                modal.classList.remove('hidden');
                modalVisible = !modalVisible;
            }
        });
    }

    /* Обработка нажатия на кнопки позиций и занесение последней кликнутой в currentModalWindowData */
    let sectionPositions = document.getElementsByClassName('position_modal');

    for (let pos of sectionPositions) {
        pos.addEventListener('click', () => {
            let posNumber = +pos.id.slice(-1);
            if (currentModalWindowData.position !== posNumber) {
                if (currentModalWindowData.position === null) {
                    currentModalWindowData.position = posNumber;
                }
                if (currentModalWindowData.position !== null) {
                    sectionPositions[currentModalWindowData.position - 1].classList.remove('position_selected');
                }
                currentModalWindowData.position = posNumber;

                pos.innerHTML = currentModalWindowData.number;
                pos.classList.add('position_selected');
            }
        });
    }

    const submitButton = document.getElementsByClassName('modal-button')[0];

    /* Обработка нажатия на кнопку "Подтвердить" в модалке,
     * занесение данных из модалки в поле игрока,
     * очистка currentModalWindowData */
    submitButton.addEventListener('click', () => {
        if (currentModalWindowData.position) {
            let sectionToInsert = players[currentModalWindowData.index]
                .getElementsByClassName('player__section')[0];

            sectionToInsert.innerHTML = 'Звено ' + currentModalWindowData.section;

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
        modal.classList.add('hidden');
        modalVisible = false;
    });
}

modalWindow(document.getElementsByClassName('modal-background')[0]);