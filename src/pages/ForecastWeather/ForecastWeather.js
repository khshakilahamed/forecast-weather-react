import React from 'react';

const ForecastWeather = ({weather}) => {
    const {Temperature, Day, Night} = weather || {};
    const date = weather.Date;
    const dayPhrase = Day.IconPhrase;
    const nightPhrase = Night.IconPhrase;

    const day = new Date(date).toLocaleDateString();

    // (78°F − 32) × 5/9 = 25.556°C


    return (
        <div className='text-center text-white bg-gray-500 py-5 rounded-xl space-y-4'>
            <p>{day}</p>
            
            <div className='flex justify-between items-center space-x-2 xl:space-y-10'>
                <div className='w-1/2 space-y-3'>
                    <p>Day</p>
                    <div className='flex justify-center'>
                        <img className='w-20 h-20 bg-red-400 rounded-full' src={require(`../../images/icons/${Day.Icon}.svg`)} alt="" />
                    </div>
                    <p>{dayPhrase}</p>
                </div>
                <div className='w-1/2 space-y-3'>
                    <p >Night</p>
                    <div className='flex justify-center'>
                        <img className='w-20 h-20  bg-red-400 rounded-full' src={require(`../../images/icons/${Night.Icon}.svg`)} alt="" />
                    </div>
                    <p >{nightPhrase}</p>
                </div>
            </div>
            <div>
                <p>Min Temperature: {parseInt((Temperature?.Minimum?.Value - 32) * (5/9))} &#176;C</p>
                <p>Max Temperature: {parseInt((Temperature?.Maximum?.Value - 32) * (5/9))} &#176;C</p>
            </div>
        </div>
    );
};

export default ForecastWeather;