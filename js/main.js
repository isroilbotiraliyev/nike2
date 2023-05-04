



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

var counter = 0;
var stars = document.querySelectorAll('.li')

var video = document.querySelector('story__player-video')
var icon = document.querySelector('story__player-icon')

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


