import { useRef, useEffect } from "react";

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
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
      }, function(err, results) {
        console.log(results)
      })
    }, [])

    return (
      <button className="btn btn-primary my-4" onClick={() => widgetRef.current.open()}>Upload</button>
    )
}

export default UploadWidget