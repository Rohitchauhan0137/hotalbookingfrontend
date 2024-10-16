import { Tag, Rate } from 'antd';

export const bookingColumns = [
    {
        title: 'Booking ID',
        dataIndex: '_id',
    },
    {
        title: 'Room Name',
        dataIndex: 'roomName',
    },
    {
        title: 'User ID',
        dataIndex: 'userId',
    },
    {
        title: 'From',
        dataIndex: 'fromDate',
    },
    {
        title: 'To',
        dataIndex: 'toDate',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status) => <Tag color={status === 'Confirmed' ? "green" : "red"}>{status}</Tag>
    },
];

export const roomsColumns = [
    {
        title: 'Room ID',
        dataIndex: '_id',
    },
    {
        title: 'Room Name',
        dataIndex: 'name',
    },
    {
        title: 'Room Type',
        dataIndex: 'type',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        render: (data) => <Rate allowHalf disabled value={data} />
    },
    {
        title: 'Rent PerDay',
        dataIndex: 'rentPerDay',
    },
]

export const usersColumns = [
    {
        title: 'User ID',
        dataIndex: '_id',
    },
    {
        title: 'User Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Is Admin',
        dataIndex: 'isAdmin',
        render: (item) => <div>{item ? 'YES' : 'NO'}</div>
    },
]