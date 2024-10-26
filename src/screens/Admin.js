import React, { useState, useEffect } from 'react';
import { Table, Tabs } from 'antd';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Loading from '../components/Loading';
import './Admin.css';
import { bookingColumns, roomsColumns, usersColumns } from './TableColumns';
import CreateRoom from './CreateRoom';

const reqData = {
    name: '',
    maxCount: '',
    phoneNumber: '',
    rentPerDay: '',
    imageUrls: ['', '', ''],
    rating: '',
    type: '',
    description: ''
}

const Admin = () => {
    const [currentTab, setCurrentTab] = useState('bookings')
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(false)
    const [roomList, setRoomList] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [roomReqData, setRoomReqData] = useState({ ...reqData })

    const onInputChange = (value, name) => {
        let reqData = { ...roomReqData }
        if (name === "firstImgUrl") {
            reqData.imageUrls[0] = value;
        } else if (name === "secondImgUrl") {
            reqData.imageUrls[1] = value;
        } else if (name === "thirdImgUrl") {
            reqData.imageUrls[2] = value;
        } else {
            reqData = { ...roomReqData, [name]: value }
        }
        setRoomReqData({ ...reqData })
    }

    const onRoomCreate = async (values) => {
        try {
            if (values) {
                const newRoom = (await axios.post('/api/rooms/createRoom', roomReqData)).data;
                Swal.fire({
                    title: "Congratulations",
                    text: "Your room has been created successfully",
                    icon: "success"
                }).then(() => {
                    setRoomReqData({ ...reqData })
                })
            }
        } catch (error) {
            toast.error('OOPS, Something went wrong', { duration: 2000 })
        }
    }

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

    const onChange = (key) => {
        setCurrentTab(key)
        if (key === 'bookings') {
            getAllBookings()
        } else if (key === 'rooms') {
            getAllRooms()
        } else if (key === 'users') {
            getAllUsers()
        }
    };

    useEffect(() => {
        getAllBookings();
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
            children: <CreateRoom
                roomReqData={roomReqData}
                onInputChange={onInputChange}
                setRoomReqData={setRoomReqData}
                onRoomCreate={onRoomCreate}
            />,
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
            <Toaster />
        </div>
    )
}

export default Admin