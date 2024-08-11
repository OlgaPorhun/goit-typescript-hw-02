import React from "react";
import { Image } from "../../types";
import styles from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.urls.small}
          alt=""
          className={styles.galleryImage}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
