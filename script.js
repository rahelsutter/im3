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

Pin_Bern.addEventListener('click', function() {
    console.log('Pin_Bern');
    showDialogByPlace('Pin_Bern');
})
Pin_Cairo.addEventListener('click', function() {
    console.log('Pin_Cairo');
    showDialogByPlace('Pin_Cairo');
})
Pin_Vancouver.addEventListener('click', function() {
    console.log('Pin_Vancouver');
    showDialogByPlace('Pin_Vancouver');
})
Pin_RiodeJaneiro.addEventListener('click', function() {
    console.log('Pin_RiodeJaneiro');
    showDialogByPlace('Pin_RiodeJaneiro');
})
Pin_Shanghai.addEventListener('click', function() {
    console.log('Pin_Shanghai');
    showDialogByPlace('Pin_Shanghai');
})
Pin_Melbourne.addEventListener('click', function() {
    console.log('Pin_Melbourne');
    showDialogByPlace('Pin_Melbourne');
})


const dialog = document.querySelector('#dialog');
function showDialogByPlace(place) {
    dialog.showModal();
    standort.innerText = place;
}

const btn_close = document.querySelector('#close');
btn_close.addEventListener('click', function() {
    dialog.close();
    standort.innerText = '';
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

    // evtl. Skalierung noch etwas kleiner bzw. schöner machen //

    pin.addEventListener("mouseenter", () => {
      pin.style.transform = "scale(1.3)";
    });

    pin.addEventListener("mouseleave", () => {
      pin.style.transform = "scale(1)";
    });
  });
});
