var rockKey = "KnvZfZ7vAeA";
var EDMkey = "KnvZfZ7vAvF";
var countryKey = "KnvZfZ7vAv6";
var folkKey = "KnvZfZ7vAva";
var rapKey = "KnvZfZ7vAv1";
var popKey = "KnvZfZ7vAev";
var rnbKeyy = "KnvZfZ7vAee";

var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=2AFGOLxDadbErVsemSWtnWf3BL6ENzT1&marketId=47&classificationName=music&genreId="
var fullQueryURL = ""

$("#submit").on("click", function(){
   $("#rockDiv").empty();
   console.log($("#select").attr("id"));

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
               var events = $('<h2>').text(eventsloop.name);
               var venue = $("<h3>").text(eventsloop._embedded.venues[0].name);
               var address = $("<h4>").html(eventsloop._embedded.venues[0].address.line1 + "<br>" + eventsloop._embedded.venues[0].city.name + ", " + eventsloop._embedded.venues[0].state.name);
               // var tickets = $("<a>").attr("href", eventsloop.url);
               var d = $("<div>");
               d.append(events);
               d.append(venue);
               d.append(address);
               // d.append(tickets);
               var a = $(".concert-options")
               $("#rockDiv").append(d);
               
   }},
   // error: function(xhr, status, err) {
   //             // This time, we do not end up here!
   //          }
);  
 
 console.log(a)
 console.log($("#select").attr("id"));
});

