import React, { useState, useEffect } from 'react';
import { Table, Tabs } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'
import Loading from '../components/Loading';
import './Admin.css';
import { bookingColumns, roomsColumns, usersColumns } from './TableColumns';
import CreateRoom from './CreateRoom';

const Admin = () => {
    const [currentTab, setCurrentTab] = useState('bookings')
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(false)
    const { allRooms } = useSelector((state) => state.roomList)
    const [roomList, setRoomList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [roomReqData, setRoomReqData] = useState({
        name: '',
        maxCount: '',
        phoneNumber: '',
        rentPerDay: '',
        imageUrls: ['', '', ''],
        rating: '',
        type: '',
        description: ''
    })

    const onInputChange = (value, name, isImage=false) => {
        console.log("Vanue=====>", value, name, isImage)
    } 

    const onRoomCreate = async () => {
        console.log("roomReqData=====>", roomReqData)
        try {
            
        } catch (error) {
            
        }
    }

    const onChange = (key) => {
        setCurrentTab(key)
        console.log(key);
    };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('isAdmin'))) {
            window.location.href = '/home'
        }
    }, [])

    const getAllBookings = async () => {
        try {
            setLoading(true)
            const allBooking = await axios.get('/api/bookings/getAllBooking');
            setAllBookings([...allBooking.data])
            setLoading(false)
        } catch (error) {
            console.log("Error", error);
            setLoading(false)
        }
    }

    const getAllRooms = async () => {
        if (allRooms?.length) {
            setRoomList([...allRooms])
        } else {
            try {
                setLoading(true)
                const data = (await axios.get('/api/rooms/getAllRooms')).data
                setRoomList([...data])
                setLoading(false)
            } catch (error) {
                console.log("Error", error);
                setLoading(false)
            }
        }
    }

    const getAllUsers = async () => {
        try {
            setLoading(true)
            const data = (await axios.get('/api/users/getAllUsers')).data
            setAllUsers([...data])
            setLoading(false)
        } catch (error) {
            console.log("Error", error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllBookings();
        getAllRooms();
        getAllUsers();
    }, []);

    const renderAllBookings = () => {
        return (
            <div>
                {loading && <Loading />}
                {<Table columns={bookingColumns} dataSource={allBookings} />}
            </div>
        )
    }

    const renderAllRooms = () => {
        return (
            <div>
                {loading && <Loading />}
                {<Table columns={roomsColumns} dataSource={roomList} />}
            </div>
        )
    }

    const renderAllUsers = () => {
        return (
            <div>
                {loading && <Loading />}
                {<Table columns={usersColumns} dataSource={allUsers} />}
            </div>
        )
    }

    const tabItems = [
        {
            key: 'bookings',
            label: 'Bookings',
            children: renderAllBookings(),
        },
        {
            key: 'rooms',
            label: 'Rooms',
            children: renderAllRooms(),
        },
        {
            key: 'addRoom',
            label: 'Add Room',
            children: <CreateRoom roomReqData={roomReqData} onInputChange={onInputChange}/>,
        },
        {
            key: 'users',
            label: 'Users',
            children: renderAllUsers(),
        },
    ];

    return (
        <div className='admin-container'>
            <h1 className='admin-panel-header'>Admin panel</h1>
            <Tabs defaultActiveKey={currentTab} items={tabItems} onChange={onChange} />
        </div>
    )
}

export default Admin