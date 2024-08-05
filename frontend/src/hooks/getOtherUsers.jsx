import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'

const GetOtherUsers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true
        const response = await axios.get("http://localhost:8080/api/v1/user/users")
        console.log("Other users : ",response.data.otherUsers)
        dispatch(setOtherUsers(response.data.otherUsers))
      } catch (error) {
        console.log("Error while fetching otherUsers : ", error)
      }
    };
    fetchOtherUsers();
  }, [])
}

export default GetOtherUsers
