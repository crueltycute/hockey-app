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
