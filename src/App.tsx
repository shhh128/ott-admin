import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ContentList from './pages/Content/ContentList';
import ContentAdd from './pages/Content/ContentAdd';
import ContentEdit from './pages/Content/ContentEdit';
import BannerList from './pages/Banner/BannerList';
import ContentRequest from './pages/ContentRequest/ContentRequest';
import Member from './pages/Member/Member';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />  
        <Route path='/login' element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/content' element={<ContentList />} />
          <Route path='/content/new' element={<ContentAdd />} />
          <Route path='/content/:id/edit' element={<ContentEdit />} />
          <Route path='/banner' element={<BannerList />} />
          <Route path='/content-request' element={<ContentRequest />} />
          <Route path='/member' element={<Member />} />
        </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App;