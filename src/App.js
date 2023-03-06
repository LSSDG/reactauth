import { Routes, Route ,BrowserRouter, Navigate} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {useContext} from 'react';
import AuthContext from './store/auth-context';
 

function App() {
  const authCtx=useContext(AuthContext)
  return (
     
    <Layout>
      <Routes>
        <Route path='/' exact element={<HomePage/>}>
           
        </Route>
        <Route path='/auth' element={<AuthPage />}>
           
        </Route>
        {authCtx.isLoggedIn && <Route path='/profile' element={<UserProfile />}/>}
           
         <Route path="*">
          <Navigate to='/'/>    
         </Route>
      </Routes>
    </Layout>  
  );
}

export default App;
