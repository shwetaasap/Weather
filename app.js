


//getting weather information of  single city that is entered
function getWeather() {
    $(".result").html("");
    var cityName = document.getElementById("city").value;
    var apiCall = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=a6c98c5f1512ef700db17185202188c4&units=metric"
    $.getJSON(apiCall, weatherCall);
    function weatherCall(data) {//function to fetch information from json data to display
        var cityName = data.name;
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var country = data.sys.country;
        var description = data.weather[0].description;
        /*var myObj = JSON.parse(cityName,function(){
            cityName.style.color=red;
            console.log(myObj);
        });*/
        $(".result").append("The weather in " + cityName + " " + country + " is " +
            description + " and temparature,humidity in Celsius is " + temp + "&deg;C" + " and " + humidity + '%'); //display result   
    };
};
//getting weather information as per latitude and longitude entries and it gives 10 cities weather information covered in that circle.
function getVariousCities() {
    $(".result2").html("");
    var a = document.getElementById("lat").value;//recieving value of latitude
    var b = document.getElementById("lon").value;//recieving value of longitude
    var apiCall = "http://api.openweathermap.org/data/2.5/find?lat=" + a + "&lon=" + b + "&cnt=15&APPID=a6c98c5f1512ef700db17185202188c4&units=metric"
    $.getJSON(apiCall, weatherCall);
    function weatherCall(data) {
        var counter = data.count;//getting data of number of cities found in given circle..
        //making table for displaying result
        var appender = `<table style="width:100%;text-align:center;">
        <tr>
            <th><b><mark>CityName<mark><b></th>
            <th><b><mark>Temperature<b><mark></th> 
            <th><b><mark>Humidity<b><mark></th>
            <th><b><mark>Rain<b><mark></th>
            <th><b><mark>Snow<b><mark></th>
            <th><b><mark>Country<b><mark></th>
            <th><b><mark>Description</th>
        </tr>`;
//for loop for fetching data as per counter value
        for (i = 0; i < counter; i++ ) {
            var cityName = data.list[i].name;
            var temp = data.list[i].main.temp+ '&deg;C';
            var humidity = data.list[i].main.humidity+'%';
            var rain = data.list[i].rain;
            var snow = data.list[i].snow;
            var country = data.list[i].sys.country;
            var description = data.list[i].weather[0].description;
            var iconcode = data.list[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            var imgSrc = '<img src = ' + iconurl + '>';
            //var iconValue = $.getJSON(iconurl);
            appender += `
                <tr>
                  <td><b>${cityName}</td>
                   <td>${temp}</td>
                   <td>${humidity}</td>
                   <td>${rain}</td>
                   <td>${snow}</td>
                   <td>${country}</td>
                   <td>${description+imgSrc}</td>
                </tr>
            `;
        }
        appender += `</table>`;//closing table   
        $(".result2").append(appender);//displaying result
    };
};


/*function getWord(){
  var word_id=document.getElementById("word").value;
  var word_id= word_id.toLowerCase();
var url="https://od-api.oxforddictionaries.com:443/api/v1/entries/en?"+word_id+"";
    const header = {
        "Accept": "application/json",
        "app_id": "0bd7c42e",
        "app_key": "4272f7b4c0e703965121c6a30733d899"
      }
      $.getJSON(url+header,function(meaning){
       var defination=meaning.defination;
       console.log("The word means "+ defination)});
   };*/
