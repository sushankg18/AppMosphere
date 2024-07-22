import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import ForgetPass from './screens/ForgetPassw.jsx'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/Register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/forgetpassword' element={<ForgetPass />}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
