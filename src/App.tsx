import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Notfound from './pages/notfound/notfound';
import Login from './pages/auth/login';
import Home from './pages/shared/home';
import RootLayout from './components/rootLayout'
import Signup from './pages/auth/signup';
import TeamDetailsDashboard from './pages/shared/teamDetailsDashboard';
import TeamCreate from './pages/admin/teamCreate';
import TeamsDashboard from './pages/shared/teamsDashboard';
import AddMember from './pages/admin/addMember';
import InvitationView from './pages/user/invitationView';

//SASS
import './styles/Home.css'
import './styles/Login.css'
import './styles/TeamDetails.css'
import './styles/createTeam.css'
import './styles/Addmember.css'

//sweet alert
import 'sweetalert2/src/sweetalert2.scss'


function App() {

  return (
    <div className="">
      <Router>

        <Routes>
          <Route path="/" element={<RootLayout><Home /></RootLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/teamDetailsDashboard/:id" element={<RootLayout><TeamDetailsDashboard /></RootLayout>} />
          <Route path="/teamCreate" element={<RootLayout><TeamCreate /></RootLayout>} />
          <Route path="/teamsDashboard" element={<RootLayout><TeamsDashboard /></RootLayout>} />
          <Route path="/addMember/:id" element={<RootLayout><AddMember /></RootLayout>} />
          <Route path="/InvitationView" element={<RootLayout><InvitationView /></RootLayout>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
