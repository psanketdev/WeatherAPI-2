/*Authohr: Sanket Patil*/

let display = document.getElementById('display');
let searchBtn = document.getElementById('searchBtn');
let mainResult = document.getElementById('mainResult');
let weatherData;

searchBtn.addEventListener('click', getData);

function getData(e) {
  e.preventDefault();
  featchApi();
}

function featchApi(e) {
  let key = "4d040515e8e63a0237847258dee4247b";
  let searchCityName = document.getElementById('display').value;
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" + searchCityName + "&APPID=" + key + "&units=metric";

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    weatherData = data;
    console.log(weatherData);

    if (weatherData.cod == '404' || weatherData.cod == '400') {
      alert('Please Enter a Correct Country/City Name');
    } else if (display.value === "") {
      alert('Please Enter a Correct Country/City Name');
      mainResult.style.visibility = 'hidden'
    } else {
      mainResult.style.visibility = 'visible'
      mainResult.classList.add('activeDisplay');
    }
    showData();
    backgroundChange();
  });
}

// function forIndia() {
//   // debugger;
//   let country = weatherData.sys.country;
//   if (country == "IN") {
//     country = 'INDIA';
//   } else {
//     country = 'DEFAULT';
//   }
// }

function showData() {
  mainResult.innerHTML = "";
  document.querySelector('form').reset();

  // function createNode(value, place, result) {
  //   let elementNode = document.createElement(value);
  //   elementNode.innerHTML = result;
  //   place.appendChild(elementNode);
  //   return elementNode;
  // }

  let countryName = weatherData.name + ",&nbsp" + weatherData.sys.country;
  let weatherMain = weatherData.weather[0].main + ",  ";
  let weatherDescription = weatherData.weather[0].description;
  let temperature = weatherData.main.temp + '&degC';
  let humidity = 'Humidity: ' + weatherData.main.humidity + '%';
  let windSpeed = 'WindSpeed: ' + weatherData.wind.speed + 'Km/h';
  let img_url = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '.png';

  /*--------------------------- By using ES6 ---------------------------*/

  string = `<article>
                <h3> ${countryName}</h3>
                  <span>${weatherMain}</span>
                  <span>${weatherDescription}</span>
                  <ul>
                    <li> 
                      <figure>
                       <img src=${img_url} alt=${weatherDescription}>
                      </figure>
                    </li>
                    <li>${temperature}</li>
                  </ul>
                  <span>${humidity}</span>
                  <span>${windSpeed}</span>
              </article>`;

  mainResult.innerHTML = string;

  /*--------------------------- By using ES5 ---------------------------*/ 

  // let articleNode = createNode('article', mainResult, '');
  // createNode('h3', articleNode, countryName);

  // let country = createNode('span', articleNode, weatherMain);
  // country.setAttribute('class', 'countryname');

  // createNode('span', articleNode, weatherDescription);

  // let ulNode = createNode('ul', articleNode, '');
  // let figureLiNode = createNode('li', ulNode, '');
  // let figure = createNode('figure', figureLiNode, '');
  // let img = createNode('img', figure, '');
  // img.setAttribute('src', img_url);
  // img.setAttribute('alt', weatherDescription);

  // let tempLiNode = createNode('li', ulNode, temperature);
  // tempLiNode.setAttribute('class', 'weatherTemp');

  // createNode('span', articleNode, humidity);
  // createNode('span', articleNode, windSpeed);
}

function backgroundChange() {
  let body = document.querySelector('body');
  let weatherMain = weatherData.weather[0].main;
  if (weatherMain === 'Clear') {
    body.style.backgroundImage = `url('assets/images/clear.jpg')`;
  } else if (weatherMain === 'Clouds') {
    body.style.backgroundImage = `url('assets/images/cloudy.jpg')`;
  } else if (weatherMain === 'Rain') {
    body.style.backgroundImage = `url('assets/images/rain.jpg')`;
  } else if (weatherMain === 'Smoke') {
    body.style.backgroundImage = `url('assets/images/smoke.jpg')`;
  } else if (weatherMain === 'Snow') {
    body.style.backgroundImage = `url('assets/images/snow.jpg')`;
  } else if (weatherMain === 'Thunderstorm') {
    body.style.backgroundImage = `url('assets/images/strome.jpg')`;
  } else {
    body.style.backgroundImage = `url('assets/images/def.jpg')`;
  }
}

