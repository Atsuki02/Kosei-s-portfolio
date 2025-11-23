import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const ContactSection = () => {
  return (
    <div className='w-full mt-16 flex justify-center items-center gap-8'>
      <a
        href='https://www.instagram.com/koseikitada/'
        className='flex h-14 w-14 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:-translate-y-[2px] hover:border-black hover:bg-black hover:text-white'
      >
        <FontAwesomeIcon icon={faInstagram} style={{ width: '20px', height: '20px' }} />
      </a>
      <a
        href='mailto:kosei.kk.pc@gmail.com'
        className='flex h-14 w-14 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:-translate-y-[2px] hover:border-black hover:bg-black hover:text-white'
      >
        <FontAwesomeIcon icon={faEnvelope} style={{ width: '20px', height: '20px' }} />
      </a>
    </div>
  );
};
