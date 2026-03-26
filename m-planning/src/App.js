// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FoodCard from './components/FoodCard'; // นำเข้า Component ที่สร้างไว้

function App() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.error("Error connecting to backend:", err));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DailyMeal Support</h1>
        <p>ระบบสนับสนุนการวางแผนรับประทานอาหาร</p>
      </header>

      <main className="food-grid">
        {foods.map(food => (
          <FoodCard key={food.food_id} food={food} />
        ))}
      </main>
    </div>
  );
}

export default App;