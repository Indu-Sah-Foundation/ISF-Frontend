import React from 'react'
import { FaFacebookSquare, FaTwitter, FaPinterest } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ISFCovid = () => {
    return (
        <div id="card1" className="flex flex-col md:flex-row md:max-w-7xl mx-auto my-8 shadow-lg rounded-lg">
        <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv5YgDrpmUTixEY5Zlb9fBTeJYleIi-ULWerDDeT4mEta7UJAsVZ_rKPezGg1o_vA6PJkNM1EKfNDvRZTyZdIpYpg5BoM6LnGpiU1uLoj1c8W7HGz9NbmbNcXN-rWZ0pavPJNm0dCAdFk/s640/20190605_105231.jpg"
            className="mt-4 md:ml-6 w-full h-64 md:h-80 object-cover rounded-lg"
            alt="logo"
        />
        <div className="bg-light-grayish-blue px-12 py-8 h-auto rounded-b-lg md:rounded-b-none md:rounded-r-lg flex flex-col justify-center">
            <h3 className='text-xl font-bold mb-6 text-dark-grayish-blue text-center'>
            ISF COVID-19 Help 2021

            </h3>
            <p className="text-grayish-blue font-medium text-base text-center mb-6">
            The pandemic has yet not let people breathe normally in Nepal. The double mutant Covid-19 forced the Nepal government to lock the nation for the second time from  April 29, 2021 . The lockdown has helped prevent the spread of the disease...
            </p>
            <div id="share-container" className="flex flex-col items-center">
                <div className='flex flex-row items-center mb-6'>
                    <img className="w-12 h-12 rounded-full mr-6" src="ISF.png" alt="author" />
                    <div className="flex flex-col">
                        <h4 className="text-base font-semibold text-dark-grayish-blue">Dr. Vijay Sah</h4>
                        <h5 className="text-sm font-medium text-desaturated-dark-blue">June 13, 2021</h5>
                    </div>
                </div>
                <div id="share-icon" className='flex flex-row justify-center text-light-grayish-blue space-x-4'>
                    <button><FaFacebookSquare className='text-2xl' /></button>
                    <button><FaTwitter className='text-2xl' /></button>
                    <button><FaPinterest className='text-2xl' /></button>
                    <Link to="/ISFCovid"><button className='bg-black text-white border-black hover:shadow-xl'>Show more</button></Link>
                    </div>
            </div>
        </div>
    </div>
        
    )
}

export default ISFCovid