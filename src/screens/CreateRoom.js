import React from 'react'
import { Input, Col, Row, Select, Button, Rate } from 'antd';
import './CreateRoom.css';

const { TextArea } = Input;

const CreateRoom = ({ roomReqData, onInputChange }) => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" span={24}>
                    <Input placeholder='Name'
                        onChange={(e) => onInputChange(e.target.value, 'name')}
                    />
                </Col>
                <Col className="gutter-row" span={6}>
                    <Input
                        placeholder='Phone number'
                        className='intiger-input'
                        onChange={(e) => onInputChange(e.target.value, 'phoneNumber')}
                    />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Input placeholder='Rent Perday'
                        className='intiger-input'
                        onChange={(e) => onInputChange(e.target.value, 'rentPerDay')}
                    />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Input placeholder='MaxCount'
                        className='intiger-input'
                        onChange={(e) => onInputChange(e.target.value, 'maxCount')}
                    />
                </Col>
                <Col className="gutter-row" span={4}>
                    <Select
                        placeholder="Room type"
                        className='select'
                        options={[
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
                </Col>
                <Col className="gutter-row add-room-rating" span={6}>
                <span>Rating</span>
                <Rate allowHalf />
                </Col>
                <Col className="gutter-row" span={24}>
                    <Input placeholder='First Image Url' 
                    onChange={(e) => onInputChange(e.target.value, 'firstImgUrl')}
                    />
                </Col>
                <Col className="gutter-row" span={24}>
                    <Input placeholder='Second Image Url' 
                    onChange={(e) => onInputChange(e.target.value, 'secondImgUrl')}
                    />
                </Col>
                <Col className="gutter-row" span={24}>
                    <Input placeholder='Third Image Url' 
                    onChange={(e) => onInputChange(e.target.value, 'thirdImgUrl')}
                    />
                </Col>
                <Col className="gutter-row" span={24}>
                    <TextArea
                        placeholder="Description"
                        style={{ height: 120, resize: 'none' }}
                        onChange={(e) => onInputChange(e.target.value, 'description')}
                    />
                </Col>
            </Row>
            <div className='add-room-cta'>
                <Button color="default" variant="solid">Add Room</Button>
            </div>
        </div>
    )
}

export default CreateRoom