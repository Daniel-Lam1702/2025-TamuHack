import React from 'react';
import { useState } from 'react';
import './Pages.css';

const Pages = () => { 

    const[popup, setPopupOpen] = useState(false);
    
    const openPopup = () => 
    {
        setPopupOpen(true);
    }

    const closePopup = () => 
    {
        setPopupOpen(false);
    }

    return ( 
        <section className="home">
            <div className="home-content">
                {!(popup) && (
                    <div class = "absolute inset-0 h-auto w-full bg-black opacity-75 flex-col flex items-start pl-16 justify-center gap-4 py-8">
                        <h1> Take this quiz to <br></br> discover your ideal car.</h1>
                        <button className="rounded-2xl px-3 py-1.5 bg-red-500 text-2xl text-white hover:bg-red-900" onClick={() => openPopup()}>
                            Learn More
                        </button>
                    </div>
                )}
                {popup && (
                    <div class="absolute inset-0 bg-white opacity-80 w-<3/5> h-<3/5> rounded-2xl flex-col justify-center items-center py-20 m-15 mx-16 my-10">
                        <h1>Testing</h1>
                        <button onClick={() => closePopup()}>Close</button>
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