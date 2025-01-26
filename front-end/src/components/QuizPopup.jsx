import { useState } from "react";
import React from 'react';
import './QuizPopup.css';

export default function QuizPopup(setPopup) {
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
            options: ['Off-roading', 'Racing', 'None (General Purpose)'],
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
    const quizResults = [];

    const nextQuestion = (choices) => {
        quizResults.push(choices);
        if(currentQuestionIndex == quizQuestions.length) 
        {
            //change page to Vehicle Catalog
            //with filters based on quizResults
            //http://127.0.0.1:8000/api/toyota_vehicles/?
            // price=quizResults[0]&
            // key=<value2>&
            // Fuel_type=quizResults[2]&
            // key=<value4>&
            // key=<value5>&
            // co2_emissions= low OR fuel_type=electric OR epa_fuel_score = GOOD&
            // vehicle_type=quizResults[7]&
            // vehicle_size=quizResults[8]
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

    return (
        <div className="absolute inset-0 bg-white w-4/5 h-fit pb-8 opacity-100 rounded-2xl flex flex-col justify-top items-start pt-0 mx-16 my-10">
            <h3 className="ml-5 mb-10 mt-5 pt-0 text-8xl text-red-500">Question {currentQuestionIndex + 1}</h3>
            <h3 className = "ml-6 text-4xl text-red-500 font-toyota">{currentQuestion.question}</h3>
            {currentQuestion.options.map((choice, index) => (
                <div>
                    <button className="rounded-2xl mt-10 ml-20 text-3xl outline-2 px-3 py-1.5 text-black font-toyota hover:bg-black hover:text-white" onClick={() => nextQuestion(choice)}>{choice}</button>
                </div>
            ))}
        </div>
    );
}