import { motion } from "framer-motion";
import { useMediaQuery } from "../../library/useMediaQuery";
import { useState } from "react";
import {
  slideInFromBottomVariants,
  slideInFromLeftVariants,
  slideInFromRightVariants,
  slideInVariants,
} from "../../library/motion";
import ImageModal from "../common/ImageModal";

function Work({ images }: { images: string[] }) {
  const matches = useMediaQuery("(min-width: 675px)");
  const formatIndex = (value: number) =>
    `Frame ${String(value + 1).padStart(2, "0")}`;

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
    <div className='w-full h-full overflow-hidden'>
      <div className='mx-auto max-w-7xl px-2 pb-10 md:px-4 md:pb-16'>
        <div className='flex flex-col md:flex-row md:justify-center md:gap-16 gap-10 md:pt-10'>
          <div className='flex flex-col gap-8 md:gap-12 cursor-pointer md:w-1/2'>
            {firstColumnImages.map((src: string, index: number) => {
              const globalIndex = index;
              const altIndex = globalIndex + 1;
              return (
                <motion.figure
                  className='relative group overflow-hidden bg-[#111] shadow-[0_20px_70px_-60px_rgba(255,255,255,0.1)] cursor-none'
                  key={globalIndex}
                  variants={
                    matches
                      ? globalIndex % 2 === 0
                        ? slideInFromBottomVariants
                        : slideInFromLeftVariants
                      : slideInVariants
                  }
                  initial='hidden'
                  whileHover={matches ? { scale: 1.01 } : undefined}
                  whileInView='show'
                  viewport={{ once: true }}
                  onClick={() => handleEnlargeImage(src, globalIndex)}
                >
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100' />
                  <div className='absolute inset-x-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white mix-blend-difference'>
                    <span className='rounded-full border border-white/20 bg-black/20 px-3 py-1 backdrop-blur-sm'>
                      {formatIndex(index)}
                    </span>
                    <span className='hidden items-center gap-2 text-white/70 transition duration-300 group-hover:flex'>
                      Open
                      <span className='h-px w-6 bg-white/60' />
                    </span>
                  </div>
                  <img
                    src={src}
                    alt={`Work Image ${altIndex}`}
                    className='w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-90'
                  />
                </motion.figure>
              );
            })}
          </div>
          <div className='flex flex-col gap-8 md:gap-12 cursor-pointer md:w-1/2'>
            {secondColumnImages.map((src: string, index: number) => {
              const globalIndex = index + halfIndex;
              const altIndex = globalIndex + 1;
              return (
                <motion.figure
                  className='relative group overflow-hidden bg-[#111] shadow-[0_20px_70px_-60px_rgba(255,255,255,0.1)] cursor-none'
                  key={globalIndex}
                  variants={
                    matches
                      ? globalIndex % 2 === 1
                        ? slideInFromBottomVariants
                        : slideInFromRightVariants
                      : slideInVariants
                  }
                  initial='hidden'
                  whileHover={matches ? { scale: 1.01 } : undefined}
                  whileInView='show'
                  viewport={{ once: true }}
                  onClick={() => handleEnlargeImage(src, globalIndex)}
                >
                  {/*
                  second column uses offset index for global numbering; figure overlay matches first column
                */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100' />
                  <div className='absolute inset-x-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-white mix-blend-difference'>
                    <span className='rounded-full border border-white/20 bg-black/20 px-3 py-1 backdrop-blur-sm'>
                      {formatIndex(globalIndex)}
                    </span>
                    <span className='hidden items-center gap-2 text-white/70 transition duration-300 group-hover:flex'>
                      Open
                      <span className='h-px w-6 bg-white/60' />
                    </span>
                  </div>
                  <img
                    src={src}
                    alt={`Work Image ${altIndex}`}
                    className='w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-90'
                  />
                </motion.figure>
              );
            })}
          </div>
        </div>
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
