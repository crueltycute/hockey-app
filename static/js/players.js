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
            switch (this.position) {
                case 1:
                    position.innerHTML = 'нападающий по центру';
                    break;
                case 2:
                    position.innerHTML = 'нападающий слева';
                    break;
                case 3:
                    position.innerHTML = 'нападающий справа';
                    break;
                case 4:
                    position.innerHTML = 'защитник слева';
                    break;
                case 5:
                    position.innerHTML = 'нападающий справа';
                    break;
            }
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
playersMap.set(13, new Player('Алексей Климкин', 13));
playersMap.set(21, new Player('Павел Башаринов', 21));
playersMap.set(3, new Player('Андрей Гардт', 3));
playersMap.set(24, new Player('Александр Горячев', 24));
playersMap.set(15, new Player('Алексей Захаров', 15));

let playersBlock = document.getElementsByClassName('players')[0];

playersMap.forEach(player => {
    playersBlock.appendChild(player.createPlayerBlock());
});