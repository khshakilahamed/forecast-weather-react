import React from 'react';
import './CurrentWeather.css'

const CurrentWeather = ({currentWeather, cityName}) => {
    const {IsDayTime, Temperature, WeatherText, WeatherIcon, LocalObservationDateTime} = currentWeather || {};
    const {cityLocalizedName, countryLocalizedName} = cityName || {};
    const {Value} = Temperature?.Metric || {};

    
    return (
        <div className='mx-5 sm:mx-10 md:mx-20 lg:mx-80 current-weather-container rounded-xl'>
            <div className='flex justify-center'>
                <div className='py-5 space-y-3'>
                    <p className='text-center font-bold text-4xl text-red-600 capitalize'>{cityLocalizedName}, {countryLocalizedName}</p>
                    <p className='text-center font-bold'>Today</p>
                    <p className='text-2xl font-bold text-center'>{WeatherText}</p>
                    <div className='flex justify-center'>
                        {
                            WeatherIcon && <img className='w-20 h-20 bg-red-400 rounded-full' src={require(`../../images/icons/${WeatherIcon}.svg`)} alt="" />
                        }
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-bold'>{Value} &#176;C</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;