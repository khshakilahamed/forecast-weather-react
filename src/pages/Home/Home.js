import React, { useState } from 'react';
import ForecastWeather from '../ForecastWeather/ForecastWeather';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import './Home.css'

const Home = () => {
    const [cityName, setCityName] = useState('');
    const [passCityName, setPassCityName] = useState('');
    const [cityCurrentWeather, setCityCurrentWeather] = useState({});
    const [fiveDaysWeather, setFiveDaysWeather] = useState([]);

    // const key = process.env.REACT_APP_MY_API_KEY;
    const key = process.env.REACT_APP_MY_API_KEY;

    const currentWeather = (cityKey) =>{
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${key}`)
        .then(res => res.json())
        .then(data => setCityCurrentWeather(data[0]))
    };

    const handleFiveDaysWeather = (cityKey) =>{
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${key}`)
        .then(res => res.json())
        .then(data => setFiveDaysWeather(data.DailyForecasts));
    }


    const handleCityName = (e) =>{
        setCityName(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${cityName}`)
        .then(res=>res.json())
        .then(data =>{
            const cityKey = data[0].Key;
            setPassCityName(cityName)
            currentWeather(cityKey);
            handleFiveDaysWeather(cityKey);
            e.target.reset();
        })
        .catch(error => {
            alert('Nothing found. Please with the different name.');
        })
        ;
    };


    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            setCityName(e.target.value);
        }
    }

    return (
        <div className={`main-container h-auto  xl:py-16`} >
            <div className='mx-5 md:mx-32'>
                <h2 className='text-center pt-10 text-3xl lg:text-5xl text-white font-bold'>Forecast the Weather in your City</h2>
                <form onSubmit={handleSubmit} className='py-8 flex  justify-center '>
                   <div className='flex flex-col sm:flex-row justify-center w-4/5 sm:w-3/4 lg:w-3/5 '>
                        <input onChange={handleCityName} onKeyPress={handleKeyPress} className='bg-transparent border-2 text-white px-2 py-1 rounded w-full' type="text" placeholder='Search Weather by City Name'/>
                        <input className='text-white text-center bg-green-600 text-xl px-3 py-1 font-bold rounded w-24 cursor-pointer' type="submit" value="Search" />
                   </div>
                </form>
            </div>
            {
                // cityCurrentWeather.EpochTime && 
                cityCurrentWeather.EpochTime &&  <CurrentWeather currentWeather={cityCurrentWeather} cityName={passCityName}></CurrentWeather>
            }
            <div className='mx-20 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-3 gap-4 xl:my-10'>
                {
                    fiveDaysWeather.slice(1, fiveDaysWeather.length).map(weather => <ForecastWeather weather={weather} key={Math.random()}></ForecastWeather>)
                }
            </div>
        </div>
    );
};

export default Home;