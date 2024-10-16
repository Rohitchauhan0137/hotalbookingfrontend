import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { AiOutlineArrowLeft } from "react-icons/ai";
import BookingList from './BookingList';
import './Profile.css'

const Profile = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const userName = JSON.parse(localStorage.getItem('userName'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    const userEmail = JSON.parse(localStorage.getItem('userEmail'));
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        if (!userName) {
            window.location.href = '/login'
        }
    }, [userName, userEmail]);

    const getBookings = async () => {
        try {
            const rooms = (await axios.post('/api/bookings/getBookingsByUserId', { userId: userId })).data
            if (rooms) {
                setBookingList([...rooms])
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    useEffect(() => {
        if (userId && currentTab === 'bookings' && bookingList.length === 0) {
            getBookings()
        }
    }, [userId, currentTab]);

    const renderMyProfile = () => {
        return (<Card className='profile'>
            <Card.Header>
                My Profile
            </Card.Header>
            <Card.Body className='profile-body'>
                <p className='profile-body-item'>Name: {userName}</p>
                <p className='profile-body-item'>Email: {userEmail}</p>
                <p className='profile-body-item'>Is Admin: {isAdmin ? "YES" : "NO"}</p>
            </Card.Body>
        </Card>)
    }

    const cancelBooking = async (bookingId, roomId) => {
        try {
            await axios.post('/api/bookings/cancelBooking', { bookingId, roomId })
                .then(() => {
                    Swal.fire({
                        title: "Congratulations",
                        text: "Your booking cancelled successfully",
                        icon: "success"
                    }).then(() => {
                        getBookings();
                    })
                })

        } catch (error) {
            console.log("Error", error);
        }
    }

    const tabsItem = [
        {
            key: 'profile',
            label: 'Profile',
            children: renderMyProfile(),
        },
        {
            key: 'bookings',
            label: 'Bookings',
            children: <BookingList bookingList={bookingList} cancelBooking={cancelBooking} />,
        },
    ];

    const onChange = (key) => {
        setCurrentTab(key)
    };

    const backToHome = () => {
        window.location.href = '/home';
    }

    const OperationsSlot = {
        right: <button className='back-to-home-cta' onClick={backToHome}><AiOutlineArrowLeft/> Back</button>,
      };

    return (
        <div className='profile-container'>
            <Tabs 
                defaultActiveKey="profile" 
                items={tabsItem} 
                onChange={onChange}
                tabBarExtraContent={OperationsSlot}
             />
        </div>
    )
}

export default Profile