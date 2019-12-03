/**
 * Класс вкладки
 *
 * button - кнопка, при нажатии на которую показываем соответствубщую секцию
 * section - секция в контентом соответствующей вкладки
 * visibility - видима ли section сейчас
 * */
class Tab {
    constructor(button, section, visibility) {
        this.button = button;
        this.section = section;
        this.visibility = visibility;
    }

    updateVisibility() {
        this.visibility = !this.visibility;
        if (this.visibility) {
            this.button.classList.add('tab__focused')
        } else {
            this.button.classList.remove('tab__focused');
        }
    }

    show() {
        if (!this.visibility) {
            this.section.classList.remove('hidden');
            this.updateVisibility();
        }
    }

    hide() {
        if (this.visibility) {
            this.section.classList.add('hidden');
            this.updateVisibility();
        }
    }
}

let playersTab = new Tab(document.getElementsByClassName('tab')[0],
                        document.getElementById('tab-players'), true);
let unitsTab = new Tab(document.getElementsByClassName('tab')[1],
                        document.getElementById('tab-units'), false);

playersTab.button.addEventListener('click', () => {
    unitsTab.hide();
    playersTab.show();
});

unitsTab.button.addEventListener('click', () => {
    playersTab.hide();
    unitsTab.show();
});