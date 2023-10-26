import { useRef, useEffect } from "react";

const UploadWidget = (props) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const { className } = props;

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
      }, function(error, result) {
        if (!error && result && result.event === "success") { 
          successfulUploads += 1;
        }
        //Only reload if we successfully upload and close the widget using 'Done'
        if (!error && result && result.event === "close") { 
          if (successfulUploads > 0) {
            window.location.reload()
          }
        }
      })
    }, [])

    return (
      <button className={className} onClick={() => widgetRef.current.open()}>Upload</button>
    )
}

export default UploadWidget