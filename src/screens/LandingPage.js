import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const LandingPage = () => {
    return (
        <div className='landing-page-container'>
            <div className='landing-page-text-container'>
                <h1 className='landing-page-header1' data-aos="zoom-in">Hotels Booking System</h1>
                <h2 className='landing-page-header2'>There is only one boss. The Guest.</h2>
                <Link to={'/home'}>
                    <Button color="default" variant="solid" className='landing-page-cta'>Get Started</Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage