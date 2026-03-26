import React, { useEffect, useState } from 'react';
import './App.css';
import FoodCard from './components/FoodCard';
import Navbar from './components/Navbar';

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div className="main-layout">
      <Navbar />

      <div className="app-container">
        <header className="app-header">
          <h1>MealPlan</h1>
          <p>ระบบช่วยวางแผนการรับประทานอาหารในชีวิตประจำวัน เพื่อให้ได้รับพลังงานอย่างเหมาะสม</p>
        </header>

        <main className="food-grid">
          {foods.length > 0 ? (
            foods.map(food => (
              <FoodCard key={food.food_id} food={food} />
            ))
          ) : (
            <div className="loading-state">
              <p>กำลังโหลดข้อมูลอาหาร...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;