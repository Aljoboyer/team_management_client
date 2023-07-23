import Navbars from './components/navbars'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Notfound from './pages/notfound/notfound';
import Login from './pages/auth/login';
import Home from './pages/shared/home';
import RootLayout from './components/rootLayout'

//SASS
import './styles/Home.css'
import './styles/Login.css'
import Signup from './pages/auth/signup';

function App() {

  return (
    <div className="">
      <Router>

        <Routes>
          <Route path="/" element={<RootLayout><Home /></RootLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
