import '../css/Home.css'
import { useState, useEffect } from 'react'

const Home = () => {
    return (
        <div className="home-container">
            <div className="homeLeftColumn">
                <div className="text-container">
                    <h1>helloooooo</h1>
                </div>
            </div>
            <div className="homeRightColumn">
                <div className="right-container">
                    <div className="right-header">
                        <h1>Get started</h1>
                    </div>
                    <div className="right-bottom-header">
                        <a href="/login">
                            <button className="login-button">Login</button>
                        </a>
                        <a href="/signup">
                            <button className="login-button">Sign Up</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home