import { motion } from "framer-motion";
import { useMediaQuery } from "../../util/useMediaQuery";
import { useState } from "react";
import {
  slideInFromBottomVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInVariants,
} from "../../util/motion";
import ImageModal from "../common/ImageModal";

function Work({ images }: { images: string[] }) {
  const matches = useMediaQuery("(min-width: 675px)");

  const imagesLength = images.length;
  const halfIndex = Math.ceil(imagesLength / 2);
  const firstColumnImages = images.slice(0, halfIndex);
  const secondColumnImages = images.slice(halfIndex);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const handleEnlargeImage = (imageUrl: string, index: number) => {
    setImageUrl(imageUrl);
    setImageIndex(index);
  };

  const handleCloseModal = () => {
    setImageUrl(null);
    setImageIndex(null);
  };

  return (
    <div className='flex flex-col md:flex-row md:justify-center md:pt-20 md:gap-16 w-full h-full gap-8 overflow-hidden'>
      <div className='flex flex-col gap-8 md:flex-col md:justify-start md:gap-16 cursor-pointer md:w-1/2'>
        {firstColumnImages.map((src: string, index: number) => (
          <motion.div
            className='relative group shadow-xl'
            key={index}
            variants={
              matches
                ? index % 2 === 0
                  ? slideInFromBottomVariants
                  : slideInFromLeftVariants
                : slideInVariants
            }
            initial='hidden'
            whileHover={matches ? { scale: 1.03 } : undefined}
            whileInView='show'
            viewport={{ once: true }}
            onClick={() => handleEnlargeImage(src, index)}
          >
            <img src={src} alt={`Work Image ${index + 1}`} />
            <div
              onClick={() => handleEnlargeImage(src, index)}
              className={`absolute inset-0 transition-opacity duration-300 opacity-0 bg-slate-700 group-hover:opacity-30`}
            ></div>
          </motion.div>
        ))}
      </div>
      <div className='flex flex-col gap-8 md:flex-col md:justify-start md:gap-16 cursor-pointer md:w-1/2'>
        {secondColumnImages.map((src: string, index: number) => (
          <motion.div
            className='relative group shadow-xl'
            key={index}
            variants={
              matches
                ? index % 2 === 1
                  ? slideInFromBottomVariants
                  : slideInFromRightVariants
                : slideInVariants
            }
            initial='hidden'
            whileHover={matches ? { scale: 1.03 } : undefined}
            whileInView='show'
            viewport={{ once: true }}
            onClick={() => handleEnlargeImage(src, index * 2 + 1)}
          >
            <img src={src} alt={`Work Image ${index + 1}`} />
            <div
              onClick={() => handleEnlargeImage(src, index * 2 + 1)}
              className={`absolute inset-0 transition-opacity duration-300 opacity-0 bg-slate-700 group-hover:opacity-30`}
            ></div>
          </motion.div>
        ))}
      </div>

      {imageUrl && (
        <ImageModal
          images={images}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Work;
