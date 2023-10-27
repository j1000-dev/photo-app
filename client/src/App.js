import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';

import Gallery from "./gallery/Gallery";
import Albums from "./albums/Albums";
import Favorites from './favorites/Favorites';
import SideNavBar from './home/SideNavBar';
import TopNavBar from './home/TopNavBar';
import Loader from "./components/utils/Loader";

function App() {
  const { isAuthenticated, user, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect(); // Redirect the user to the login page
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    isAuthenticated && (
      <div style={{backgroundColor: '#000000'}}>
        <TopNavBar user={user}/>
        <div style={{display: 'flex'}}>
          <SideNavBar />
          <Routes>
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={<Navigate to="/gallery" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>)
  );
}

export default App;
