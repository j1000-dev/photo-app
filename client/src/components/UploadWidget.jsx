import { useRef, useEffect } from "react";
import axios from "axios";

const UploadWidget = (props) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const { className, favorites, setFavorites, gallery,setGallery } = props;
 
    useEffect(() => {
      let successfulUploads = 0;
      const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        console.warn(`Kindly ensure you have the cloudName and UploadPreset 
        setup in your .env file at the root of your project.`)
      }
      
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset
      }, async function(error, result) {
        if (!error && result && result.event === "success") { 
          successfulUploads += 1;
        }
        //Only reload if we successfully upload and close the widget using 'Done'
        if (!error && result && result.event === "close") { 
          if (successfulUploads > 0) {
            await axios.get('/fetch-gallery-images').then(res => {
              //Dont add a favorites tag to a newly uploaded image
              const updatedImageStates = [...favorites];
              updatedImageStates.unshift(false);
              setGallery(res.data.resources);
              setFavorites(updatedImageStates);
              if (res.data.resources.length === gallery.length) {
                window.location.reload()
              }
            })
          }
        }
      })
    }, [favorites, gallery, setFavorites, setGallery]); //Ensure that the effect runs only when these dependencies change

    return (
      <button className={className} onClick={() => widgetRef.current.open()}>Upload</button>
    )
}

export default UploadWidget