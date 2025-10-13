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


const datepicker = document.querySelector('#datepicker');
datepicker.addEventListener('change', function() {
    const date = datepicker.value;
    console.log(date);
})
