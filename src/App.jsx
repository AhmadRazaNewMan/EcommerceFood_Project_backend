// import 'antd/dist/ant.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Register from './pages/Register';
import BillsPage from './pages/BillsPage';
import Customer from './pages/Customer';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <protectedRoute>
          <HomePage />
          </protectedRoute>
          } />
          <Route path='/items' element={
                <protectedRoute>
          <ItemPage />
          </protectedRoute>
          } />
          <Route path='/cart' element={
             <protectedRoute>
          <CartPage />
          </protectedRoute>
          
          } />
          <Route path='/bills' element={
             <protectedRoute>
          <BillsPage/>
          </protectedRoute>
          
          } />
          <Route path='/customer' element={
             <protectedRoute>
          <Customer/>
          </protectedRoute>
          
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function protectedRoute({children}){
  if(localStorage.get('auth')){
    return children
  }
  else{
    return <Navigate to ="/login"/>
  }
}
