/* hardcoded players */

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

let parentsBlock = document.getElementsByClassName('players')[0];
playersData.forEach(el => {
    let firstInlineEl = document.createElement('div');
    firstInlineEl.classList.add('inline');

    let nameEl = document.createElement('div');
    nameEl.classList.add('player__name');
    nameEl.innerHTML = el.name;

    firstInlineEl.appendChild(nameEl);

    let sectionEl = document.createElement('div');
    sectionEl.classList.add('player__section');

    if (el.section) {
        sectionEl.innerHTML = el.section;
    }

    firstInlineEl.appendChild(sectionEl);

    let positionEl = document.createElement('div');
    positionEl.classList.add('player__position');

    if (el.position) {
        positionEl.innerHTML = el.position;
    }

    firstInlineEl.appendChild(positionEl);

    let secondInlineEl = document.createElement('div');
    secondInlineEl.classList.add('inline');

    let numberEl = document.createElement('div');
    numberEl.classList.add('player__number');
    numberEl.innerHTML = el.number;

    secondInlineEl.appendChild(numberEl);

    let playerEl = document.createElement('div');
    playerEl.classList.add('player');

    playerEl.appendChild(firstInlineEl);
    playerEl.appendChild(secondInlineEl);

    parentsBlock.appendChild(playerEl);
});

/* tabs switcher */

let tabButtons = document.getElementsByClassName('tab');

let playersTab = {
    "button": tabButtons[0],
    "section": document.getElementById('tab-players'),
    "visible": true,
    "updateVisibility": function () {
        this.visible = !this.visible;

        this.visible ? this.button.classList.add('tab__focused') : this.button.classList.remove('tab__focused');
    },
    "hide": function () {
        if (this.visible) {
            this.section.classList.add('hidden');
            this.updateVisibility();
        }
    },
    "show": function () {
        if (!this.visible) {
            this.section.classList.remove('hidden');
            this.updateVisibility();
        }
    }
};

let unitsTab = {
    "button": tabButtons[1],
    "section": document.getElementById('tab-units'),
    "visible": false,
    "updateVisibility": function () {
        this.visible = !this.visible;

        this.visible ? this.button.classList.add('tab__focused') : this.button.classList.remove('tab__focused');
    },
    "hide": function () {
        if (this.visible) {
            this.section.classList.add('hidden');
            this.updateVisibility();
        }
    },
    "show": function () {
        if (!this.visible) {
            this.section.classList.remove('hidden');
            this.updateVisibility();
        }
    }
};

playersTab.button.addEventListener('click', () => {
    unitsTab.hide();
    playersTab.show();
});

unitsTab.button.addEventListener('click', () => {
    playersTab.hide();
    unitsTab.show();
});

let modal = document.getElementsByClassName('modal-section')[0];
let modalVisible = false;

modal.addEventListener('click', (event) => {
    if (event.target === modal && modalVisible) {
        modal.classList.add('hidden');
        modalVisible = !modalVisible;
    }
});

/* modal */

let currentModalWindowData = {
    "index": null,
    "name": null,
    "section": null,
    "position": null,
    "number": null,
    "isValid": function () {
        return this.position || this.section;
    },
    "eraseData": function () {
        this.index = null;
        this.name = null;
        this.section = null;
        this.position = null;
        this.number = null;
    }

};

/* player into modal */

let players = document.getElementsByClassName('player');

let playerNameEl = document.getElementsByClassName('player-name')[0];

for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('click', () => {
        if (!modalVisible) {
            currentModalWindowData.index = i;
            currentModalWindowData.name = players[i].getElementsByClassName('player__name')[0].innerText;
            currentModalWindowData.number = +players[i].getElementsByClassName('player__number')[0].innerText;

            playerNameEl.innerHTML = currentModalWindowData.name + ', номер ' + currentModalWindowData.number;

            modal.classList.remove('hidden');
            modalVisible = !modalVisible;
        }
    });
}

/* getting data from modal window */

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
submitButton.addEventListener('click', () => {
    if (currentModalWindowData.section) {
        let sectionToInsert = players[currentModalWindowData.index].getElementsByClassName('player__section')[0];
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

submitButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalVisible = false;
});