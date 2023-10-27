function Work() {
  const images = [
    "../public/work13.jpg",
    "../public/work1.jpg",
    "../public/work12.jpg",
    "../public/work3.jpg",
    "../public/work4.jpg",
    "../public/work8.jpg",
    "../public/work12.jpg",
    "../public/work6.jpg",
    "../public/work1.jpg",
    "../public/work4.jpg",
    "../public/work7.jpg",
    "../public/work4.jpg",
    "../public/work9.jpg",
    "../public/work12.jpg",
    "../public/work6.jpg",
    "../public/work1.jpg",
    "../public/work4.jpg",
    "../public/work7.jpg",
    "../public/work4.jpg",
    "../public/work9.jpg",
  ];

  const halfIndex = Math.ceil(images.length / 2);
  const firstColumnImages = images.slice(0, halfIndex);
  const secondColumnImages = images.slice(halfIndex);

  return (
    <div className='flex flex-col md:flex-row md:justify-center md:pt-20 md:gap-16 w-full gap-8'>
      <div className='flex flex-col gap-8 md:flex-col md:justify-start md:gap-16'>
        {firstColumnImages.map((src, index) => (
          <img
            src={src}
            key={index}
            alt={`Work Image ${index + 1}`}
            className=' hover:opacity-80'
          />
        ))}
      </div>
      <div className='flex flex-col gap-8 md:flex-col md:justify-start md:gap-16'>
        {secondColumnImages.map((src, index) => (
          <img src={src} key={index} alt={`Work Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default Work;
