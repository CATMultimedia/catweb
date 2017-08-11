var pageWrapper = document.querySelector('.page-wrapper');
var menuWrapper = document.querySelector('.nav-wrapper');
var menu = document.querySelector('.nav-container');
var buttonMenu = document.querySelector('#button-menu');
var quicklinksButton = document.querySelector('.quicklinks-open-button');
var mainLinks = document.querySelectorAll('.main-link');
var menuBar = document.querySelector('.menu-title');


buttonMenu.addEventListener('click', function(){
    menu.classList.toggle('open-menu');
    buttonMenu.classList.toggle('icon-menu');
    buttonMenu.classList.toggle('icon-chevron-right');
    pageWrapper.classList.toggle('open-menu');
    menuWrapper.classList.toggle('open-menu');
});

quicklinksButton.addEventListener('click', function(){
    quicklinksButton.classList.toggle('quicklinks-open');
});


function closeAllLinks() {
    for (var i=0; i < mainLinks.length; i++){
        mainLinks[i].classList.remove('open-dropdown');
    }
}


//opening Main Links on mobile
for (var c=0; c < mainLinks.length; c++){
    mainLinks[c].addEventListener('click', function(e){
        if (e.target.classList.contains('main-link') && !(e.target.classList.contains('open-dropdown'))){
            closeAllLinks();
            e.target.classList.add('open-dropdown');
        }
        else if (e.target.parentNode.classList.contains('main-link') && !(e.target.parentNode.classList.contains('open-dropdown'))){
            closeAllLinks();
            e.target.parentNode.classList.add('open-dropdown');
        }
        else {
            closeAllLinks();
        }
    }, false);
}

//closing main links by pressing menu bar/top bar

menuBar.addEventListener('click', closeAllLinks);

