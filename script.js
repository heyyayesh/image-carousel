const canvas = document.querySelector('.canvas');
const images = document.querySelectorAll('.canvas img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const navBtns = document.querySelectorAll('.nav-btns button');

let counter = 1;
const size = images[0].clientWidth;

canvas.style.transform = `translateX(${-size * counter}px)`;
navBtns[0].classList.add('selected');

nextBtn.addEventListener('click', slideRight);

function slideRight(){
    if(counter > images.length-2) return;
    counter++;
    canvas.style.transition = `transform 500ms ease-in-out`;
    canvas.style.transform = `translateX(${-size * (counter)}px)`;

    navBtns.forEach(btn => btn.classList.remove('selected'));
    navBtns[counter-1].classList.add('selected');
}

prevBtn.addEventListener('click', slideLeft);

function slideLeft(){
    if(counter < 1) return;
    counter--;
    canvas.style.transition = `transform 500ms ease-in-out`;
    canvas.style.transform = `translateX(${-size * (counter)}px)`;

    navBtns.forEach(btn => btn.classList.remove('selected'));
    navBtns[counter-1].classList.add('selected');
}

canvas.addEventListener('transitionend', () => {
    if(images[counter].id === 'firstClone'){
        canvas.style.transition = 'none';
        canvas.style.transform = `translateX(${-size}px)`;
        counter = 1;
        navBtns[counter-1].classList.add('selected');
    }

    if(images[counter].id === 'lastClone'){
        canvas.style.transition = 'none';
        canvas.style.transform = `translateX(${-size*5}px)`;
        counter = images.length-2;
        navBtns[counter-1].classList.add('selected');
    }
});

navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => handleNavBtnClick(e));
})

function handleNavBtnClick(e){
    imgIndex = Number(e.target.id);
    canvas.style.transition = 'transform 500ms ease-in-out';
    canvas.style.transform = `translateX(${-size * imgIndex}px)`;
    counter = imgIndex;

    navBtns.forEach(btn => btn.classList.remove('selected'));
    navBtns[counter-1].classList.add('selected');
}

setInterval(slideRight, 5000);