import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Vehicles from './Vehicles';
import Hero from './components/hero/Hero';
import Pages from './components/pages/Pages';

function App() {
  return (
    <div className="pt-1.5 m-0 w-full h-full flex flex-col gap-4 border-0">
      <div className="top-0 gap-10 h-full" style={{ display: 'flex' }}>
        <div className="left-0 pl-3 gap-10" style={{ display: 'flex' }}>
          <img className="w-20" src="./images/logo.jpg" alt="Logo" />
          <h1 className="text-red-500 text-7xl font-Toyota">TOYOTA</h1>
        </div>
        <div className="ml-auto flex items-center justify-center">
          <ul className="rounded-2xl mr-16 px-3 py-1.5 bg-red-500 text-2xl text-white hover:bg-red-900">
            <li><a href="/Vehicles">Vehicles</a></li>
          </ul>
        </div>
      </div>

      <div className="relative bg-linear-to-t justify-center from-black to-red-500">
        <div className="w-full px-0 place-items-center">
          <img className="w-fit" src="./images/redcar.jpg" alt="Red Car" />
        </div>
        <div className="absolute inset-0 h-auto w-full bg-black opacity-75 flex-col flex items-center justify-center gap-4 py-8">
          <h1 className="text-white font-Toyota text-3xl pb-4 items-center">
            Take this quiz to discover your ideal car.
          </h1>
          <button className="rounded-2xl px-3 py-1.5 bg-red-500 text-2xl text-white hover:bg-red-900" onClick="">
            Learn More
          </button>
        </div>
      </div>

      <div className="w-full px-0 place-items-center">
        <img className="w-150" src="./images/dirtcar.avif" alt="Dirt Car" />
      </div>

      {window.location.pathname === '/Vehicles' && <Vehicles />}
      {window.location.pathname === '/home' && <App />}

      <Hero />
      <Pages />
    </div>
  );
}

export default App;
