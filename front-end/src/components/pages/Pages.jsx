import React from 'react';
import QuizPopup from '../QuizPopup';
import { useState } from 'react';
import './Pages.css';

const Pages = () => { 
    const [popup, setPopup] = useState(false);

    const openPopup = () => {
        setPopup(true);
    }

    const closePopup = () => {  
        setPopup(false);
    }

    return ( 
        <section className="home">
            <div className="home-content">
                {!(popup) && (
                    <div className= "absolute inset-0 h-auto w-full bg-black opacity-75 bg-linear-to-t from-red-500 to-black flex-col flex items-start pl-16 justify-center gap-4 py-8">
                        <h1> Take this quiz to <br></br> discover your ideal car.</h1>
                        <button className="rounded-2xl px-3 py-1.5 bg-red-500 text-2xl text-white hover:bg-white hover:text-red-500" onClick={() => openPopup()}>
                            Learn More
                        </button>
                    </div>
                )}
                {popup && (
                    <div className="w-full bg-linear-to-t from-red-500 to-black"> 
                        <QuizPopup closePopup={setPopup}/>
                    </div>
                )} 
            </div>

            <div className="home-img">
                <div className="rhombus">
                    <img src="car.png" alt="Car" />
                </div>
            </div>

            <div className="rhombus2"></div>
        </section>
    )
}

export default Pages;