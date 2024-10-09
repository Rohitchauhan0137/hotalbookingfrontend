import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Error = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        Something went wrong, please try again later...
      </p>
    </Alert>
  )
}

export default Error