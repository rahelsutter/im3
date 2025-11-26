let currentCity = '';

const stampMapping = {
    'pm2_5': { name: 'Particulate Matter', unit: 'µg/m³', description: 'sind winzige Feinstaubpartikel in der Luft, die tief in die Lunge gelangen können.' },
    'dust': { name: 'Dust', unit: 'µg/m³', description: 'sind größere Partikel in der Luft, die Nase, Hals und Lunge reizen können.' },
    'uv_index': { name: 'UV Index', unit: '', description: 'zeigt die Stärke der Sonnenstrahlung an und sagt, wie schnell man einen Sonnenbrand bekommen kann.' },
    'nitrogen_dioxide': { name: 'Nitrogen Dioxide', unit: 'µg/m³', description: 'ist ein Gas aus Autoabgasen und Industrie, das Atemwege reizen kann.' },
    'carbon_monoxide': { name: 'Carbon Monoxide', unit: 'µg/m³', description: 'ist ein geruchloses Gas, das durch Verkehr und Verbrennung entsteht und die Sauerstoffaufnahme im Körper stören kann.' },
    'alder_pollen': { name: 'Alder Pollen', unit: 'Pollen', description: 'sind Blütenstaub der Erle, der bei Allergikern Niesen, juckende Augen oder Schnupfen auslösen kann.' },
    'birch_pollen': { name: 'Birch Pollen', unit: 'Pollen', description: 'sind Blütenstaub von Birken und gehören zu den stärksten Pollenallergenen im Frühling.' },
    'grass_pollen': { name: 'Grass Pollen', unit: 'Pollen', description: 'sind Blütenstaub von Gräsern und können bei Allergikern Heuschnupfen auslösen.' },
    'mugwort_pollen': { name: 'Mugwort Pollen', unit: 'Pollen', description: 'sind der Blütenstaub des Beifußes und können bei Allergikern Niesen, juckende Augen, Schnupfen, Husten oder Atembeschwerden verursachen.' },
    'olive_pollen': { name: 'Olive Pollen', unit: 'Pollen', description: 'sind der Blütenstaub von Olivenbäumen und können bei Allergikern allergische Reaktionen auslösen.' },
    'ragweed_pollen': { name: 'Ragweed Pollen', unit: 'Pollen', description: 'sind der Blütenstaub der Ambrosia-Pflanze und gehören zu den stärksten Allergieauslösern im Spätsommer.' }
};

const stampOrder = ['pm2_5', 'dust', 'uv_index', 'nitrogen_dioxide', 'carbon_monoxide', 'alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];

const cityMapping = {
    'Bern': 'Bern',
    'Vancouver': 'Vancouver',
    'Rio de Janeiro': 'Rio_de_Janeiro',
    'Kairo': 'Kairo',
    'Shanghai': 'Shanghai',
    'Melbourne': 'Melbourne'
};

const stampsGrid = document.getElementById('stampsGrid');
const datePicker = document.getElementById('datePicker');
const timePicker = document.getElementById('timePicker');

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

async function openPostcard(city, imagePath) {
    currentCity = city; // Stadt speichern
    postcardImg.alt = `Postkarte ${city}`;
    const preloadImg = new Image();
    preloadImg.src = imagePath;
    preloadImg.onload = () => {
        postcardImg.src = imagePath;
        dialog.showModal();
    };
    
    // Datepicker zurücksetzen
    datePicker.value = '';
    timePicker.value = '';
    
    // Neueste Daten laden
    await loadLatestData(city);
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

// Generiere Uhrzeiten von 00:00 bis 23:00
function populateTimePicker() {
    const timePicker = document.getElementById('timePicker');
    for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        const option = document.createElement('option');
        option.value = `${hour}:00:00`;
        option.textContent = `${hour}:00`;
        timePicker.appendChild(option);
    }
}

// Beim Laden der Seite ausführen
document.addEventListener('DOMContentLoaded', populateTimePicker);

// Neueste Daten laden
async function loadLatestData(city) {
    showLoading();
    const dbCity = cityMapping[city];
    
    try {
        const response = await fetch(`https://im3.uv-index-usa.com/backend/api/getLatestByCity.php?city=${encodeURIComponent(dbCity)}`);
        const data = await response.json();
        
        if (data && !data.error) {
            displayStamps(data);
        } else {
            showError('Keine Daten für diese Stadt verfügbar.');
        }
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
        showError('Fehler beim Laden der Daten.');
    }
}

// Briefmarken anzeigen
function displayStamps(data) {
    stampsGrid.innerHTML = '';
    stampsGrid.classList.remove('loading');
    
    stampOrder.forEach(key => {
        if (stampMapping[key]) {
            const stamp = document.createElement('div');
            stamp.className = 'stamp';
            
            const value = data[key] !== null && data[key] !== undefined 
                ? parseFloat(data[key]).toFixed(2) 
                : 'N/A';
            
            stamp.innerHTML = `
                <div class="stamp-name">${stampMapping[key].name}</div>
                <div class="stamp-value">${value}</div>
                <div class="stamp-unit">${stampMapping[key].unit}</div>
                <div class="stamp-tooltip">
                    <p><strong>${stampMapping[key].name}</strong></p>
                    <p>${stampMapping[key].description}</p>
                </div>
            `;
            
            stampsGrid.appendChild(stamp);
        }
    });
}

// Loading State
function showLoading() {
    stampsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Lade Daten...</p>';
}

// Error State
function showError(message) {
    stampsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #C26E4B;">${message}</p>`;
}

// Datepicker Event Listeners
datePicker.addEventListener('change', checkAndLoadData);
timePicker.addEventListener('change', checkAndLoadData);

async function checkAndLoadData() {
    const date = datePicker.value;
    const time = timePicker.value;
    
    if (date && !time) {
        alert('Bitte wähle auch eine Uhrzeit aus!');
        return;
    }
    
    if (!date && time) {
        alert('Bitte wähle auch ein Datum aus!');
        return;
    }
    
    if (date && time) {
        await loadDataByDateTime(date, time);
    }
}

async function loadDataByDateTime(date, time) {
    showLoading();
    const dbCity = cityMapping[currentCity];
    
    try {
        const response = await fetch(
            `https://im3.uv-index-usa.com/backend/api/getByDate.php?date=${date}&time=${time}&city=${encodeURIComponent(dbCity)}`
        );
        const data = await response.json();
        
        if (data && data.length > 0) {
            displayStamps(data[0]);
        } else {
            showError('Keine Daten für diesen Zeitpunkt verfügbar.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        showError('Fehler beim Laden der Daten.');
    }
}

