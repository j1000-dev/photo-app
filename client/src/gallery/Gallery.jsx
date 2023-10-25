import { useEffect, useState } from "react";
import axios from "axios";
import UploadWidget from "../components/UploadWidget";
import { Image } from 'cloudinary-react';
import { Heart } from "../components/icons/Heart";
import AlertDismissable from "../components/AlertDismissable";
import styles from './Gallery.module.css';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(()=> {
    axios.get('/fetch-gallery-images').then(res => {
      setGallery(res.data.resources)
    })
  }, [])

  const handleFavoriteClick = (public_id) => {
    axios.post('/set-image-favorite-tag', { public_id }).then((res) => {
      setAlert(<AlertDismissable variant='primary' message={res.data.message} />);
    }).catch((error) => {
      setAlert(<AlertDismissable variant='danger' message={error.response.data.message} />);
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  
  return (
    <div className={styles.galleryContainer}>
      <div className=" d-flex justify-content-between">
        <div>
          <h3 className={`${styles.title} title my-4`}>Gallery</h3>
        </div>
        <div>
          <UploadWidget style={{align: 'left'}} />
        </div>
      </div>
      <div className={styles.galleryContent}>
        {alert}
        <div className="container">
          <div className="row">
            {gallery.map((data, i) => (
              <div className="col-12 col-sm-6 col-md-4 py-3" key={i}>
                <div className="img-container position-relative">
                  <Heart
                    className="position-absolute"
                    style={{
                      top: '10px',
                      left: '10px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleFavoriteClick(data.public_id)}
                  />
                  <Image
                    publicId={data.public_id}
                    cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                    className="img-fluid"
                    alt="an image of something"
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