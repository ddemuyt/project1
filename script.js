
var rockKey = "KnvZfZ7vAeA";
var EDMkey = "KnvZfZ7vAvF";
var countryKey = "KnvZfZ7vAv6";
var folkKey = "KnvZfZ7vAva";
var rapKey = "KnvZfZ7vAv1";
var popKey = "KnvZfZ7vAev";
var rnbKeyy = "KnvZfZ7vAee";
var apiCall = "https://api.openweathermap.org/data/2.5/weather?appid=ecf05eb98aee0572391da1c4901b75ec&zip=20001,us";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2AFGOLxDadbErVsemSWtnWf3BL6ENzT1&postalCode=20001&size=5&classificationName=music&genreId="
var fullQueryURL = ""

getWeather();

$("#submit").on("click", function(){


   $("#rockDiv").empty();
   console.log($("#select").attr("id"));

   $('#results').addClass('show');


switch ($("#select").val()){
   case "Rock":
      fullQueryURL = queryURL + rockKey;
      break;
   case "EDM":
      fullQueryURL = queryURL + EDMkey;
      break;
   case "Country":
      fullQueryURL = queryURL + countryKey;
      break;
   case "Folk":
      fullQueryURL = queryURL + folkKey;
      break;
   case "Hip-Hop / Rap":
      fullQueryURL = queryURL + rapKey;
      break;
   case "Pop":
      fullQueryURL = queryURL + popKey;
      break;
   case "R&B":
      fullQueryURL = queryURL + rnbKeyy;
      break;
   default:
      alert("Error");
      break;
}


$.ajax({
   type:"GET",
   url: fullQueryURL,
   async:true,
   dataType: "json",
}).then(function(json) {
               console.log(json);
               console.log(json._embedded.events);
               console.log(json._embedded.events[0]);
               console.log(json._embedded.events[0]._embedded.venues[0].name);
               

            for (var i = 0; i < json._embedded.events.length; i++){
               var eventsloop = json._embedded.events[i];
               var events = $('<div class="is-size-4 has-text-primary">').text(eventsloop.name);
               var date = $('<h3>').text(eventsloop.dates.start.localDate);
               var venue = $("<h3>").text(eventsloop._embedded.venues[0].name);
               var address = $("<h4>").html(eventsloop._embedded.venues[0].address.line1 + "<br>" + eventsloop._embedded.venues[0].city.name + ", " + eventsloop._embedded.venues[0].state.name);
               // var tickets = $("<a>").attr("href", eventsloop.url);
               var d = $("<div>");
               d.append(events);
               d.append(date);
               d.append(venue);
               d.append(address);
               d.append('<br>');
               // d.append(tickets);
               var a = $(".concert-options")
               $("#rockDiv").append(d);
               
   }},
   // error: function(xhr, status, err) {
   //             // This time, we do not end up here!
   //          }
);  
 
 console.log($("#select").attr("id"));
});

function getWeather() {
$.ajax({
   url: apiCall,
   method: "GET",
})

   .then(function (response) {
       
       //Log response object
       console.log(response);

       var tempF = (response.main.temp - 273.15) * 1.80 + 32;
       var feelsliketempF = (response.main.feels_like - 273.15) * 1.80 + 32;

       // add temp content to html
       $("#temp").text("Temperature: " + tempF.toFixed(2) + " F");
       $("#feelsliketemp").text("Feels Like: " + feelsliketempF.toFixed(2) + " F");
       $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
       $("#humidity").text("Humidity: " + response.main.humidity + "%");

function getWeather() {
  $.ajax({
     url: apiCall,
     method: "GET",
  })
  
     .then(function (response) {
         
         //Log response object
         console.log(response);
  
         var tempF = (response.main.temp - 273.15) * 1.80 + 32;
         var feelsliketempF = (response.main.feels_like - 273.15) * 1.80 + 32;
  
         // add temp content to html
         $("#temp").text("Temperature: " + tempF.toFixed(2) + " F");
         $("#feelsliketemp").text("Feels Like: " + feelsliketempF.toFixed(2) + " F");
         $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
         $("#humidity").text("Humidity: " + response.main.humidity + "%");
  
  
  var iconURL = "http://openweathermap.org/img/wn/";
  
  
  var currentWC = response.weather[0].main;
  if (currentWC == "Clear"){
   $("#currentimg").attr("src", iconURL + "01d@2x.png");
  }
  else if (currentWC == "Clouds"){
   $("#currentimg").attr("src", iconURL + "03d@2x.png");
  }
  else if (currentWC == "Thunderstorm"){
   $("#currentimg").attr("src", iconURL + "11d@2x.png");
  }
  else if (currentWC == "Drizzle"){
   $("#currentimg").attr("src", iconURL + "09d@2x.png");
  }
  else if (currentWC == "Rain"){
   $("#currentimg").attr("src", iconURL + "10d@2x.png");
  }
  else if (currentWC == "Snow"){
   $("#currentimg").attr("src", iconURL + "13d@2x.png");
  }
  else {
   $("#currentimg").attr("src", iconURL + "50d@2x.png");
  }
     });
  };

var ltln = {lat: 38.9072, lng: -77.0369};
var zm = 13;

// Functon to create new google map 
function initAutocomplete() {
   var map = new google.maps.Map(document.getElementById('map'), {
     center: ltln,
     zoom: zm,
     mapTypeId: 'roadmap'
   });

   // Creates a searchbar 
   var input = document.getElementById('searchbar-input');
   var searchBox = new google.maps.places.SearchBox(input);
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

   // Focus the maps search results to match the specified area
   map.addListener('bounds_changed', function() {
     searchBox.setBounds(map.getBounds());
   });

   var markers = [];

   //Adds autocomplete to the searchbox based on google results
   searchBox.addListener('places_changed', function() {
     var places = searchBox.getPlaces();
     if (places.length == 0) {
       return;
     }

     markers.forEach(function(marker) {
       marker.setMap(null);
     });
     markers = [];

     var bounds = new google.maps.LatLngBounds();
     places.forEach(function(place) {
       if (!place.geometry) {
         console.log("Returned place contains no geometry");
         return;
       }
       
       var icon = {
         url: place.icon,
         size: new google.maps.Size(71, 71),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(17, 34),
         scaledSize: new google.maps.Size(25, 25)
       };

       markers.push(new google.maps.Marker({
         map: map,
         icon: icon,
         title: place.name,
         position: place.geometry.location
       }));

       if (place.geometry.viewport) {
         bounds.union(place.geometry.viewport);
       } else {
         bounds.extend(place.geometry.location);
       }
     });
     map.fitBounds(bounds);
   });

 var jll = document.querySelector("#jiff");
 var mpp = document.querySelector("#merriweather");
 var anth = document.querySelector("#anthem");
 var coo = document.querySelector("#capitalone");
 var birch = document.querySelector("#birchmere");
 var fil = document.querySelector("#filmore");

 
 jll.addEventListener("click", function() {
   ltln = {lat: 38.7854, lng: -77.5902};
   zm = 17;
   initAutocomplete();
 });

 mpp.addEventListener("click", function() {
   ltln = {lat: 39.2094, lng: -76.8618};
   zm = 17;
   initAutocomplete();
 });

 anth.addEventListener("click", function() {
   ltln = {lat: 38.8801, lng: -77.0261};
   zm = 17;
   initAutocomplete();
 });

 coo.addEventListener("click", function() {
   ltln = {lat: 38.8981, lng: -77.0208};
   zm = 17;
   initAutocomplete();
 });

 birch.addEventListener("click", function() {
   ltln = {lat: 38.8399, lng: -77.0613};
   zm = 17;
   initAutocomplete();
 });

 fil.addEventListener("click", function() {
   ltln = {lat: 38.9974, lng: -77.0276};
   zm = 17;
   initAutocomplete();
 });
}
});
