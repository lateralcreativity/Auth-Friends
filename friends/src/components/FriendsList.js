import React, { useState, useEffect } from 'react';
import Friend from './Friend';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = () => {
    const initialFormValues = {
        name: '',
        age: '',
        email: '',
        id: ''
    }
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState(initialFormValues);

    const inputHandler = event => {
        setNewFriend({
            ...newFriend,
            [event.target.name]: event.target.value,
            id: Date.now()
        })
    }

    const getFriends = () => {
        axiosWithAuth()
            .get('/api/friends')
            .then(response => {
                setFriends(response.data)
            })
    }

    const submitHandler = event => {
        event.preventDefault();
        axiosWithAuth()
            .post('/api/friends', newFriend)
            .then(response => {
                setFriends(response.data)
                setNewFriend(initialFormValues)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getFriends();
    }, [])

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" name="name" value={newFriend.name} onChange={inputHandler} />
                <input type="text" name="age" value={newFriend.age} onChange={inputHandler} />
                <input type="text" name="email" value={newFriend.email} onChange={inputHandler} />
                <button>Submit</button>
            </form>

            {friends.map(friend => {
                return (
                    <Friend data={friend} key={friend.id} />
                )
            })}
        </>
    )
}

export default FriendsList