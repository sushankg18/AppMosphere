import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/Register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
