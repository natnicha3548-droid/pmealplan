// FoodCard.js
import React from 'react';

function FoodCard({ food, onClick }) {
    return (
        // เพิ่ม onClick เพื่อให้การ์ดสามารถคลิกได้
        <div className="food-card clickable" onClick={() => onClick(food.food_id)}>
            <img
                src={food.image || 'https://via.placeholder.com/250x180'}
                className="food-img"
                alt={food.food_name}
            />
            <div className="food-details">
                <h3 className="food-name">{food.food_name}</h3>
                <p className="food-serving">หน่วย: {food.serving_size}</p>
                <div className="nutrients-row">
                    {/* เก็บไว้เฉพาะแคลอรี่ เพื่อให้การ์ดดูเรียบง่าย */}
                    <span className="kcal-badge">{food.calories} kcal</span>
                </div>
                <p className="click-hint">คลิกเพื่อดูสารอาหารและวิธีปรุง</p>
            </div>
        </div>
    );
}

export default FoodCard;