async function getAll() {
    const url = 'https://im3.uv-index-usa.com/backend/api/getAll.php';
try {
    const response = await fetch(url); //-> await: code muss warten bis API zurück kommt?
    const data = await response.json();
    console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
    console.error(error)
    }
}

getAll()

async function getByDate(date) {
        const url = `https://im3.uv-index-usa.com/backend/api/getByDate.php?date=${date}`;
try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // gibt die Daten der API in der Konsole aus
} catch (error) {
    console.error(error)
    }
}

/*
const datepicker = document.querySelector('#datepicker');
datepicker.addEventListener('change', function() {
    const date = datepicker.value;
    console.log(date);
})*/

const Pin_Bern = document.querySelector('#Pin_Bern');
const Pin_Cairo = document.querySelector('#Pin_Cairo');
const Pin_Vancouver = document.querySelector('#Pin_Vancouver');
const Pin_RiodeJaneiro = document.querySelector('#Pin_RiodeJaneiro');
const Pin_Shanghai = document.querySelector('#Pin_Shanghai');
const Pin_Melbourne = document.querySelector('#Pin_Melbourne');

const dialog = document.querySelector('#dialog');
const postcardImg = document.querySelector('#postcard-image');
const btn_close = document.querySelector('#btn-close');

function openPostcard(city, imagePath) {
  postcardImg.alt = `Postkarte ${city}`;

  const preloadImg = new Image();
  preloadImg.src = imagePath;

  preloadImg.onload = () => {
    postcardImg.src = imagePath;

    dialog.showModal();
  };
}

Pin_Bern.addEventListener('click', () => {
  openPostcard('Bern', 'assets/Postkarte_Bern.png');
});

Pin_Vancouver.addEventListener('click', () => {
  openPostcard('Vancouver', 'assets/Postkarte_Vancouver.png');
});

Pin_RiodeJaneiro.addEventListener('click', () => {
  openPostcard('Rio de Janeiro', 'assets/Postkarte_RiodeJaneiro.png');
});

Pin_Cairo.addEventListener('click', () => {
  openPostcard('Kairo', 'assets/Postkarte_Kairo.png');
});

Pin_Shanghai.addEventListener('click', () => {
  openPostcard('Shanghai', 'assets/Postkarte_Shanghai.png');
});

Pin_Melbourne.addEventListener('click', () => {
  openPostcard('Melbourne', 'assets/Postkarte_Melbourne.png');
});

btn_close.addEventListener('click', function() {
  dialog.close();
});

document.addEventListener("DOMContentLoaded", () => {
  const pinIds = [
    "Pin_Vancouver",
    "Pin_RiodeJaneiro",
    "Pin_Bern",
    "Pin_Cairo",
    "Pin_Shanghai",
    "Pin_Melbourne"
  ];

  pinIds.forEach(id => {
    const pin = document.getElementById(id);
    if (!pin) return;

    pin.style.transformBox = "fill-box";
    pin.style.transformOrigin = "center";
    pin.style.transition = "transform 0.2s ease";

    pin.addEventListener("mouseenter", () => {
      pin.style.transform = "scale(1.3)";
    });

    pin.addEventListener("mouseleave", () => {
      pin.style.transform = "scale(1)";
    });
  });
});

// i-PopUp //
const btn_info = document.querySelector('#btn-info');
const infoOverlay = document.querySelector('#info-overlay');
const infoClose = document.querySelector('#info-close');

btn_info.addEventListener('click', () => {
  infoOverlay.style.display = 'block';
});

infoClose.addEventListener('click', () => {
  infoOverlay.style.display = 'none';
});