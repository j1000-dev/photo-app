import {useEffect, useState} from "react";
import axios from "axios";
import { CloudinaryImage } from "../components/CloudinaryImage"
import styles from './Favorites.module.css';

function Favorites() {
  const [gallery, setGallery] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteImages = async () => {
    try {
      const res = await axios.get('/fetch-favorite-images');
      const initialFavorites = res.data.resources.map(() => true);
      setFavorites(initialFavorites);
      setGallery(res.data.resources);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorite images:', error);
    }
  };
  
  useEffect(() => {
    fetchFavoriteImages();
  }, []);
  
  const handleFavoriteClick = async (public_id, isFavorited, index) => {
    try {
      await axios.post('/remove-favorite-tag', { public_id });
    
      // Fetch the updated list of favorite images
      const updatedFavorites = favorites.filter((item, idx) => idx !== index);
      const updatedGallery = gallery.filter((item, idx) => idx !== index);
  
      setFavorites(updatedFavorites);
      setGallery(updatedGallery);
    } catch (error) {
      console.error('Error handling favorite click:', error);
    }
  };
  
  return (
    <div className={styles.galleryContainer}>
    <div className="d-flex align-items-center">
      <div>
        <h3 className={`${styles.title} my-4`}>Favorite Images</h3>
      </div>
      {loading && (
        <div className="d-flex align-items-center flex-grow-1 justify-content-center">
          <h4 className={`${styles.title} my-4`}>Loading Favorite Images...</h4>
        </div>
      )}
    </div>
    <div className={styles.galleryContent}>
      <div className="container">
        <div className="row">
          {gallery.map((data, i) => (
            <div className="col-12 col-sm-6 col-md-4 py-3" key={i}>
              <div className="img-container position-relative">
                <CloudinaryImage 
                  imageData={data}
                  index={i}
                  favorites={favorites}
                  onClick={handleFavoriteClick}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
export default Favorites