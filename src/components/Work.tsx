import { motion } from "framer-motion";
import {
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInFromBottomVariants,
  slideInVariants,
} from "../util/motion";
import { useMediaQuery } from "../util/useMediaQuery";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { images } from "../constants/portfolio";

function Work() {
  const matches = useMediaQuery("(min-width: 675px)");

  const halfIndex = Math.ceil(images.length / 2);
  const firstColumnImages = images.slice(0, halfIndex);
  const secondColumnImages = images.slice(halfIndex);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageNumber, setImageNumber] = useState<number | null>(null);

  const handleEnlargeImage = (imageUrl: string, index: number) => {
    setImageUrl(imageUrl);
    setImageNumber(index + 1);
  };

  const handleCloseModal = () => {
    setImageUrl(null);
    setImageNumber(null);
  };

  return (
    <div className='flex flex-col md:flex-row md:justify-center md:pt-20 md:gap-16 w-full h-full gap-8 overflow-hidden'>
      <div className='relative flex flex-col gap-8 md:flex-col md:justify-start md:gap-16 cursor-pointer'>
        {firstColumnImages.map((src, index) => (
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
            whileInView='show'
            viewport={{ once: true }}
            onClick={() => handleEnlargeImage(src, index)}
          >
            <img
              src={`../src/images/work${index + 1}.jpg`}
              alt={`Work Image ${index + 1}`}
            />
            <div
              onClick={() => handleEnlargeImage(src, index)}
              className={`absolute inset-0 transition-opacity duration-300 opacity-0 bg-slate-700 group-hover:opacity-30`}
            ></div>
          </motion.div>
        ))}
      </div>
      <div className='flex flex-col gap-8 md:flex-col md:justify-start md:gap-16 cursor-pointer'>
        {secondColumnImages.map((src, index) => (
          <motion.div
            className='relative shadow-xl group'
            key={index}
            variants={
              matches
                ? index % 2 === 1
                  ? slideInFromBottomVariants
                  : slideInFromRightVariants
                : slideInVariants
            }
            initial='hidden'
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

      {imageUrl && (
        <ImageModal
          imageNumber={imageNumber}
          setImageNumber={setImageNumber}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Work;
