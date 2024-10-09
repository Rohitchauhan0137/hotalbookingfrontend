import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import './Rooms.css';
import { Link } from 'react-router-dom';

const Rooms = ({ roomData, dateRange }) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const displayRoomDetails = () => {
        return (
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                {roomData.imageUrls.map(imgUrl => (
                    <Carousel.Item>
                        <img src={imgUrl} className='modal-img' />
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    }

    return (
        <>
            <Card className='rooms-card'>
                <Card.Body className='card-body'>
                    <img src={roomData.imageUrls[0]} className='smallimg' />
                    <div className='card-text'>
                        <div className='card-left-text'>
                            <h1 className='room-name'>{roomData.name}</h1>
                            <b>
                                {" "}
                                <p>Max Count : {roomData.maxCount}</p>
                                <p>Phone Number : {roomData.phoneNumber}</p>
                                <p>Type : {roomData.type}</p>
                            </b>
                        </div>
                        <div className='card-button'>
                            {(dateRange?.startDate && dateRange?.endDate) &&
                                <Link to={`/book/${roomData._id}/${dateRange?.startDate}/${dateRange?.endDate}`}>
                                    <Button className='book-now-cta'>Book Now</Button>
                                </Link>
                            }

                            <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{roomData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {displayRoomDetails()}
                    <div>
                        <p>{roomData.description}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Rooms