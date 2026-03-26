import React, { useState } from 'react';
import '../App.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="main-nav">

            <div className="nav-top">

                <div className="nav-logo">
                    MealPlan
                </div>

                <div
                    className="hamburger"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✖' : '☰'}
                </div>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li>
                        <a href="#home" onClick={() => setIsOpen(false)}>
                            หน้าแรก
                        </a>
                    </li>

                    <li>
                        <a href="#menu" onClick={() => setIsOpen(false)}>
                            เมนูอาหาร
                        </a>
                    </li>

                    <li>
                        <a href="#plan" onClick={() => setIsOpen(false)}>
                            แผนการกิน
                        </a>
                    </li>

                    <li>
                        <a href="#about" onClick={() => setIsOpen(false)}>
                            เกี่ยวกับเรา
                        </a>
                    </li>

                </ul>

            </div>

        </nav>
    );
};

export default Navbar;