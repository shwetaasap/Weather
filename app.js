//cursor image moving on webpage
 var x;
 var y;
 function cursor(event){
     x=event.clientX;//these retrieve the cordinates where the mouse is moved
     y=event.clientY;
     document.getElementById('image').style.top=y+'px';
     document.getElementById('image').style.left=x+'px';//this change position of div tag and image
 }

//getting  currentweather information .
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
        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var imgSrc = '<img src = ' + iconurl + '>';
        var output = `<h2><mark> ${cityName + country}<mark></h2>
        <h4><mark>${description+imgSrc}<mark></h4>
        <h4>"Temparature & Humidity in Celsius is <mark> ${temp + "&deg;C" + "&" + humidity + '%'}<mark></h4>`;
        $(".result").append(output);
             //display result   
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
        var appender = `
        <div style="overflow-x:auto;"><table style="width:100%;text-align:left;">
        <tr>
            <th><b>CityName<b></th>
            <th><b>Temperature<b></th> 
            <th><b>Humidity<b></th>
            <th><b>Rain<b></th>
            <th><b>Snow<b></th>
            <th><b>Country<b></th>
            <th><b>Description</th>
        </tr>
        </div>`;
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
  
  

