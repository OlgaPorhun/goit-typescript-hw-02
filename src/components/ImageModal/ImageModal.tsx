import React from "react";
import { Image } from "../../types";
import styles from "./ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  if (!isOpen || !image) return null;

  return (
    <div className={styles.modalOverlay} onClick={onRequestClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          &times;
        </button>
        <div className={styles.modalNavigation}>
          {hasPrev && (
            <button onClick={onPrev} className={styles.navButton}>
              ←
            </button>
          )}
          <img src={image.urls.full} alt="" className={styles.modalImage} />
          {hasNext && (
            <button onClick={onNext} className={styles.navButton}>
              →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
