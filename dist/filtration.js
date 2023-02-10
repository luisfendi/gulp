class Tesla {
  constructor(price, range, speed, mph, title) {
    this.price = price;
    this.range = range;
    this.speed = speed;
    this.mph = mph;
    this.title = title
    this.colors = {
      black: {
        id: 'interiorBlack',
        description: 'Черный салон',
      },
      white: {
        id: 'interiorWhite',
        description: 'Белый салон',
      },
      silver: {
        description: 'Полуночный серебристый металлик',
        alt: 'Серый цвет',
      },
      blue: {
        description: 'Глубокий синий металлик',
        alt: 'Синий цвет',
      },
      red: {
        description: 'Красное многослойное покрытие',
        alt: 'Красный цвет',
      }
    }
    this.wheels = {
      tempest: {
        size: 19,
        title: 'Tempest',
        imgFolder: 'type1'
      },
      arachnid: {
        size: 21,
        title: 'Arachnid',
        imgFolder: 'type2'
      },
    }
    this.interior = {
      black: {
        id: 'interiorBlack',
        description: 'Черный салон',
      },
      white: {
        id: 'interiorWhite',
        description: 'Белый салон',
      },
      cream: {
        id: 'interiorCream',
        description: 'Кремовый салон',
      }
    }
  }
  getPrice() {
    return this.price;
  }
}

class ModelS extends Tesla {
  constructor(...args) {
    super(...args)
    this.sterring = {
      standart: {
        description: 'Стандартный руль',
        id: "controlStandart",
        type: 'wheel-b',
        imgFolder: 'type1'
      },
      yoke: {
        description: 'Прямоугольный руль',
        id: "controlYoke",
        type: 'wheel-y',
        imgFolder: 'type2'
      },

    }
  }
}
class ModelSPlide extends Tesla {
  constructor(...args) {
    super(...args)
    this.steering = null
  }
}

const MODAL_S = new ModelS(
  94900,
  396,
  200,
  3.1,
  'Model S',
);

const MODAL_S_PLAID = new ModelSPlide(
  114990,
  400,
  220,
  3.5,
  'Model S Plaid',
);


//варианты моделей для страницы ModelS
const variants = {
  'model-s': MODAL_S,
  'model-s-plaid': MODAL_S_PLAID
};

let currentVariant = MODAL_S; //по дефолту грузим modelS
let C = currentVariant;
let choosedSteering
let choosedInterier
let choosedWheel
let choosedColor

const inputsWithModel = document.querySelectorAll('.prices__input');
[...inputsWithModel].forEach((input) => {
  input.addEventListener('input', (e) => {
    currentVariant = variants[e.target.value];
    pasteData();
    fillAllSlides();
    buildSwiper();
    listenToChange();
  });
});


//gettingdynamic inform slots
const title = document.querySelector('.detailsCar__title'),
  features = document.querySelector('.detailsCar__feature'),
  range = features.querySelector('.range'),
  speed = features.querySelector('.speed'),
  mph = features.querySelector('.mph'),
  wheels = document.querySelector('.filter-wheels'),
  colors = document.querySelector('.filter-colors'),
  interier = document.querySelector('.filter-interier'),
  steering = document.querySelector('.filter-steering');

//смотрим установлено ли какое-то значение по умолчанию в html
(function detectDefault() {
  [...inputsWithModel].filter((input) => {
    if (input.checked && variants[input.value]) {
      currentVariant = variants[input.value];
    }
    pasteData();
    fillAllSlides();
    buildSwiper();
    listenToChange();
  });
})();

//вставляем информацию на html страницу
function pasteData() {
  const C = currentVariant;
  title.innerText = C.title;
  range.innerText = `${C.range}mi`;
  speed.innerText = `${C.speed}mph`;
  mph.innerText = `${C.mph}sec`;
  buildColorFilterBlock();
  buildWheelsFilterBlock();
  buildInterierBlock();
  C.sterring ? buildSteeringBlock() : null;
}

function buildColorFilterBlock() {
  if (colors.querySelector('.filterCar__item')) return;
  const availableColors = Object.keys(currentVariant.colors);
  availableColors.forEach((color, i) => {
    const colorItem = document.createElement('div');
    colorItem.classList.add('filterCar__item');
    colorItem.innerHTML = `<input class="filterCar__input color" value="${color}" ${i === 0 ? 'checked' : null} type="radio" data-descr="Жемчужно-белое многослойное покрытие" data-state="${color}" name="paint" id="paint${color}">
      <label class="filterCar__label" for="paint${color}"><img src="static/images/img/filter/paint/${color}.png" alt="${currentVariant.colors[color].alt}"></label>`;
    colors.appendChild(colorItem);
  });
}

function buildWheelsFilterBlock() {
  if (wheels.querySelector('.filterCar__item')) return;

  const availableWheels = Object.keys(currentVariant.wheels);
  availableWheels.forEach((type, i) => {
    const wheelItem = document.createElement('div');
    wheelItem.classList.add('filterCar__item');
    wheelItem.innerHTML = `
        <input class="filterCar__input wheels" value="${C.wheels[type].imgFolder}" ${i === 0 ? 'checked' : null} type="radio" data-descr="${C.wheels[type].size}-дюймовые колеса ${C.wheels[type].title}" name="wheels" data-state="tempest" id="wheels${C.wheels[type].title}">
        <label class="filterCar__label" for="wheels${C.wheels[type].title}"><img src="static/images/img/filter/wheels/${type}.png" alt="${C.wheels[type].size}-дюймовые колеса ${title}"></label>
        `;
    wheels.appendChild(wheelItem);
  });
}

function buildInterierBlock() {
  if (interier.querySelector('.filterCar__item')) return;
  const availableInteriers = Object.keys(C.interior);

  availableInteriers.forEach((type, i) => {
    const interierItem = document.createElement('div');
    interierItem.classList.add('filterCar__item');
    interierItem.innerHTML = `
    <input class="filterCar__input interier" value="${type}" ${i === 0 ? 'checked' : null} type="radio" data-descr="${C.interior[type].description}" name="interior" data-state="${type}" id="${C.interior[type].id}">
    <label class="filterCar__label" for="${C.interior[type].id}"><img src="static/images/img/filter/interior/${type}.png" alt="${C.interior[type].description}}"></label>
    `;
    interier.appendChild(interierItem);
  });
}

function buildSteeringBlock() {
  if (steering.querySelector('.filterCar__item')) return;
  const availableSterring = Object.keys(C.sterring);
  availableSterring.forEach((type, i) => {
    const sterringType = document.createElement('div');
    sterringType.classList.add('filterCar__item');
    sterringType.innerHTML = `
    <input class="filterCar__input steering" value="${C.sterring[type].imgFolder}" ${i === 0 ? 'checked' : null} type="radio" data-descr="${C.sterring[type].description}" name="control" data-state="${type}" id="${C.sterring[type].id}">
    <label class="filterCar__label" for="${C.sterring[type].id}"><img src="static/images/img/filter/control/${C.sterring[type].type}.png" alt="${C.sterring[type].description}"></label>
    `;
    steering.appendChild(sterringType);
  });
}



function getFilterCategorieValue(selector) {
  const nodes = document.querySelectorAll(selector);
  let choosedValue = [...nodes].filter(input => input.checked)[0].value;
  [...nodes].forEach(input => {
    input.addEventListener('input', (e) => {
      if (!input.checked) return
      choosedValue = input.value;
    })
  })
  return choosedValue
}

function fillColorImage() {
  const block = document.querySelector('.filterCar__look.paint');
  block.querySelector('img').src = `
    static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg
    `
}

function fillWheelsImage() {
  const block = document.querySelector('.filterCar__look.wheels');
  block.querySelector('img').src = `
    static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg
    `
}

function fillInterierImage() {
  const block = document.querySelector('.filterCar__look.interior');
  block.querySelector('img').src = `
    static/images/img/models/interior/${choosedInterier}/${choosedColor}/5.jpg
    `
}

function fillSteeringImage() {
  const block = document.querySelector('.filterCar__look.control');
  block.querySelector('img').src = `
    static/images/img/models/handlebar/${choosedSteering}/interior/${choosedInterier}/${choosedColor}/1.jpg
    `
}


function fillAllSlides() {
  choosedSteering = getFilterCategorieValue('.filterCar__input.steering')
  choosedInterier = getFilterCategorieValue('.filterCar__input.interier')
  choosedWheel = getFilterCategorieValue('.filterCar__input.wheels')
  choosedColor = getFilterCategorieValue('.filterCar__input.color')

  fillColorImage()
  fillWheelsImage()
  fillInterierImage()
  fillSteeringImage()
}


function listenToChange() {
  const allInputsFilter = document.querySelectorAll('.filterCar__input');
  [...allInputsFilter].forEach(input => {
    const typeOfInput = input.getAttribute('name');
    input.addEventListener('input', () => {
      if (!input.checked) return
      switch (typeOfInput) {
        case 'control':
          choosedSteering = input.value;
        case 'interior':
          choosedInterier = input.value;
        case 'paint':
          choosedColor = input.value;
        case 'wheels':
          choosedWheel = input.value;
      }
      fillAllSlides()
      buildSwiper()
    })
  })
}


function buildSwiper() {
  const swiper = document.querySelector('.swiper-wrapper.swiperConfig__inner');
  if (swiper.querySelector('.swiper-slide')) {
    const slides = [...swiper.querySelectorAll('.swiper-slide')]

    function pasteSrcToImg(slideIndex, imageAddress) {
      slides[slideIndex].querySelector('img').setAttribute('src', imageAddress);
    }

    pasteSrcToImg(0, `static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/1.jpg`)
    pasteSrcToImg(1, `static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg`)
    pasteSrcToImg(2, `static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/3.jpg`)
    pasteSrcToImg(3, `static/images/img/models/handlebar/${choosedSteering}/interior/${choosedInterier}/${choosedColor}/1.jpg`)
    pasteSrcToImg(4, `static/images/img/models/interior/${choosedInterier}/${choosedColor}/5.jpg`)

    return
  }

  function buildSlide(imageAddress) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide')
    slide.classList.add('swiperDetails__slide')
    slide.innerHTML = `<img
    src="${imageAddress}" alt="Slide">`
    return slide
  }
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/1.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/2.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/wheels/${choosedWheel}/interior/${choosedInterier}/${choosedColor}/3.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/handlebar/${choosedSteering}/interior/${choosedInterier}/${choosedColor}/1.jpg`))
  swiper.appendChild(buildSlide(`static/images/img/models/interior/${choosedInterier}/${choosedColor}/5.jpg`))
}