import { useMediaQuery } from "../../library/useMediaQuery";

interface ImageModalProps {
  images: string[];
  imageIndex: number | null;
  setImageIndex: React.Dispatch<React.SetStateAction<number | null>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onClose: () => void;
}

function ImageModal({
  images,
  imageIndex,
  setImageIndex,
  imageUrl,
  setImageUrl,
  onClose,
}: ImageModalProps) {
  const matches = useMediaQuery("(min-width: 675px)");

  const lastimageIndex = images.length - 1;

  const handlePrevImage = () => {
    if (imageIndex && imageIndex > 0) {
      const newIndex = imageIndex - 1;
      setImageUrl(images[newIndex]);
      setImageIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (imageIndex !== null && imageIndex < lastimageIndex) {
      const newIndex = imageIndex + 1;
      setImageUrl(images[newIndex]);
      setImageIndex(newIndex);
    }
  };

  return (
    <div className='fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50'>
      <div className='relative flex items-center justify-center gap-12 box-border h-screen w-screen py-4 px-8 md:py-8'>
        {matches && typeof imageIndex === "number" && imageIndex > 0 && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10 cursor-pointer hover:opacity-60'
            onClick={handlePrevImage}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        )}
        <div className='relative flex justify-center items-center md:h-full'>
          <img
            src={imageUrl}
            alt='Enlarged Image'
            className='max-w-full max-h-full shadow-xl'
          />
          {!matches && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10 absolute cursor-pointer text-slate-600 -bottom-16 left-1/2 -translate-x-1/2'
              onClick={onClose}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          )}
        </div>
        {matches && imageIndex !== lastimageIndex && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10 cursor-pointer hover:opacity-60'
            onClick={handleNextImage}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        )}

        {matches && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8 absolute md:top-4 md:right-10 cursor-pointer hover:opacity-60'
            onClick={onClose}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default ImageModal;
