import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from './components/Sidebar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Database from './components/Database';
import CreateMentor from './components/CreateMentor';
import CreateStudent from './components/CreateStudent';
import AssignMentor from './components/AssignMentor';
import ChangeMentor from './components/ChangeMentor'
import ViewStudent from './components/ViewStudent';
import './sidebar.css'

function App() {
  return <div>
    <BrowserRouter>
      <Sidebar></Sidebar>
      <Routes>
      <Route index path = "/" element={<Database/>} />
      <Route path = "creatementor" element={<CreateMentor/>} />
      <Route path = "createstudent" element={<CreateStudent/>} />
      <Route path = "assignmentor" element={<AssignMentor/>} />
      <Route path = "changementor/:id" element={<ChangeMentor/>} />
      <Route path = "viewstudent/:id" element={<ViewStudent/>} />
      </Routes>
      </BrowserRouter>
</div>
}

export default App
