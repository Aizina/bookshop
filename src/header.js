let navButton = document.getElementById('navButtonId');
let navList = document.getElementById('navListId');

navButton.addEventListener('click', () => {
    navList.classList.toggle('hide');
});
