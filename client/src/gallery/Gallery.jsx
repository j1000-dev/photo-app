import { useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Container, Row } from 'react-bootstrap';
import { Heart } from "../components/icons/Heart";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(()=> {
    axios.get('/fetch-gallery-images').then(res => {
      setGallery(res.data.resources)
    })
  }, [])

  const handleFavoriteClick = (public_id) => {
    console.log("handleFavoriteClick function called");
    try {
      const response = axios.post('/set-image-favorite-tag', { public_id });
      console.log('Post request successful', response.data);
    } catch (error) {
      console.error('Error making post request:', error);
    }
  };
  return (
    <div className="container">
      <div className=" d-flex justify-content-between">
        <div>
          <h3 className="my-4">Gallery</h3>
        </div>
        <div>
          <UploadWidget style={{align: 'left'}} />
        </div>
      </div>
      <div className="main">
        <CloudinaryContext>
          <Container>
            <Row xs="3"> 
              {
                gallery.map((data, i) => {
                  return (
                    <div style={{position: 'relative'}} className="img py-3" key={i}>
                      <Heart 
                        className="position-absolute top-10 cursor-pointer"
                        onClick={() => handleFavoriteClick(data.public_id)}
                      />
                      <Image 
                        publicId={data.public_id} 
                        cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                        width="350"
                        height="250"  
                        alt="an image of something"
                      />            
                    </div>
                  )
                })
              }
            </Row>
          </Container>
        </CloudinaryContext>
      </div>
    </div>
  )
}
export default Gallery