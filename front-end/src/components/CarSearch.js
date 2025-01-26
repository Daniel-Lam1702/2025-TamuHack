import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch car images from the backend
    const fetchCarImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/google-search/'); // Ensure this URL is correct
        setCars(response.data.cars || []);  // Default to empty array if no cars
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car images:', error);
        setError('Failed to fetch car images.');
        setLoading(false);
      }
    };

    fetchCarImages();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Car Image Search</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.car_id} className="border p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">{car.car_name}</h2>
                <img
                  src={car.image_url}
                  alt={car.car_name}
                  className="w-full h-auto rounded-lg mt-2"
                />
              </div>
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarSearch;
