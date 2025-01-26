import { useState } from 'react'

export default function Vehicles() {
    const[popup, isPopup] = useState(false);

    return (
        <div class="">
            <h1>TESTINGGGGG</h1>
            {window.location.pathname === 'http://localhost:5173/Vehicles' && <Vehicles />}
            {/*<div className= "top-0 gap-10 h-full" style={{ display: 'flex' }}>
                <div className="left-0 pl-3 gap-10" style={{ display: 'flex' }}>
                    <img className = "w-20" src="./images/logo.jpg"></img>
                    <h1 className="text-red-500 text-7xl font-Toyota">TOYOTA</h1>
                </div>
                <div className="ml-auto flex items-center justify-center">
                    <ul className="rounded-2xl mr-16 px-3 py-1.5 bg-red-500 text-2xl text-white hover:bg-red-900">
                        <li><a href="/Vehicles">Vehicles</a></li>
                    </ul>
                </div>
                <h1>Vehiclessssssss!!!!!!!!!</h1>
            </div>
            {window.location.pathname === '/Vehicles' && <Vehicles />}*/}
        </div>
    );
}