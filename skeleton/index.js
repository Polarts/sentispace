
const button = document.getElementById('button');
const container = document.getElementById('container');
const buttonSize = button.getBoundingClientRect();

const mc = new Hammer(button);
mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
mc.get('press').set({time: 0});

var panDirection = 'none';

mc.on("press", function(e) {
    button.style.transition = "none";
    container.classList.add('active');
});
mc.on("panleft panright", function(e) {
    if (panDirection !== 'vertical') {
        panDirection = 'horizontal';
        if (Math.abs(e.deltaX) <= buttonSize.width) {
            button.style.transform=`translateX(${e.deltaX}px)`;
        }
    }   
});
mc.on("panup pandown", function(e) {
    if (panDirection !== 'horizontal') {
        panDirection = 'vertical'
        if (Math.abs(e.deltaY) <= buttonSize.height) {
            button.style.transform=`translateY(${e.deltaY}px)`;
        }
    }
});
mc.on("pressup", function(e) {
    returnToSender();
});
mc.on("panend", function(e) {
    panDirection = 'none';
    returnToSender();
});

function returnToSender() {
    button.style.transition = "transform 0.2s"; 
    button.style.transform = "none"; 
    container.classList.remove('active');
}

function containerMouseEnter() {
    container.classList.add('active');
}

function containerMouseLeave() {
    container.classList.remove('active');
}