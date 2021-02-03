import'./reset.css';
import './style.css';


async function getLocation(loc){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc.replace(' ', '+')}&appid=6aade3113afb82f8bae1aa3eb279a63e`;
  console.log(url);
  try {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    console.log(data.name)
  } catch {
    console.log('no such city ya tit')
  }
}


(() => {
  getLocation('san francisco');
})()