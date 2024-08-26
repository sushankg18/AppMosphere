import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import ForgetPass from './screens/ForgetPassw.jsx'
import UsersProfile from './screens/UsersProfile.jsx'
import Navbar from './components/Navbar.jsx'
import { useDispatch, useSelector } from 'react-redux'
import UserSettingModal from './screens/UserSettingModal.jsx'
import DeleteUserAccounts from './screens/DeleteUserAccounts.jsx'
import PageNotFound from './screens/PageNotFound.jsx'
import Reels from './screens/Reels.jsx'
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import { useEffect } from 'react'
import io from 'socket.io-client'
function App() {
  const dispatch = useDispatch()
  const { authUser } = useSelector(store => store.user);

  const { socket } = useSelector(store => store.socket)
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8080', {
        withCredentials: true,
        query: {
          userId: authUser.id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => socket.close()
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null))
      }
    }
  }, [authUser])
  return (
    <ChakraProvider>
      <Router>
        {authUser &&
          <Navbar />
        }
        <Routes>
          <Route exact path='/user/Register' element={<Register />} />
          <Route exact path='/user/login' element={<Login />} />
          <Route exact path='/user/forgetpassword' element={<ForgetPass />} />
          <Route exact path='*' element={<PageNotFound />} />
          {
            authUser &&
            <>
              <Route path='/' element={<Home />} />
              <Route path='/:username' element={<UsersProfile />} />
              <Route path='/:username/setting' element={<UserSettingModal />} />
              <Route path='/:username/account-delete' element={<DeleteUserAccounts />} />
              <Route path='/reels' element={<Reels />} />
            </>
          }
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
