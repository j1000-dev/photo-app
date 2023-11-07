import { useEffect, useState } from "react";
import axios from "axios";
import UploadWidget from "../components/UploadWidget";
import { SearchForm } from "./SearchForm";
import { CloudinaryImage } from "../components/CloudinaryImage";
import styles from './Gallery.module.css';
import { useSearchParams } from 'react-router-dom';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(()=> {
    let search = searchParams.get('search')
    axios.get('/fetch-gallery-images', {
      params: {
        search: search ? search : ''
      }
    }).then(res => {
      const initialFavorites = res.data.resources.map((d) => d.tags.includes("favorites"));
      setGallery(res.data.resources);
      setFavorites(initialFavorites);
      setLoading(false);
    })
  }, [searchParams])

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
    <div className={styles.galleryContainer}>
      <div className=" d-flex justify-content-between">
        <div>
          <h3 className={`${styles.title} my-4`}>Gallery</h3>
        </div>
        {loading && <h4 className={`${styles.title} my-4`}>Loading Images...</h4>}
        <div>
          <UploadWidget 
            gallery={gallery}
            setGallery={setGallery} 
            favorites={favorites}
            setFavorites={setFavorites}
            className={`btn btn-secondary my-4 ${styles.uploadBtn}`} 
          />
        </div>
      </div>
      <SearchForm />
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
export default Gallery