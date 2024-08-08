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
function App() {
  const { authUser } = useSelector(store => store.user);
  return (
    <ChakraProvider>
        <Router>
          {authUser &&
            <Navbar />
          }
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/Register' element={<Register />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/forgetpassword' element={<ForgetPass />} />
            <Route path='/:username' element={<UsersProfile />} />
            <Route path='/loader' element={<Loader />} />
          </Routes>
        </Router>
    </ChakraProvider>
  );
}

export default App;
