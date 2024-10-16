import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Tag } from 'antd';
import Loading from '../components/Loading';

const BookingList = ({ bookingList, cancelBooking }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookingList.length > 0) {
            setLoading(false)
        }
    }, [bookingList]);

    return (
        <div className='booking-list'>
            {loading && <Loading />}
            {bookingList.length > 0 ? <>
                {bookingList.map(booking =>
                    <Card className='booking-list-card'>
                        <Card.Body className='booking-list-body'>
                            <h3>{booking.roomName}</h3>
                            <p className='booking-items'><b>Booking ID: </b> {booking._id}</p>
                            <p className='booking-items'><b>Transaction Id: </b>{booking.transactionId}</p>
                            <p className='booking-items'><b>Check In: </b>{booking.fromDate}</p>
                            <p className='booking-items'><b>Check Out: </b>{booking.toDate}</p>
                            <p className='booking-items'><b>Total Days: </b>{booking.totalDays}</p>
                            <p className='booking-items'><b>Total Amount: </b>{booking.totalAmount}</p>
                            <p className='booking-items'><b>Status:</b> <Tag className='booking-status' color={`${booking.status === 'Confirmed' ? "green" : "red"}`}>{booking.status}</Tag></p>
                            {booking.status === 'Confirmed' &&
                                <div className='cancel-booking'>
                                    <button className='cancel-booking-cta' onClick={() => cancelBooking(booking._id, booking.roomId)}>Cancel Booking</button>
                                </div>
                            }

                        </Card.Body>
                    </Card>)}
            </>
                : <Card>
                    <Card.Body className='booking-list-body'>
                        <h3>No Bookings</h3>
                    </Card.Body>
                </Card>
            }

        </div>
    )
}

export default BookingList