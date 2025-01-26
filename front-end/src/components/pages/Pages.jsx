import React from 'react';
import './Pages.css';

const Pages = () => { 
    return ( 
        <section className="home">
            <div className="home-content">
                <h1>Welcome to TOYOTA CARBOT</h1>
                <h2>The best place to buy your next car</h2>
                <p>Range of pre-owned vehicles that can be viewed online or at our dealership</p>
                <a href="#about" className="btn">Industry's Leaders</a>
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