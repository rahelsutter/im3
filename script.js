let currentCity = '';
let hasErrorState = false;
let currentView = 'back';       
let lastNonInfoView = 'back';   

const stampMapping = {
   'pm2_5': { image: 'assets/Stamps/ParticulateMatterStamp.svg', alt: 'Particulate Matter in grams per cubic meter', thresholds: { good: 15, medium: 25 }},
    'dust': { image: 'assets/Stamps/DustStamp.svg', alt: 'Dust in grams per cubic meter', thresholds: { good: 15, medium: 75}},
    'uv_index': { image: 'assets/Stamps/UVIndexStamp.svg', alt: 'UV Index', thresholds: { good: 2, medium: 7}},
    'nitrogen_dioxide': { image: 'assets/Stamps/NitrogenDioxideStamp.svg', alt: 'Nitrogen Dioxide in grams per cubic meter', thresholds: { good: 25, medium: 50}},
    'carbon_monoxide': { image: 'assets/Stamps/CarbonMonoxideStamp.svg', alt: 'Carbon Monoxide in grams per cubic meter', thresholds: { good: 1000, medium: 4000}},
    'alder_pollen': { image: 'assets/Stamps/AlderPollenStamp.svg', alt: 'State of Alder Pollen in the air', thresholds: { good: 10, medium: 50}},
    'birch_pollen': { image: 'assets/Stamps/BirchPollenStamp.svg', alt: 'State of Birch Pollen in the air', thresholds: { good: 10, medium: 50}},
    'grass_pollen': { image: 'assets/Stamps/GrassPollenStamp.svg', alt: 'State of Grass Pollen in the air', thresholds: { good: 10, medium: 50}},
    'mugwort_pollen': { image: 'assets/Stamps/MugwortPollenStamp.svg', alt: 'State of Mugwort Pollen in the air', thresholds: { good: 10, medium: 50}},
    'olive_pollen': { image: 'assets/Stamps/OlivePollenStamp.svg', alt: 'State of Olive Pollen in the air', thresholds: { good: 10, medium: 50}},
    'ragweed_pollen': { image: 'assets/Stamps/RagweedPollenStamp.svg', alt: 'State of Ragweed Pollen in the air', thresholds: { good: 10, medium: 50}},
}


const stampOrder = ['pm2_5', 'dust', 'uv_index', 'nitrogen_dioxide', 'carbon_monoxide', 'alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];

const cityMapping = {
    'Bern': 'Bern',
    'Vancouver': 'Vancouver',
    'Rio de Janeiro': 'Rio_de_Janeiro',
    'Kairo': 'Kairo',
    'Shanghai': 'Shanghai',
    'Melbourne': 'Melbourne'
};


const stampsGrid = document.querySelector('.postcard-back');
const datePicker = document.getElementById('datePicker');
const timePicker = document.getElementById('timePicker');
const stampInfoBox = document.getElementById('stamp-info-box');

const Pin_Bern = document.querySelector('#Pin_Bern');
const Pin_Cairo = document.querySelector('#Pin_Cairo');
const Pin_Vancouver = document.querySelector('#Pin_Vancouver');
const Pin_RiodeJaneiro = document.querySelector('#Pin_RiodeJaneiro');
const Pin_Shanghai = document.querySelector('#Pin_Shanghai');
const Pin_Melbourne = document.querySelector('#Pin_Melbourne');

const dialog = document.querySelector('#dialog');
const postcardImg = document.querySelector('#postcard-image');
const btn_close = document.querySelector('#btn-close');
const btn_info = document.querySelector('#btn-info');
const infoClose = document.querySelector('#info-close');
const tabs = document.querySelectorAll('.popup-tab');



function setDefaultInfoBox() {
  if (!stampInfoBox) return;
  stampInfoBox.className = 'stamp-info-box';
  stampInfoBox.innerHTML = `
    <strong>Fahre mit der Maus über eine Briefmarke.</strong>
    <p>Hier erscheint dann die Einschätzung zum Wert.</p>
  `;
}

function resetPickersUI() {
  datePicker.value = '';
  timePicker.value = '';

  datePicker.classList.add('placeholder');
  timePicker.classList.add('placeholder');
}


// === Mobile View-Logik (Front / Back / Info) ===
function setActiveTab(view) {
  tabs.forEach((tab) => {
    if (tab.dataset.view === view) {
      tab.classList.add('popup-tab--active');
    } else {
      tab.classList.remove('popup-tab--active');
    }
  });
}

function showFrontView() {
  currentView = 'front';
  dialog.classList.remove('view-back', 'view-info');
  dialog.classList.add('view-front');
  setActiveTab('front');
}

function showBackView() {
  currentView = 'back';
  dialog.classList.remove('view-front', 'view-info');
  dialog.classList.add('view-back');
  setActiveTab('back');
}

function showInfoView() {
  currentView = 'info';
  dialog.classList.remove('view-front', 'view-back');
  dialog.classList.add('view-info');
  // Tabs bleiben so, wie sie vorher waren (Front/Back)
}


// Loading State
function showLoading() {
  if (!stampInfoBox) return;

  hasErrorState = false;
  datePicker.classList.remove('error');
  timePicker.classList.remove('error');

  stampInfoBox.className = 'stamp-info-box';
  stampInfoBox.innerHTML = `
    <strong>Lade Daten...</strong>
    <p>Bitte einen Moment warten.</p>
  `;
}


// Error State
function showError(message) {
  if (!stampInfoBox) return;

  hasErrorState = true;

  // Date/Time-Felder optisch markieren
  datePicker.classList.add('error');
  timePicker.classList.add('error');

  stampInfoBox.className = 'stamp-info-box level-schwer';
  stampInfoBox.innerHTML = `
    <strong>Keine Messwerte verfügbar</strong>
    <p>${message}</p>
  `;
}


// Daten-Funktionen (API & Datenverarbeitung)-------------------------------------------------------------------------------------------------------------------

function getLevelText(key, value) {
  const v = parseFloat(value);

  if (key === 'pm2_5') {
    if (v <= 15) return ['unbedenklich','Unbedenklich 0–15 μg/m³','Die Luft ist sauber. Es hat kaum Feinstaubpartikel. Atmen ist unproblematisch für alle.'];
    if (v <= 25) return ['maessig','Mässig 16–25 μg/m³','Es gibt etwas Feinstaub in der Luft. Empfindliche Personen sollten vorsichtiger sein.'];
    return ['schwer','Schwer >25 μg/m³','Hohe Feinstaubbelastung! Aufenthalte im Freien möglichst vermeiden.'];
  }

  if (key === 'dust') {
    if (v <= 15) return ['unbedenklich','Unbedenklich 0–15 μg/m³','Es ist kaum Staub in der Luft. Die Verschmutzung ist unbedenklich.'];
    if (v <= 75) return ['maessig','Mässig 16–75 μg/m³','Die Staubelastung ist im mittleren Bereich. Empfindliche Personen können reagieren.'];
    return ['schwer','Schwer >75 μg/m³','Hohe Staubbelastung! Atemwege können gereizt werden, draussen vorsichtig sein.'];
  }

  if (key === 'carbon_monoxide') {
    if (v <= 1000) return ['unbedenklich','Unbedenklich 0–1000 μg/m³','Die Luft ist sicher. Kohlenmonoxid liegt weit unter gesundheitsschädlichen Werten.'];
    if (v <= 4000) return ['maessig','Mässig 1001–4000 μg/m³','Kohlenmonoxid ist erhöht. Empfindliche Personen sollten Belastungen reduzieren.'];
    return ['schwer','Schwer >4000 μg/m³','Achtung! Hoher CO‑Gehalt. Längere Einwirkung kann gefährlich sein.'];
  }

  if (key === 'nitrogen_dioxide') {
    if (v <= 25) return ['unbedenklich','Unbedenklich 0–25 μg/m³','Die Luft ist sehr sauber. Kaum Verkehrsschadstoffe, Atmen ohne Sorgen.'];
    if (v <= 50) return ['maessig','Mässig 26–50 μg/m³','Leichte Belastung, z. B. nahe an Strassen. Empfindliche Personen sollten aufpassen.'];
    return ['schwer','Schwer >50 μg/m³','Hohe Konzentration! Belastend für die Atemwege, Aufenthalt draussen möglichst vermeiden.'];
  }

  if (key === 'uv_index') {
    if (v <= 2) return ['unbedenklich','Unbedenklich 0–2','Sonnenstrahlung ist gering. Kaum Sonnenbrandgefahr.'];
    if (v <= 7) return ['maessig','Mässig 3–7','Mittlere Strahlung. Schatten und Sonnenschutz werden empfohlen.'];
    return ['schwer','Schwer >8','Sehr starke Strahlung! Hohe Sonnenbrandgefahr, Schutz dringend nötig.'];
  }

  const pollenKeys = ['alder_pollen','birch_pollen','grass_pollen','mugwort_pollen','olive_pollen','ragweed_pollen'];
  if (pollenKeys.includes(key)) {
    if (v <= 10) return ['unbedenklich','Unbedenklich 0–10 grains/m³','Die Pollenbelastung ist niedrig. Allergiker haben meist kaum Symptome.'];
    if (v <= 50) return ['maessig','Mässig 11–50 grains/m³','Leichte Pollenbelastung. Empfindliche Personen können Niesen oder juckende Augen bemerken.'];
    return ['schwer','Schwer >50 grains/m³','Hohe Pollenbelastung! Starke Symptome möglich, Schutzmassnahmen empfohlen.'];
  }

  return ['unbedenklich','Keine Einstufung','Für diesen Wert ist noch kein Text definiert.'];
}



// Briefmarken anzeigen
function displayStamps(data) {
  const oldStamps = stampsGrid.querySelectorAll('.stamp');
  oldStamps.forEach(s => s.remove());
  stampsGrid.classList.remove('loading');

  hasErrorState = false;
  datePicker.classList.remove('error');
  timePicker.classList.remove('error');

  setDefaultInfoBox();  // Standardtext setzen

  stampOrder.forEach(key => {
    const config = stampMapping[key];
    if (!config) return;

    const stamp = document.createElement('div');
    stamp.className = `stamp stamp-${key}`;

    const rawValue = data[key];
    const value = rawValue !== null && rawValue !== undefined ? parseFloat(rawValue).toFixed(2) : '0';
    const [levelId, levelTitle, levelText] = getLevelText(key, value);

    stamp.innerHTML = `
      <div class="stamp-image-wrapper ${key}">
        <img src="${config.image}" alt="${config.alt}" class="stamp-image" />
        <div class="stamp-value-overlay">${value}</div>
      </div>
    `;

    stamp.addEventListener('mouseenter', () => {
      if (!stampInfoBox || hasErrorState) return;
      stampInfoBox.classList.remove('level-unbedenklich','level-maessig','level-schwer');

      if (levelId === 'unbedenklich') stampInfoBox.classList.add('level-unbedenklich');
      if (levelId === 'maessig')      stampInfoBox.classList.add('level-maessig');
      if (levelId === 'schwer')       stampInfoBox.classList.add('level-schwer');

      stampInfoBox.innerHTML = `
        <strong>${levelTitle}</strong>
        <p>${levelText}</p>
      `;
    });

    stamp.addEventListener('mouseleave', () => {
      if (!stampInfoBox || hasErrorState) return;
      setDefaultInfoBox();
    });

    // CLICK-EVENT (Tablet/Mobile/auch Desktop)
    stamp.addEventListener('click', (event) => {
        event.stopPropagation(); 

      if (!stampInfoBox || hasErrorState) return;

      stampInfoBox.classList.remove('level-unbedenklich', 'level-maessig', 'level-schwer');

      if (levelId === 'unbedenklich') stampInfoBox.classList.add('level-unbedenklich');
      if (levelId === 'maessig')      stampInfoBox.classList.add('level-maessig');
      if (levelId === 'schwer')       stampInfoBox.classList.add('level-schwer');

      stampInfoBox.innerHTML = `
        <strong>${levelTitle}</strong>
        <p>${levelText}</p>
      `;

      stampInfoBox.classList.add('is-open');
    });


    stampsGrid.appendChild(stamp);
  });
}


// Neueste Daten laden
async function loadLatestData(city) {
  showLoading();
  const dbCity = cityMapping[city];

  try {
    const response = await fetch(
      `https://im3.uv-index-usa.com/backend/api/getLatestByCity.php?city=${encodeURIComponent(dbCity)}`
    );
    const data = await response.json();

    console.log('LATEST DATA:', data);          // zur Kontrolle
    const timestamp = data.timestamp;           // z.B. "2025-12-28 15:00:00"
    console.log('LATEST TIMESTAMP:', timestamp);

    if (data && !data.error) {
      // 1. Briefmarken anzeigen
      displayStamps(data);

      // 2. Datum & Zeit aus timestamp holen
      if (timestamp) {
        const [dateStr, rawTimeStr] = timestamp.split(' '); // ["2025-12-28", "15:00:00"]

        // --- Datum setzen ---
        datePicker.value = dateStr;                 // muss im Format YYYY-MM-DD sein
        datePicker.classList.remove('placeholder');

        // --- Uhrzeit normalisieren ---
        // rawTimeStr kann z.B. "15:00:00" oder "15:00" oder "15" sein
        let hourPart = rawTimeStr.split(':')[0];    // nimmt nur die Stunde
        if (hourPart.length === 1) {
          hourPart = '0' + hourPart;               // aus "5" wird "05"
        }
        const normalizedTime = `${hourPart}:00:00`; // wir bauen "HH:00:00"

        // Prüfen, ob es diese Option im Timepicker wirklich gibt
        const optionExists = Array.from(timePicker.options).some(
          (opt) => opt.value === normalizedTime
        );

        if (optionExists) {
          timePicker.value = normalizedTime;
          timePicker.classList.remove('placeholder');
        } else {
          console.warn('Keine passende Timepicker-Option für', normalizedTime);
        }
      }
    } else {
      showError('Keine Daten für diese Stadt verfügbar.');
    }
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
    showError('Fehler beim Laden der Daten.');
  }
}


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
            showError('Es sind leider keine Daten für diesen Zeitpunkt verfügbar. Die Briefmarken zeigen weiterhin die zuletzt geladenen Werte.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        showError('Fehler beim Laden der Daten.');
    }
}


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


//UI Steuerung----------------------------------------------------------------------------


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
    resetPickersUI();       
    
    // Neueste Daten laden
    await loadLatestData(city);

    showBackView();
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

btn_info.addEventListener('click', () => {
  if (currentView === 'info') {
    // Info ist offen -> zurück zu letzter Front/Back-Ansicht
    if (lastNonInfoView === 'front') {
      showFrontView();
    } else {
      showBackView();
    }
  } else {
    // Info ist geschlossen -> merken, welche Ansicht aktiv war, dann Info öffnen
    lastNonInfoView = currentView;
    showInfoView();
  }
});


infoClose.addEventListener('click', () => {
  // X im Overlay -> zurück zur zuletzt aktiven Front/Back
  if (lastNonInfoView === 'front') {
    showFrontView();
  } else {
    showBackView();
  }
});

// Datepicker Event Listeners
datePicker.addEventListener('change', () => {
  datePicker.classList.remove('placeholder');
  checkAndLoadData();
});

timePicker.addEventListener('change', () => {
  timePicker.classList.remove('placeholder');
  checkAndLoadData();
});


//Klick ausserhalb Info-Box
document.addEventListener('click', (event) => {
  if (!stampInfoBox || !stampInfoBox.classList.contains('is-open')) return;

  const clickedInsideInfoBox = stampInfoBox.contains(event.target);
  const clickedStamp = event.target.closest('.stamp');

  // Klick war weder auf Infobox noch auf Briefmarke
  if (!clickedInsideInfoBox && !clickedStamp) {
    stampInfoBox.classList.remove('is-open');
    setDefaultInfoBox();
  }
});


//Inititalisierung------------------------------------------------------------------------------------

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


  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view; // 'front' oder 'back'

      if (view === 'front') {
        showFrontView();
        lastNonInfoView = 'front';
      } else if (view === 'back') {
        showBackView();
        lastNonInfoView = 'back';
      }
    });
  });


 populateTimePicker();


});















