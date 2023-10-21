import { useEffect, useState } from "react";
import UploadWidget from "../components/UploadWidget";
import { CloudinaryContext } from 'cloudinary-react';
import axios from "axios";

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(()=> {
    
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

      </div>
    </div>
  )
}
export default Gallery