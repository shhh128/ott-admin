import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import ContentList from './pages/Content/ContentList';
import ContentAdd from './pages/Content/ContentAdd';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* 완성 후 첫 페이지 로그인으로 바꿀 때 */}
        {/* <Route index element={<Navigate to="/login" replace />} /> */}  
        <Route path='/login' element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/content' element={<ContentList />} />
          <Route path='/content/new' element={<ContentAdd />} />
        </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App;