import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Vehicles = () => {
    const [textFilters, setTextFilters] = useState({
        model: '',
        vehicle_type: '',
        city_MPG: '',
        highway_MPG: '',
        cost_savings: '',
        price: ''
    });

    const [checkboxFilters, setCheckboxFilters] = useState({
        fuel_type: {
            hydrogen: false,
            premium: false,
            electricity: false,
            regular: false
        },
        atv_category: {
            hybrid: false,
            plugin_hybrid: false,
            EV: false,
            FCV: false
        },
        seats: {
            5: false,
            2: false,
            4: false,
            8: false,
            7: false
        },
        model_year: {
            2023: false,
            2024: false,
            2025: false
        }
    });

    const [priceSort, setPriceSort] = useState('none');

    const handleTextChange = (field, value) => {
        setTextFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (category, item) => {
        setCheckboxFilters(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [item]: !prev[category][item]
            }
        }));
    };

    const renderTextInput = (field, label) => (
        <div className="mb-4">
            <label className="block text-sm text-gray-700 capitalize mb-1">
                {label || field.replace(/_/g, ' ')}
            </label>
            <input
                type="text"
                value={textFilters[field]}
                onChange={(e) => handleTextChange(field, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                placeholder={`Enter ${label || field.replace(/_/g, ' ')}`}
            />
        </div>
    );

    const renderCheckboxGroup = (category, title) => (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div className="space-y-2">
                {Object.keys(checkboxFilters[category]).map((item) => (
                    <div key={item} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`${category}-${item}`}
                            checked={checkboxFilters[category][item]}
                            onChange={() => handleCheckboxChange(category, item)}
                            className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label 
                            htmlFor={`${category}-${item}`}
                            className="ml-2 text-gray-700 capitalize"
                        >
                            {item.replace(/_/g, ' ')}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img className="w-12" src="./images/logo.jpg" alt="Logo" />
                        <h1 className="text-red-500 text-3xl font-Toyota">TOYOTA</h1>
                    </div>
                    <Link 
                        to="/" 
                        className="rounded-lg px-3 py-1.5 bg-red-500 text-white hover:bg-red-900 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex">
                {/* Filter Sidebar */}
                <div className="w-96 bg-gray-50 min-h-[calc(100vh-64px)] p-6 border-r border-gray-200 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-red-500">Filters</h2>
                        
                        {/* Price Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                                className="block w-40 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="none">Sort by Price</option>
                                <option value="low-to-high">Low to High</option>
                                <option value="high-to-low">High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Text Input Filters */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Search Criteria</h3>
                        {Object.keys(textFilters).map(field => 
                            renderTextInput(field)
                        )}
                    </div>

                    {/* Checkbox Filters */}
                    {renderCheckboxGroup('fuel_type', 'Fuel Type')}
                    {renderCheckboxGroup('atv_category', 'ATV Category')}
                    {renderCheckboxGroup('seats', 'Number of Seats')}
                    {renderCheckboxGroup('model_year', 'Model Year')}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    <h1 className="text-3xl font-bold mb-6">Available Vehicles</h1>
                    <div className="bg-gray-100 p-4 rounded-lg min-h-[500px]">
                        <p className="text-gray-600">Placeholder for vehicle listings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicles;