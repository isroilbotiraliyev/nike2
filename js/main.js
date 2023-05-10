document.querySelector('.right').onclick = right;
document.querySelector('.left').onclick = left;

var counter = 0;
var li = document.querySelectorAll( 'li');



let headerContentPrice = document.querySelector('.header__content-price b')
let headerContentSale = document.querySelector('.header__content-sale')
let headerContentEffect = document.querySelector('.header__content-effect')
let headerContentImg = document.querySelector('.header__content-img')
let headerContentDiscountSpan = document.querySelector('.header__content-discount_span')
let headerContentImages = document.querySelector('.header__content-images')


let headerContentDots = document.querySelector('.header__content-dots')
let headerContentDot = document.querySelectorAll('.header__content-dot')
let header = document.querySelector('.header')
let headerContentBtn = document.querySelector('.header__content-btn')
let headerBtn = document.querySelector('.header__btn-content')

headerContentBtn.addEventListener('click', function () {
    header.classList.add("active")   
    
})

headerContentBtn.addEventListener('dblclick', function () {
    header.classList.remove('active')
})


for (let i = 0; i < headerContentDot.length; i++) {
    headerContentDot[i].setAttribute("data-key", i)
}

headerContentDots.addEventListener('click', showInfo);

function showInfo(e) {
    const key = e.target.dataset["key"]
    if (key === undefined) {
        return true;
    }

    headerContentPrice.innerText = images[key].price
    headerContentSale.innerText = images[key].sale
    headerContentEffect.src = `img/header/${images[key].effect}.png`
    console.log(images[key]);
    headerContentDiscountSpan.innerText = images[key].discount
    headerContentImg.src = `img/header/${images[key].dot}`
    headerContentDot.forEach(item => {
        item.classList.remove('active');
    });
    e.target.classList.add('active');
}



function right() {
    li[counter].classList.remove('active-li');

    counter++;
    if (images.length == counter) {
        counter = 0;
    }

    li[counter].classList.add('active-li');
}
function left() {

    li[counter].classList.remove('active-li');
    counter--;
    li[counter].classList.add('active-li');
}

for (let i = 0; i < li.length; i++) {
    li[i].onclick = function () {


        for (let j = 0; j < li.length; j++) {
            li[j].classList.remove('active-li');
        }
        this.classList.add('active-li');
        var dataSlide = this.getAttribute('data-slide');
        counter = dataSlide;

    }
}
for (let i = 0; i < headerContentDots.length; i++) {
    headerContentDots[i].onclick = function () {


        for (let j = 0; j < li.length; j++) {
            headerContentDots[j].classList.remove('active');
        }
        this.classList.add('active');
        var dataSlide = this.getAttribute('data-slide');
        counter = dataSlide;

    }
}



class Player {

    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.hidePanel = true;
        this.timer;
        this.playVideo()
    }

    playVideo() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play-circle',).addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play',).addEventListener('click', this.toggleVideo.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
        this.player.querySelector('.fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
        this.player.querySelector('.mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.volume-slider').addEventListener('input' , this.setVolume.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.panel-line').addEventListener('click', this.setVideoLine.bind(this));




    }


    toggleVideo() {
        this.playing = !this.playing;
        const playIcon = this.player.querySelector('.play  .fas');
        const playCircle = this.player.querySelector('.play-circle');

        playIcon.classList.toggle('fa-play', !this.playing);
        playIcon.classList.toggle('fa-pause', this.playing);


        if (this.playing) {
            this.video.play();
            playCircle.style.display = 'none'
        } else {
            this.video.pause();
            playCircle.style.display = 'block'
        }
    }
    
    toggleFullscreen(){
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.fullscreen .fas');
        fullIcon.classList.toggle('fa-expand', full);
        fullIcon.classList.toggle('fa-compress', !full);

        if(!full) {
            this.player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleVolume(){
        this.sounding = !this.sounding;
        const volumeIcon = this.player.querySelector('.mute  .fas');
        const volumeSlider = this.player.querySelector('.volume-slider');
        volumeIcon.classList.toggle('fa-volume-up', !this.sounding);
        volumeIcon.classList.toggle('fa-volume-mute', this.sounding);
    
        if(this.sounding){
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume' , volumeSlider.value); 
            volumeSlider.value = 0;

        } else{
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }

    setVolume(){
        this.video.volume = this.player.querySelector('.volume-slider').value / 100;
    }

    setVideoTime(){
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.time-duration').innerHTML = `${Math.floor(duration / 60)} : ${Math.floor(duration % 60)}`;
    }

    timeUpdate(){
        const duration = Math.floor(this.video.duration);
        const  current = Math.floor(this.video.currentTime);
        let seconds;

        if(current % 60 < 10){
            seconds = `0${current % 60}`;
        }  else {
            seconds = `${current % 60}`; 
        }

        this.player.querySelector('.time-current').innerHTML = `${Math.floor(current / 60)} : ${seconds}`;
        this.player.querySelector('.panel-line-current').style.width = `${current / duration * 100}%`;


        if(this.hidePanel){
            this.hidePanel = false;
            this.timer = setTimeout(() => {
                this.player.querySelector('.panel').style.bottom = '-70px';
            }, 2000)
        }

        this.video.addEventListener('mousemove', this.hide.bind(this));
    }


    hide(){
        this.hidePanel = true;
        clearTimeout(this.timer);
        document.querySelector('.panel').style.bottom = '0';
    }


    setVideoLine(event){
        const lineWidth = this.player.querySelector('.panel-line').clientWidth;
        const position = event.offsetX;
        const duration = Math.floor(this.video.duration)
        this.player.querySelector('.panel-line-current').style.width = `${position / lineWidth * 100}%`
        this.video.currentTime = position / lineWidth * duration;
    }










}

let playIcon = document.querySelector('.play-circle')
let panel = document.querySelector('.panel')

playIcon.addEventListener('click', function(){
       panel.style.z-index
})  

let player = new Player('.player')





