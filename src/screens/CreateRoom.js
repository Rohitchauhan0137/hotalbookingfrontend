import React from 'react'
import { Input, Col, Row, Select, Button, Form, Rate } from 'antd';
import './CreateRoom.css';

const { TextArea } = Input;

const CreateRoom = ({ roomReqData, onInputChange, setRoomReqData, onRoomCreate }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        onRoomCreate(values)
    };

    return (
        <div>
            <Form
                form={form}
                name="Add Room"
                onFinish={onFinish}
                scrollToFirstError
                layout="vertical"
            >
                <Row gutter={[16]}>
                    <Col className="gutter-row" span={18}>
                        <Form.Item
                            name="name"
                            label="Room Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input room Name',
                                },
                            ]}
                        >
                            <Input placeholder='Name'
                                value={roomReqData.name}
                                onChange={(e) => onInputChange(e.target.value, 'name')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            name="type"
                            label="Room Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select any room type',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Room type"
                                className='select'
                                value={roomReqData.type}
                                onSelect={(value) => setRoomReqData({ ...roomReqData, type: value })}
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
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input phone number',
                                },
                            ]}
                        >
                            <Input
                                placeholder='Phone number'
                                className='intiger-input'
                                value={roomReqData.phoneNumber}
                                onChange={(e) => onInputChange(e.target.value, 'phoneNumber')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            name="rentPerDay"
                            label="Rent PerDay"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input rent per day',
                                },
                            ]}
                        >
                            <Input
                                placeholder='Rent PerDay'
                                className='intiger-input'
                                value={roomReqData.rentPerDay}
                                onChange={(e) => onInputChange(e.target.value, 'rentPerDay')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            name="maxCount"
                            label="MaxCount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input max Count',
                                },
                            ]}
                        >
                            <Input
                                placeholder='Max Count'
                                className='intiger-input'
                                value={roomReqData.maxCount}
                                onChange={(e) => onInputChange(e.target.value, 'maxCount')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please rate room',
                                },
                            ]}
                        >
                            <Rate
                                allowHalf
                                value={roomReqData.rating}
                                onChange={(value) => setRoomReqData({ ...roomReqData, rating: value })} />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name="firstImgUrl"
                            label="First Image Url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input first Image Url',
                                },
                            ]}
                        >
                            <Input placeholder='First Image Url'
                                value={roomReqData.imageUrls[0]}
                                onChange={(e) => onInputChange(e.target.value, 'firstImgUrl')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Form.Item
                            name="secondImgUrl"
                            label="Second Image Url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input second image url',
                                },
                            ]}
                        >
                            <Input placeholder='Second Image Url'
                                value={roomReqData.imageUrls[1]}
                                onChange={(e) => onInputChange(e.target.value, 'secondImgUrl')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Form.Item
                            name="thirdImgUrl"
                            label="Third Image Url"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input third image url',
                                },
                            ]}
                        >
                            <Input placeholder='Third Image Url'
                                value={roomReqData.imageUrls[2]}
                                onChange={(e) => onInputChange(e.target.value, 'thirdImgUrl')}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Form.Item
                            name="description"
                            label="Room description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input room description',
                                },
                            ]}
                        >
                            <TextArea
                                placeholder="Description"
                                style={{ height: 120, resize: 'none' }}
                                value={roomReqData.description}
                                onChange={(e) => onInputChange(e.target.value, 'description')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item >
                    <Button color="default" variant="solid" htmlType="submit">
                        Add Room
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateRoom