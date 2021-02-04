import'./reset.css';
import './style.css';


async function getLocation(loc){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc.replace(' ', '+')}&appid=6aade3113afb82f8bae1aa3eb279a63e`;
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
  console.log(data)
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
  const searchBtn = document.querySelector('button');
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

  getLocation('san francisco');

})()
