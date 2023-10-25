import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Gallery from "./gallery/Gallery";
import Albums from "./albums/Albums";
import Favorites from './favorites/Favorites';
import SideNavBar from './home/SideNavBar';
import TopNavBar from './home/TopNavBar';

function App() {
  return (
    <div style={{backgroundColor: '#000000'}}>
      <TopNavBar />
      <div style={{display: 'flex'}}>
        <SideNavBar />
        <Routes>
            <Route path="/" element={<Navigate to="/gallery" replace />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
