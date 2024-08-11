import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import { Image } from "./types";

const ACCESS_KEY = "Bh7-pBHEGMq9gOxGIRpWSN21CtNDohx5ywUnBlnx3Xw";

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    if (query === "") return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              per_page: 12,
              client_id: ACCESS_KEY,
            },
          }
        );

        if (response.data.results.length === 0) {
          setError(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        } else {
          setImages((prevImages) => {
            const newImages = [...prevImages, ...response.data.results];
            setHasMore(response.data.results.length === 12);
            return newImages;
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        toast.error("Failed to fetch images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setHasMore(false);
    setError(null);
  };

  const loadMoreImages = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (index: number): void => {
    setSelectedImageIndex(index);
  };

  const closeModal = (): void => {
    setSelectedImageIndex(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error &&
        (error ===
        "Sorry, there are no images matching your search query. Please try again!" ? (
          <div className={styles.noResultsMessage}>{error}</div>
        ) : (
          <ErrorMessage message={error} />
        ))}
      {!error && (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {isLoading && <Loader />}
          {hasMore && !isLoading && <LoadMoreBtn onClick={loadMoreImages} />}
        </>
      )}
      {selectedImageIndex !== null && (
        <ImageModal
          isOpen={selectedImageIndex !== null}
          onRequestClose={closeModal}
          image={images[selectedImageIndex]}
          onNext={() =>
            setSelectedImageIndex((prevIndex) =>
              prevIndex !== null && prevIndex < images.length - 1
                ? prevIndex + 1
                : prevIndex
            )
          }
          onPrev={() =>
            setSelectedImageIndex((prevIndex) =>
              prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : prevIndex
            )
          }
          hasNext={
            selectedImageIndex !== null &&
            selectedImageIndex < images.length - 1
          }
          hasPrev={selectedImageIndex !== null && selectedImageIndex > 0}
        />
      )}
    </div>
  );
};

export default App;
