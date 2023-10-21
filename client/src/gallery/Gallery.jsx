import { useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from "axios";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(()=> {
    axios.get('/fetch-gallery-images').then(res => {
      console.log(res.data.resources)
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
          <UploadWidget style={{align: 'left'}}/>
        </div>
      </div>
      <div className="main">
        <CloudinaryContext>
          {
            gallery.map(data => {
              return (
                <div className="img">
                  <Image 
                    publicId={data.public_id} 
                    cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}>
                      <Transformation
                        crop="scale"
                        width="300"
                        height="200"
                        dpr="auto"
                      />
                  </Image>
                </div>
              )
            })
          }
        </CloudinaryContext>
      </div>
    </div>
  )
}
export default Gallery