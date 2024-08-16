import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import ForgetPass from './screens/ForgetPassw.jsx'
import UsersProfile from './screens/UsersProfile.jsx'
import Navbar from './components/Navbar.jsx'
import Loader from './components/Loader.jsx'
import { useSelector } from 'react-redux'
import UserSettingModal from './screens/UserSettingModal.jsx'
import DeleteUserAccounts from './screens/DeleteUserAccounts.jsx'
import PageNotFound from './screens/PageNotFound.jsx'
import Reels from './screens/Reels.jsx'
function App() {
  const { authUser } = useSelector(store => store.user);
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
