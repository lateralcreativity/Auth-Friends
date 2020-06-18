import React from 'react';

const Friend = ({ data }) => {
    return (
        <div>
            <p>{data.name}</p>
            <p>{data.age}</p>
            <p>{data.email}</p>
        </div>
    )
}

export default Friend