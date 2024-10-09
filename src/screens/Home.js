import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css'
import Card from 'react-bootstrap/Card';
import Rooms from '../components/Rooms';
import { roomList } from '../redux/slices/room';
import Loading from '../components/Loading';
import Error from '../components/Error';
import './Home.css'
import moment from 'moment';

const { RangePicker } = DatePicker;

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
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

    const renderHeader = () => {
        return (
            <Card className='home-header'>
                <Card.Body className='header-body'>
                    <Space direction="vertical" size={12}>
                        <RangePicker
                            format='DD-MM-YYYY'
                            onChange={filterByDate}
                        />
                    </Space>
                </Card.Body>
            </Card>)
    }

    return (
        <>
            {rooms?.length > 0 ?
                <div>
                    <div>
                        {renderHeader()}
                    </div>
                    {rooms.map(item => (
                        <Rooms roomData={item} dateRange={dateRange} />
                    ))}
                </div>
                : <>
                    {loading ? <Loading /> : <Error />}
                </>
            }

        </>
    )
}

export default Home;