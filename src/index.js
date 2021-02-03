import'./reset.css';
import './style.css';


async function getLocation(loc){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc.replace(' ', '+')}&appid=6aade3113afb82f8bae1aa3eb279a63e`;
  console.log(url);
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
    updateDisplay(data);
  } catch {
    console.log('no such city ya tit')
  }
}

function updateDisplay(data) {
  const location = document.querySelector('.location');
  location.textContent = data.name;

  const description = document.querySelector('.description');
  description.textContent = data.weather[0].description;

  const temp = document.querySelector('.temp');
  temp.textContent = convertTemp(data.main.temp);

  const feelsLike = document.querySelector('.feels-like');
  feelsLike.textContent = `${convertTemp(data.main.feels_like)}°`;

  const wind = document.querySelector('.wind');
  wind.textContent = `${data.wind.speed} mph`;

  const humidity = document.querySelector('.humidity');
  humidity.textContent = `${data.main.humidity}%`;
}

function convertTemp(kel) {
  return Math.round((kel * (9/5)) - 459.67);
}


(() => {
  getLocation('san francisco');
})()