import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { CloudinaryImage } from "../components/CloudinaryImage";
import styles from './Albums.module.css';

export function AlbumList() {
  const {folder} = useParams();
  const [gallery, setGallery] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    axios.get('/fetch-album-images', {params: {folder}}).then(res => {
      const initialFavorites = res.data.resources.map((d) => d.tags.includes("favorites"));
      setGallery(res.data.resources);
      setFavorites(initialFavorites);
      setLoading(false);
    })
  }, [folder])

  const handleFavoriteClick = async (public_id, isFavorited, index) => {
    if (isFavorited) {
      await axios.post('/add-favorite-tag', { public_id })
    } else {
      await axios.post('/remove-favorite-tag', { public_id }).then()
    }
    
    // Update the favorited status in the state array
    const updatedImageStates = [...favorites];
    updatedImageStates[index] = isFavorited;
    setFavorites(updatedImageStates);
  };
  
  return (
    <div className={styles.albumsContainer}>
      <div className=" d-flex justify-content-between">
        <div>
          <h3 className={`${styles.title} my-4`}>Album {folder}</h3>
        </div>
        {loading && <h4 className={`${styles.title} my-4`}>Loading Albums...</h4>}
      </div>
      <div className={styles.albumsContent}>
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