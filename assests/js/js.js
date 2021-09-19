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

  console.log(userInput);

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
      var test = response;
      console.log(response);
      $('#saved-cities').append(newCity);

      console.log(response.coord.lat);
      
      apiCallOne = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat
       + '&lon=' + response.coord.lon + '&units=imperial' + '&appid=ba69d1ea74461bab7d55a955393c7b3a';

      fetch(apiCallOne)
      .then(function(response){
        return response.json();
      })
      .then(function(response){
        console.log(response);

        displayInfo(response);
      })
      }
  })
})


// Function which will display info 
var displayInfo = function(response) {
  infoEl.innerHTML = '<h2> Information goes here </h2>'

  infoEl.innerHTML += '<p>' + response.current.temp + '</p>';
  infoEl.innerHTML += '<p>' + response.current.humidity + '</p>';
  infoEl.innerHTML += '<p>' + response.current.wind_speed + '</p>';
  infoEl.innerHTML += '<p>' + response.current.uvi + '</p>';

  infoEl.innerHTML += '<img src=http://openweathermap.org/img/wn/10d@2x.png>'

  fiveDayEl.innerHTML = '<h2> 5-Day forecast: </h2>'

  for (var i = 0; i < 5; i++) {
    

    fiveDayEl.innerHTML += '<h4>' + new Date() + '</h4>';
    fiveDayEl.innerHTML += '<img src=http://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png>'
    fiveDayEl.innerHTML += '<p>' + response.daily[i].temp.day + '</p>';
    fiveDayEl.innerHTML += '<p>' + response.daily[i].wind_speed + '</p>';
    fiveDayEl.innerHTML += '<p>' + response.daily[i].humidity + '</p>';

  }
}
