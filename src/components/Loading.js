import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

const override = {
    display: "block",
    margin: "50px auto",
    borderColor: "red",
};

const Loading = () => {
    let [loading, setLoading] = useState(true);

    return (
        <HashLoader
            color={'#000'}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Loading