import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from './Edit.module.css';
import { Image, Transformation } from 'cloudinary-react';
import { Button } from "react-bootstrap";

export function Edit() {
  const [searchParams] = useSearchParams();
  const [transformation, setTransformation] = useState("");
  const [prompt, setPrompt] = useState("");
  const [pendingPrompt, setPendingPrompt] = useState("");

  return (
    <div className={styles.albumsContainer}>
    <div className="container">
      <div>
        <h3 className={`${styles.title} my-4`}>Edit {searchParams.get('publicId')}</h3>
      </div>
      <div className="d-flex my-3">
        <Button className="me-2" variant="dark" onClick={() => setTransformation('')}>Clear All</Button>
        <Button 
          className="me-2" 
          variant="secondary"
          onClick={() => {
            setTransformation('generative-fill');
            setPrompt(pendingPrompt)
          }}>
            Apply Generative Fill
        </Button>
        <Button className="me-2" variant="secondary"onClick={() => setTransformation('blur')}>Apply blur</Button>
        <Button className="me-2" variant="secondary"onClick={() => setTransformation('gray')}>Convert to gray</Button>
        <Button className="me-2" variant="secondary"onClick={() => setTransformation('pixelate')}>Pixelate</Button>
      </div>
      <div className="my-3">
      <label htmlFor="prompt" className="text-light me-3">Prompt</label>
          <input id="prompt" value={pendingPrompt} onChange={(e) => setPendingPrompt(e.target.value)}/>
      </div>
      <div className="d-flex justify-content-between">
        <div className="mx-5">
          <Image
            publicId={searchParams.get('publicId')}
            cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            className="img-fluid"
            alt="an image of something"
          />
        </div>
        {
          transformation === 'generative-fill' &&
          <div className="mx-5">
            <Image 
              publicId={searchParams.get('publicId')}
              cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              className="img-fluid"
              alt="an image of something"
            >
              <Transformation aspectRatio="16:9" background={`gen_fill:${prompt}`} crop="pad" />
            </Image>
          </div>
        }
        {
          transformation === 'blur' &&
          <div className="mx-5">
            <Image 
              publicId={searchParams.get('publicId')}
              cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              className="img-fluid"
              alt="an image of something"
            >
        	<Transformation effect="blur:800" />
            </Image>
          </div>
        }
        {
          transformation === 'gray' &&
          <div className="mx-5">
            <Image 
              publicId={searchParams.get('publicId')}
              cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              className="img-fluid"
              alt="an image of something"
            >
     	        <Transformation effect="grayscale" />
            </Image>
          </div>
        }
        {
          transformation === 'pixelate' &&
          <div className="mx-5">
            <Image 
              publicId={searchParams.get('publicId')}
              cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
              className="img-fluid"
              alt="an image of something"
            >
     	        <Transformation effect="pixelate:10" />
            </Image>
          </div>
        }
      </div>
    </div>
    </div>
  )
}