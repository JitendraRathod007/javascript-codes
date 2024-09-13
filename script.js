const inputBox=document.querySelector('.input-box'); // bcz input box is class name hence select by Query selector
const searchBtn=document.getElementById('searchBtn');//searcBtn id name
const weather_img=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location-not-found');
const weather_body=document.querySelector('.weather-body');


async function checkweather(city){

	const api_keys="42fa45faf49f5eb43f873a38c7fb390c";  // open weather api keys
	const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_keys}`;
	
	const weather_data=await fetch(`${url}`).then(response=>
		response.json());

		if(weather_data.cod===`404`){
			location_not_found.style.display="flex";
			weather_body.style.display="none";
            console.log("error");
			return;
		}

		location_not_found.style.display="none";

		weather_body.style.display="flex";

		temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;

		description.innerHTML=`${weather_data.weather[0].description}`;

		humidity.innerHTML=`${weather_data.main.humidity}%`;

		wind_speed.innerHTML=`${weather_data.wind.speed}Km/H`;

		switch(weather_data.weather[0].main){
			case 'Clouds':
				weather_img.src="/assets/cloud.png";
				break;
			case 'Clear':
				weather_img.src="/assets/clear.png";
				break;
			case 'Rain':
			    weather_img.src="/assets/rain.png";
				break;	
			case 'Mist':
				weather_img.src="/assets/mist.png";
				break;
	    	case 'Snow':
				weather_img.src="/assets/snow.png";
				break;

		}

		console.log(weather_data);
}
// await only use with aysnc function.
// fetch will retrive data from that url.
// response.json used to convert data into string.

 searchBtn.addEventListener('click',()=>{
	checkweather(inputBox.value);
 });