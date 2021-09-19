// Selceting the info
var infoEl = document.getElementById('info');

var fiveDayEl = document.getElementById('five-day-forecast');

// Adding the a listener to the buttn
$('#search').on("click", "button", function(){
  // seleceting the value inside the text 
  var  userInput = document.querySelector('#city-search').value;

  // Selecting the value inside the text and creating a new element 
  var newCity = $('<button>')
  .attr('type', 'submit')
  .addClass('searched-city')
  .text(userInput)

  addButton(userInput);
  saveCities(userInput);

  // making an apiCall formant with user input
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial' + '&appid=ba69d1ea74461bab7d55a955393c7b3a';

  fetch(apiCall)
.then(function(response){
    return response.json();
})
.then(function(response){
    if (response.cod === '404') {
      window.alert("Please enter a valid city");
      return;

    } else { 

      apiCallOne = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat
       + '&lon=' + response.coord.lon + '&units=imperial' + '&appid=ba69d1ea74461bab7d55a955393c7b3a';

      fetch(apiCallOne)
      .then(function(response){
        return response.json();
      })
      .then(function(response){

        displayInfo(response);
      })
      }
  })
})


// Function which will display info 
var displayInfo = function(response) {
  infoEl.innerHTML = '<h2> Information goes here </h2>'

  infoEl.innerHTML += '<p> Temp: ' + response.current.temp + ' °F</p>';
  infoEl.innerHTML += '<p> Humidity: ' + response.current.humidity + '%</p>';
  infoEl.innerHTML += '<p> Wind: ' + response.current.wind_speed + '</p>';
  
  if (response.current.uvi < 3) {
    infoEl.innerHTML += '<p style="color:green;"> UV Index: ' + response.current.uvi + '</p>';
  } else if (response.current.uvi < 6) {
    infoEl.innerHTML += '<p style="color:yellow;"> UV Index: ' + response.current.uvi + '</p>';
  } else if (response.current.uvi < 8) {
    infoEl.innerHTML += '<p style="color:orange;"> UV Index: ' + response.current.uvi + '</p>';
  } else if (response.current.uvi < 11) {
    infoEl.innerHTML += '<p style="color:red;"> UV Index: ' + response.current.uvi + '</p>';
  } 

  fiveDayEl.innerHTML = '<h2> 5-Day forecast: </h2>'

  for (var i = 0; i < 5; i++) {
    
    fiveDayEl.innerHTML += '<h4>' + new Date() + '</h4>';
    fiveDayEl.innerHTML += '<img src=http://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png>'
    fiveDayEl.innerHTML += '<p> Temp: ' + response.daily[i].temp.day + '°F</p>';
    fiveDayEl.innerHTML += '<p> Wind: ' + response.daily[i].wind_speed + 'MPH</p>';
    fiveDayEl.innerHTML += '<p> Humidity: ' + response.daily[i].humidity + '%</p>';

  }
}

var saveCities = function(userInput) {

  console.log(localStorage.getItem(String(0)));
  console.log(userInput);

  for (var i = 0; i < 100; i++) {
  if (localStorage.getItem(String(i)) === userInput)  {
   console.log('skipped');
   break;
  } else if (!localStorage.getItem(String(i))) {
     localStorage.setItem(String(i), userInput);
    break;
  }

 }
}

var displaySavedCities = function() {

  for (var i = 0; i < 100; i++) {
  
    if (!localStorage.getItem(String(i))) {
      break;
    } else {
    var newCity = $('<button>')
    .attr('type', 'submit')
    .addClass('searched-city')
    .text(localStorage.getItem(String(i)));

    $('#saved-cities').append(newCity);
    }
  }
}

var addButton = function(userInput) {
  for (var i = 0; i < 100; i++) {
    if (userInput === localStorage.getItem(String(i))) {
      break;
    } else {
      var newCity = $('<button>')
      .attr('type', 'submit')
      .addClass('searched-city')
      .text(userInput);
    
      $('#saved-cities').append(newCity);
      break;
    }
  }
}

displaySavedCities();