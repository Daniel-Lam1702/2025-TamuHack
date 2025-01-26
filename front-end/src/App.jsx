import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Vehicles from './Vehicles';
import Hero from './components/hero/Hero';
import Pages from './components/pages/Pages';

function App() {
  const [count, setCount] = useState(0);
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

      <div className="w-full relative bg-linear-to-t justify-center from-black to-red-500">
        <Pages className="absolute mr-0 h-full"/>
      </div>

      {window.location.pathname === '/Vehicles' && <Vehicles />}
      {window.location.pathname === '/home' && <App />}  
    </div>
  );
}

export default App;
