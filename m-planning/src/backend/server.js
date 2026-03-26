const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // อนุญาตให้ React ดึงข้อมูลได้
app.use(express.json()); // ให้ Backend อ่านค่า JSON ที่ส่งมาจาก Frontend ได้

// --- 1. การเชื่อมต่อฐานข้อมูล (Database Connection) ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'meal_planning_db' // ชื่อที่คุณสร้างไว้ใน phpMyAdmin [cite: 188, 190]
});

db.connect((err) => {
    if (err) {
        console.error('เชื่อมต่อ MySQL ล้มเหลว:', err);
        return;
    }
    console.log('เชื่อมต่อฐานข้อมูล meal_planning_db สำเร็จ!');
});

// --- 2. API สำหรับดึงข้อมูลอาหาร (ดึงข้อมูลแบบ 3NF) ---
app.get('/api/foods', (req, res) => {
    // ใช้คำสั่ง JOIN เพื่อดึงข้อมูลจาก 2 ตารางที่แยกกันไว้ตาม L.3 
    const sql = `
        SELECT f.food_id, f.food_name, f.serving_size, f.image, 
               n.calories, n.protein, n.fat, n.carbohydrates
        FROM foods f
        LEFT JOIN food_nutrients n ON f.food_id = n.food_id
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// --- 3. API สำหรับบันทึกแผนการกิน (Meal Plan) --- [cite: 202]
app.post('/api/meal-plans', (req, res) => {
    const { user_id, plan_date, total_calories, plan_detail } = req.body;
    const sql = "INSERT INTO meal_plans (user_id, plan_date, total_calories, plan_detail) VALUES (?, ?, ?, ?)";

    db.query(sql, [user_id, plan_date, total_calories, plan_detail], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "บันทึกแผนเรียบร้อย", id: result.insertId });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server กำลังรันที่ http://localhost:${PORT}`);
});