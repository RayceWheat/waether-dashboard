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
  var apiCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=ba69d1ea74461bab7d55a955393c7b3a';

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

    }
        
})

})

var displayInfo = function(response) {
  var newInfo = (<)
  
  response.main.humidity
  response.main.temp

  $('#info')
}
