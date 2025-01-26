import { useState } from "react";
import React from 'react';
import './QuizPopup.css';
import axios from "axios";

export default function QuizPopup(setPopup) {
/*    // {
    {
    '< $25,000' -> [min_price=0, max_price=25000],
    '$20,000-29,000' -> [min_price=20000, max_price=29000],
    '$30,000-39,000' -> [min_price=30000, max_price=39000],
    '$40,000-49,000' -> [min_price=40000, max_price=49000],
    '$50,000+' -> [min_price=50000, max_price=1000000],
    }
*/ 
    const [dreamCars, setDreamCars] = useState([]);
    const [quizResults, setQuizResults] = useState([]);
    const [view, setView] = useState("quiz");
    const quizQuestions = [
        {
          question: 'What is your price range?',
          options: ['< $25,000', '$20,000-29,000', '$30,000-39,000', '$40,000-49,000', '$50,000+'],
        },
        {
          question: 'Would you like a hybrid car?',
          options: ['Yes', 'No'],
        },
        {
            question: 'What type of fuel would you like?',
            options: ['Regular', 'Premium', 'Electric', 'Hydrogen'],
        },
        {
            question: 'What kinds of trips will you be taking with your new car?',
            options: ['Trips with lots of stops', 'Road trips', 'Both'],
        },
        {
            question: 'Any special uses?',
            options: ['Off-roading', 'Racing', 'General'],
        },
        {
            question: 'How important is the environmental footprint of your car?',
            options: ['Very important', 'Somewhat important', 'Not important'],
        },
        {
            question: 'What type of vehicle are you looking for?',
            options: ['SUV', 'Car', 'Pickup Truck'],
        },
    ];

    const car_type_questions = [
        {
            question: 'What type of SUV?',
            options: ['Small', 'Medium', 'Standard'],
          },
          {
            question: 'What type of car?',
            options: ['Two-seater', 'Mini-Compact', 'Sub-Compact', 'Compact', 'Mid-Size'],
          },
          {
            question: 'What type of truck?',
            options: ['Small', 'Standard'],
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(quizQuestions[currentQuestionIndex]);

    const price_range = (price) => {
        if(price === '< $25,000'){
            return [0,25000];
        }else if(price === '$20,000-29,000'){
            return [20000,29000];
        }else if(price === '$30,000-39,000'){
            return [30000,39000];
        }else if(price === '$40,000-49,000'){
            return [40000,49000];
        }else if(price === '$50,000+'){
            return [50000,1000000];
        }
    }

    const isHybridValue = (isHybrid) => {
        if(isHybrid === 'Hybrid')
        {
            return 'atv_category=Hybrid&';
        }
        else
        {
            return '';
        }
    }

    const co2_emissions = (emissions) => {
        console.log(emissions);
        if (emissions === 'Very important')
            return [0,173];
        else if(emissions === 'Somewhat important')
            return [174,346];
        else if (emissions === 'Not important')
            return [347,519];
    }

    console.log(quizResults);

    const nextQuestion = (choices) => {
        setQuizResults((prevResults) => [...prevResults, choices]);
        if(currentQuestionIndex == quizQuestions.length) 
        {   
            const price_range_values = price_range(quizResults[0]);
            console.log("emissions: "+quizResults[5]);
            const co2_emissions_range = co2_emissions(quizResults[5]);
            //console.log(`http://127.0.0.1:8000/api/toyota_vehicles?min_price=${price_range_values[0]}&max_price=${price_range_values[1]}&${isHybridValue(quizResults[1])}fuel_type=${quizResults[2]}&vehicle_type=${quizResults[4]}&min_co2_emissions=${co2_emissions_range[0]}&max_co2_emissions=${co2_emissions_range[1]}`);
            axios.get(`http://127.0.0.1:8000/api/toyota_vehicles/?min_price=${price_range_values[0]}&max_price=${price_range_values[1]}&${isHybridValue(quizResults[1])}fuel_type=${quizResults[2]}&vehicle_type=${quizResults[4]}&min_co2_emissions=${co2_emissions_range[0]}&max_co2_emissions=${co2_emissions_range[1]}`)
              .then(response => {
                let bestThree = [];
                let count = 0;
                let responseData = response.data;
                responseData.forEach(element => {
                    if(count < 3){
                        bestThree.push(element);
                        count++;
                    }
                });
                setDreamCars(bestThree);
                setView("results");
              })
              .catch(error => {
                console.error('There was an error!', error);
              });
            //change page to Vehicle Catalog
            //with filters based on quizResults
            //http://127.0.0.1:8000/api/toyota_vehicles/?min_price=<value1>&max_price=<value2>&
            // price=quizResults[0]& RANGE ->min_price=<value1>&max_price=<value2>&
            // if(quizResults[1] = 'Hybrid') then atv_category=Hybrid
            // Fuel_type=quizResults[2]&
            // key=<value4>& OMIT FOR NOW
            // vehicle_type=Racing or General or General/Off-roading& 
            // co2_emissions= (0-173)(174-346)(347-519)) 
            // vehicle_size=quizResults[8] OMIT FOR NOW
                //[0] price
                //[1] hybrid
                //[2] fuel
                //[3] short/long distance (road trips/lots of stops)
                //[4] special uses (off roading/racing/general)
                //[5] environmental footprint
                //[6] vehicle type (SUV/car/truck)
                //[7] type of vehicle type 
            //endpoint queries from database to filter search results
        }
        if (currentQuestionIndex == quizQuestions.length - 1) 
        {
            if(choices === 'SUV') 
            {
                setCurrentQuestion(car_type_questions[0]);
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
            else if(choices === 'Car')
            {
                setCurrentQuestion(car_type_questions[1]);
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
            else if(choices === 'Pickup Truck')
            {
                setCurrentQuestion(car_type_questions[2]);
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }
        }
        else if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setCurrentQuestion(quizQuestions[currentQuestionIndex + 1]);
        }
    };

    console.log(quizResults);

    if (view === "results") {
        return (
            <div className="overflow-y-auto max-h-[80vh] absolute inset-0 bg-white w-4/5 h-fit pb-8 rounded-2xl flex flex-col justify-top items-start pt-0 mx-16 my-10">
                <h3 className="ml-5 mb-10 mt-5 pt-0 text-6xl text-red-500">Recommended Vehicles</h3>
                <div className="w-full px-6">
                    {dreamCars.length > 0 ? (
                        dreamCars.map((vehicle, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-lg hover:bg-gray-50">
                                <img src={vehicle.image_url} alt={vehicle.model} className="w-[20rem] h-auto rounded-lg" />
                                <h4 className="text-2xl text-red-500 font-toyota">{vehicle.model} {vehicle.model_year}</h4>
                                <p className="text-lg mt-2">
                                    Price: ${vehicle.price.toLocaleString()}<br />
                                    Fuel Type: {vehicle.fuel_type}<br />
                                    Category: {vehicle.Atv_category}<br />
                                    MPG: {vehicle.combined_mpg}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl text-gray-600">No vehicles match your criteria. Try adjusting your preferences.</p>
                    )}
                </div>
                {/* Back to Home Button */}
                <button 
                    className="mt-6 mb-8 ml-20 rounded-2xl text-3xl outline-2 px-3 py-1.5 text-black font-toyota hover:bg-black hover:text-white"
                    onClick={() => {setView("home"); setCurrentQuestionIndex(0); setCurrentQuestion(quizQuestions[0])}} // This will reset the view back to the quiz page
                >
                    Restart Quiz
                </button>
            </div>
        );
    }
    


    return (
        <div className="absolute inset-0 bg-white w-4/5 h-fit pb-8 opacity-100 rounded-2xl flex flex-col justify-top items-start pt-0 mx-16 my-10">
            <h3 className="ml-5 mb-10 mt-5 pt-0 text-8xl text-red-500">Question {currentQuestionIndex + 1}</h3>
            <h3 className = "ml-6 text-4xl text-red-500 font-toyota">{currentQuestion.question}</h3>
            {currentQuestion.options.map((choice, index) => (
                <div key={choice}>
                    <button className="rounded-2xl mt-10 ml-20 text-3xl outline-2 px-3 py-1.5 text-black font-toyota hover:bg-black hover:text-white" onClick={() => nextQuestion(choice)}>{choice}</button>
                </div>
            ))}
        </div>
    );
}