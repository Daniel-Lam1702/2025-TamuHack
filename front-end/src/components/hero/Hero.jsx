import React from "react";
import "./Hero.css";

const Hero = () => {
    return ( 
        <header className="header">
            <a href="#" className="logo">Toyota Carbot</a>

            <nav className="navbar">
                <a href="#buy">Purchase Cars</a>
            </nav>

            {/*
            <div className="social-media">
                <a href="#"><img src="hi" alt="social1" /></a> 
                <a href="#"><img src="hello" alt="social2" /></a>
                <a href="#"><img src="yo" alt="social3" /></a> 
            </div>
            */}
        </header>
    ) 
}

export default Hero;