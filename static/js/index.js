/* hardcoded players */

let playersData = [
    {   'name': 'Алексей Климкин',
        'section': '',
        'position': '',
        'number': 1,
    },
    {   'name': 'Павел Башаринов',
        'section': '',
        'position': '',
        'number': 2,
    },
    {   'name': 'Андрей Гардт',
        'section': '',
        'position': '',
        'number': 3,
    },
    {   'name': 'Александр Горячев',
        'section': '',
        'position': '',
        'number': 4,
    },
    {   'name': 'Алексей Захаров',
        'section': '',
        'position': '',
        'number': 5,
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

    if (el.section) {
        let sectionEl = document.createElement('div');
        sectionEl.classList.add('player__section');
        sectionEl.innerHTML = el.section;

        firstInlineEl.appendChild(sectionEl);
    }

    if (el.position) {
        let positionEl = document.createElement('div');
        positionEl.classList.add('player__position');
        positionEl.innerHTML = el.position;

        firstInlineEl.appendChild(positionEl);
    }

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

/* modal window */

let players = document.getElementsByClassName('player');

let playerNameEl = document.getElementsByClassName('player-name')[0];

for (let p of players) {
    p.addEventListener('click', () => {
        if (!modalVisible) {
            playerNameEl.innerHTML = p.getElementsByClassName('player__name')[0].innerText
                + ', номер ' + p.getElementsByClassName('player__number')[0].innerText;
            modal.classList.remove('hidden');
            modalVisible = !modalVisible;
        }
    });
}

