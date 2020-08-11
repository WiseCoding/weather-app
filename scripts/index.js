(async () => {
  //---------//
  // ON LOAD //
  //---------//
  // User can press enter to submit input
  pushEnter();
  // Check previous city, if set, add to input field
  if (localStorage.getItem('Previous City') !== null) {
    getCity();
  }

  //---------//
  // ON TYPE //
  //---------//
  // TODO: Autocomplete.js the city.list.json

  //--------//
  // SUBMIT //
  //--------//
  // Handle submit click button
  document.querySelector('#submit').onclick = () => {
    animInputDiv();
    const city = document.querySelector('input').value;
    setCity(city);
    const weather = getWeather(city).catch(error);
    getWeather(city).catch(error);
    printTemp(1, weather);
  };

  //-----------//
  // FUNCTIONS //
  //-----------//
  // Save/Update submitted city in local storage
  function getCity() {
    if (localStorage.getItem('Previous City') !== null) {
      const city = localStorage.getItem('Previous City').toString();
      document.querySelector('#input').value = city;
    }
  }
  // Get previous city from local storage
  function setCity(city) {
    localStorage.setItem('Previous City', city);
  }
  // Handle enter key push
  function pushEnter() {
    const html = document.querySelector('html');
    html.addEventListener('keyup', function (enter) {
      // Number 13 is the "Enter" key on the keyboard
      if (enter.keyCode === 13) {
        enter.preventDefault();
        document.querySelector('#submit').click();
      }
    });
  }

  // ANIMATION & SOUND
  // Input Div
  function animInputDiv() {
    // Sound
    const audio = new Audio('audio/tick.mp3');
    audio.play();
    // Animate
    document.querySelector('#inputDiv').classList.add('animate-bounce');
    const timeout = setTimeout(() => {
      document.querySelector('#inputDiv').classList.remove('animate-bounce');
      clearTimeout(timeout);
    }, 1520);
  }
  // TODO: Show weather of next 5 days
  // TODO: Display line graph of temp over time chart.js

  // FETCH
  async function getWeather(city) {
    const apiKey = '16b8985dd4d01e5dda0af6d392345499';
    const countryCode = 'BE';
    const weatherCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}`;
    // this gets the data from every 3 hours for the next 5 days, (24/3)*5=40 datapoints
    const response = await fetch(weatherCall);
    return response.json();
  }
  async function error(error) {
    await error;
    console.error(error);
  }

  // PRINT
  async function printTemp(days, weather) {
    const data = await weather;
    console.log('data :>> ', data);
    /* console.log(data.city.name, 'print city name');
    console.log('data.list.dt :>> ', data.list[0].dt);
    console.log('data.list.temp :>> ', data.list[0].main.temp);
    console.log('data.list.main.temp_min :>> ', data.list[0].main.temp_min);
    console.log('data.list.main.temp_max :>> ', data.list[0].main.temp_max); */

    const time = data.list[0].dt_txt;
    const date = new Date(time);
    const day = date.getDate();
    const hour = date.getHours();
    console.log('Day: ', day, 'Hour: ', hour);
  }

  // TODO: Fetch weather of next 5 days

  // PHOTO
  // TODO: use unsplash.com to show photo of requested city

  // COMPARE
  // TODO: Give option to compare 2 cities

  //
})();
