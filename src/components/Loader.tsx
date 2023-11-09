export function Loader({ size = "lg" }) {
  return (
    <>
      {size === "lg" ? (
        <div className='flex items-center justify-center'>
          <div className='grid gap-2'>
            <div className='flex items-center justify-center space-x-4 animate-pulse'>
              <div className='dot dot-large'></div>
              <div className='dot dot-large'></div>
              <div className='dot dot-large'></div>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid gap-2'>
          <div className='flex items-center justify-center space-x-2 animate-pulse'>
            <div className='dot dot-small'></div>
            <div className='dot dot-small'></div>
            <div className='dot dot-small'></div>
          </div>
        </div>
      )}
    </>
  );
}
