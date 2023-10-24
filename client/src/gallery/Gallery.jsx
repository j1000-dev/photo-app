import { useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { Container, Row } from 'react-bootstrap';
import axios from "axios";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(()=> {
    axios.get('/fetch-gallery-images').then(res => {
      setGallery(res.data.resources)
    })
  }, [])

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
                    <div className="img py-3" key={i}>
                      <Image 
                        publicId={data.public_id} 
                        cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                        width="400"
                        height="300"  
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