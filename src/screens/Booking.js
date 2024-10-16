import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Loading from '../components/Loading';
import Error from '../components/Error';
import './Booking.css'

const Booking = () => {
    const [bookingData, setBookingData] = useState({});
    const params = useParams();
    const { allRooms } = useSelector((state) => state.roomList)
    const { user } = useSelector((state) => state.userProfile)
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState({
        fromDate: null,
        toDate: null
    })
    const [error, setError] = useState(true);
    const [totalDays, setTotalDays] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const userName = JSON.parse(localStorage.getItem('userName'));
    const userId = JSON.parse(localStorage.getItem('userId'));

    const getFormatedDate = (date) => {
        const splitDate = date.split('-')
        return moment(new Date(`'${splitDate[2]}-${splitDate[1]}-${splitDate[0]}'`)).toDate();
    }

    useEffect(() => {
        if(!userName){
            window.location.href = '/login'
        }
    }, [userName])

    useEffect(() => {
        const bookingFrom = moment(getFormatedDate(params.fromDate), 'DD-MM-YYY')
        const bookingto = moment(getFormatedDate(params.toDate), 'DD-MM-YYY')
        const bookingRange = { ...dateRange, 'fromDate': bookingFrom, 'toDate': bookingto }
        setDateRange({ ...bookingRange })
        const duration = moment.duration(bookingto?.diff(bookingFrom)).asDays() + 1
        setTotalDays(duration)
        setTotalAmount((bookingData.rentPerDay) * duration)
    }, [params.toDate, params.fromDate, bookingData])

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const getRoom = async () => {
        try {
            const data = (await axios.post('/api/rooms/getRoomById', { roomId: params.roomId }))?.data
            if (data) {
                setLoading(false)
                setError(false)
                setBookingData(data)
            }
        } catch (error) {
            console.log("Error", error)
            setLoading(false)
            setError(true)
            setBookingData({})
        }
    }

    useEffect(() => {
        if (allRooms?.length > 0) {
            const roomItem = allRooms.filter(item => item._id === params.roomId)
            setLoading(false)
            setError(false)
            setBookingData(roomItem && roomItem[0])
        } else {
            getRoom()
        }

    }, [params, allRooms])

    const displayRoomDetails = () => {
        return (
            <Carousel className='booking-slids' activeIndex={index} onSelect={handleSelect} indicators={false}>
                {bookingData?.imageUrls.map(imgUrl => (
                    <Carousel.Item>
                        <img src={imgUrl} className='book-carousel-img' />
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }

    const payNow = async (token) => {
        const bookingDetails = {
            roomName: bookingData.name,
            roomId: bookingData._id,
            userName: userName ?? user?.name,
            userId: userId ?? user?.userId,
            fromDate: dateRange.fromDate,
            toDate: dateRange.toDate,
            totalAmount,
            totalDays,
            token
        }

        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookRoom', bookingDetails)
            if (result) {
                setLoading(false)
                Swal.fire({
                    title: "Congratulations",
                    text: "Your room has been booked successfully",
                    icon: "success"
                  }).then(res => {
                    window.location.href = '/profile'
                  })
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                title: "Oops...",
                text: "Sorry, Something went wrong, please try again...",
                icon: "error"
              });
        }
    }

    return (
        <>
            {loading ? <Loading /> : bookingData?.name ?
                <Card className='book-rooms-card'>
                    <Card.Body className='book-card-body'>
                        <div>
                            <h1 className='room-name'>{bookingData.name}</h1>
                            {displayRoomDetails()}
                        </div>
                        <div className='book-card-text'>
                            <div className='booking-details-container'>
                                <p className='booking-details'>Booking Details</p>
                                <Link to={`/home`}>
                                    <Button variant="secondary" className='go-to-home-cta'>Go To Home</Button>
                                </Link>
                            </div>
                            <div className='book-card-left-text'>
                                <p><b>Name : </b>{userName ?? user?.name}</p>
                                <p><b>From Date : {params?.fromDate}</b>{bookingData?.fromDate}</p>
                                <p><b>To Date : {params?.toDate}</b>{bookingData?.toDate}</p>
                                <p><b>Max Count : </b>{bookingData.maxCount}</p>
                                <p><b>Phone Number : </b>{bookingData.phoneNumber}</p>
                                <p><b>Type :</b> {bookingData.type}</p>
                            </div>
                            <div className='booking-payment'>
                                <p>Total Days : <b>{totalDays}</b></p>
                                <p>Rent Per Day : <b>{bookingData.rentPerDay}</b></p>
                                <p><b>Total Amount : {totalAmount} /</b></p>
                            </div>
                            <div className='book-card-button'>
                                <StripeCheckout
                                    token={payNow}
                                    currency='INR'
                                    amount={totalAmount * 100}
                                    stripeKey={process.env.REACT_APP_PAYMENT_KEY}
                                >
                                    <button className='btn btn-primary'>Pay Now</button>
                                </StripeCheckout>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                : <Error />
            }
            <Toaster />
        </>
    )
}

export default Booking