import'./reset.css';
import './style.css';


async function getLocation(zip){
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=861858f00d605ef9644e285c1e18726e`
  console.log(url);
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    updateDisplay(data);
  } catch {
    console.log('no such city ya tit')
  }
}

function updateDisplay(data) {
  const info = [{ class: '.location', data: data.name}, 
                { class: '.description', data: data.weather[0].description} ,
                { class: '.temp', data: convertTemp(data.main.temp) }, 
                { class: '.feels', data: `${convertTemp(data.main.feels_like)}°F` },
                { class: '.wind', data: `${data.wind.speed} mph` }, 
                { class: '.humidity', data: `${data.main.humidity}%` },];

  info.forEach(item => {
    const el = document.querySelector(item.class);
    el.textContent = item.data;
  });
}

function convertTemp(kel) {
  return Math.round(kel * (9/5) - 459.67);
}

(() => {
  const searchBtn = document.querySelector('.search-btn');
  const input = document.getElementById('location-input');

  searchBtn.addEventListener('click', () => {
    getLocation(input.value);
    input.value = '';
  });

  input.addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      searchBtn.click();
    }
  });

  getLocation(94805);

})()
