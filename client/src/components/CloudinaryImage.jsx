import { Image } from 'cloudinary-react';
import { Heart } from "../components/icons/Heart";
import { FullHeart } from "../components/icons/FullHeart";
import { AddToAlbum } from "../components/AddToAlbum";
import styles from "./styling/CloudinaryImage.module.css";

export function CloudinaryImage(props) {
  const { imageData, onClick, index, favorites } = props;
  const isFavorited = favorites[index];

  return (
    <>
      {
        isFavorited ? 
        <FullHeart 
          className={`position-absolute ${styles.fullHeart}`}
          onClick={() => onClick(imageData.public_id, false, index)}
        /> :
        <Heart
          className={`position-absolute ${styles.heart}`}
          onClick={() => onClick(imageData.public_id, true, index)}
        />
      }
      <Image
        publicId={imageData.public_id}
        cloud_name={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        className="img-fluid"
        alt="an image of something"
      />
      <AddToAlbum
        imageData={imageData}
        className={`position-absolute ${styles.menuIcon}`}
      />
    </>
  )
}