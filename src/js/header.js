var body = document.querySelector('body');
var menuWrapper = document.querySelector('.nav-wrapper');
var menu = document.querySelector('.nav-container');
var buttonMenu = document.querySelector('#button-menu');
var quicklinksButton = document.querySelector('.quicklinks-open-button');

buttonMenu.addEventListener('click', function(){
    menu.classList.toggle('open-menu');
    buttonMenu.classList.toggle('icon-menu');
    buttonMenu.classList.toggle('icon-chevron-right');
    body.classList.toggle('open-menu');
    menuWrapper.classList.toggle('open-menu');
});

quicklinksButton.addEventListener('click', function(){
    quicklinksButton.classList.toggle('quicklinks-open');
});