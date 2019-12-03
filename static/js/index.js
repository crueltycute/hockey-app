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

let players = document.getElementsByClassName('player');

for (let p of players) {
    p.addEventListener('click', el => {
        if (!modalVisible) {
            modal.classList.remove('hidden');
            modalVisible = !modalVisible;
        }
    });
}
