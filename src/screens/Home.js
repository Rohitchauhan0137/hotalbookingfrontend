import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { DatePicker, Space, Input, Select } from 'antd';
import 'antd/dist/reset.css'
import Card from 'react-bootstrap/Card';
import Rooms from '../components/Rooms';
import { roomList } from '../redux/slices/room';
import Loading from '../components/Loading';
import './Home.css'
import moment from 'moment';

const { RangePicker } = DatePicker;

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [roomType, setRoomType] = useState('All');
    const [serachKey, setSearchKey] = useState('');
    const [error, setError] = useState(true);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    })

    const getRooms = async () => {
        try {
            const data = (await axios.get('/api/rooms/getAllRooms')).data
            if (data) {
                setRooms(data ?? [])
                setDuplicateRooms(data ?? [])
                dispatch(roomList(data ?? []))
                setLoading(false)
                setError(false)
            }
        } catch (error) {
            console.log("Error", error)
            dispatch(roomList([]))
            setLoading(true)
            setError(true)
        }
    }

    useEffect(() => {
        getRooms()
    }, [])

    const getFormatedDate = (date) => {
        const splitDate = date.split('-')
        return moment(new Date(`'${splitDate[2]}-${splitDate[1]}-${splitDate[0]}'`)).toDate();
    }

    const filterRoomByDate = (startDate, toDate) => {
        const roomList = [];
        let avaliability = false;

        for (const room of duplicateRooms) {
            if (room.currentBookings.length > 0) {
                for (const booking of room.currentBookings) {
                    if ((!moment(moment(startDate).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)) &&
                        (!moment(moment(toDate).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate))) {
                        if ((moment(startDate).format('DD-MM-YYYY') !== booking.fromDate) &&
                            (moment(startDate).format('DD-MM-YYYY') !== booking.toDate) &&
                            (moment(toDate).format('DD-MM-YYYY') !== booking.fromDate) &&
                            (moment(toDate).format('DD-MM-YYYY') !== booking.toDate)
                        ) {
                            avaliability = true;
                        }
                    }
                }
            }
            if (avaliability || room.currentBookings.length === 0) {
                roomList.push(room)
            }
        }
        setRooms([...roomList])
    }

    const filterByDate = (dates, dateStrings) => {
        const range = {
            ...dateRange,
            startDate: dateStrings[0],
            endDate: dateStrings[1]
        }
        setDateRange({ ...range })
        const bookingFrom = moment(getFormatedDate(dateStrings[0]), 'DD-MM-YYY')
        const bookingto = moment(getFormatedDate(dateStrings[1]), 'DD-MM-YYY')
        filterRoomByDate(bookingFrom, bookingto)
    }

    const handleSelectChange = (value) => {
        setRoomType(value)
        if(value !=='All'){
            const roomByType = duplicateRooms.filter(room => room.type === value);
            setRooms([...roomByType])
        }else{
            setRooms([...duplicateRooms])
        }
    };

    const onInputChange = (e) => {
        setSearchKey(e.target.value)
    }

    const filterByKey = (value) => {
        const filteredRooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(serachKey.toLowerCase()))
        setRooms([...filteredRooms])
    }

    const renderHeader = () => {
        return (
            <Card className='home-header'>
                <Card.Body className='header-body'>
                    <Space direction="vertical" size={12} className='date-filter'>
                        <RangePicker
                            format='DD-MM-YYYY'
                            onChange={filterByDate}
                        />
                    </Space>
                    <Space direction="vertical" size={12} className='room-search'>
                        <Input placeholder='Search room'
                            value={serachKey}
                            onChange={onInputChange}
                            className='room-search-box'
                            onKeyUp={filterByKey}
                        />
                    </Space>
                    <Space direction="vertical" size={12} className='room-type-select-box'>
                        <Select
                            value={roomType}
                            onChange={handleSelectChange}
                            className='room-type-select'
                            options={[
                                {
                                    value: 'All',
                                    label: 'All',
                                },
                                {
                                    value: 'Delux',
                                    label: 'Delux',
                                },
                                {
                                    value: 'Non Delux',
                                    label: 'Non Delux',
                                },
                            ]}
                        />
                    </Space>
                </Card.Body>
            </Card>)
    }

    return (
        <>{loading ? <Loading /> :
            <div>
                <div>
                    {renderHeader()}
                </div>
                {rooms.map(item => (
                    <Rooms roomData={item} dateRange={dateRange} />
                ))}
            </div>
        }
        </>
    )
}

export default Home;