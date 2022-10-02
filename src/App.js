import React from 'react';
import './styles/main.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import { Auth } from './pages/Auth/Auth.jsx'

function App() {

    return (
      <div className='app'>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/main' element={<MainPage />} />
          </Routes>
      </div>
    );
}

export default App;