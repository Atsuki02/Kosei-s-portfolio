import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const ContactSection = () => {
  return (
    <div className='w-full h-20 mt-16 flex justify-center items-center gap-10'>
      <a
        href='https://www.instagram.com/koseikitada/'
        className='md:w-8 md:h-8 w-8 h-8 hover:opacity-80'
      >
        <FontAwesomeIcon icon={faInstagram} className='bounce delay-0s' />
      </a>
      <a
        href='mailto:kosei.kk.pc@gmail.com'
        className='md:w-8 md:h-8 w-8 h-8 hover:opacity-80'
      >
        <FontAwesomeIcon icon={faEnvelope} className='bounce delay-2s' />
      </a>
    </div>
  );
};
