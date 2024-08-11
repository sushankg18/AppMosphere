import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

export const useGetMessages = () => {

    const { authUser, selectedUser } = useSelector(store => store.user)
    console.log(authUser?._id);
    console.log(selectedUser?._id);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/message/${authUser?._id}/${selectedUser?._id}`)
                console.log(response.data)
                // dispatch(setMessages(response))
            }
            catch (error) {
                console.log("Error while fetching messages through frontend : ", error)
            }
        }
        // fetchMessages();
    }, [])

}

export default useGetMessages;