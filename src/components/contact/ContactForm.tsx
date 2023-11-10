import emailjs from "emailjs-com";
import { useState } from "react";

export const ContactForm = () => {
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    await emailjs
      .sendForm(
        import.meta.env.PUBLIC_SERVICE_ID,
        import.meta.env.PUBLIC_TEMPLATE_ID,
        form,
        import.meta.env.PUBLIC_USER_ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setSuccess(true);
        },
        (error) => {
          console.log("Failed to send email.", error.text);
        }
      );
  };

  return (
    <section className='bg-white'>
      {success ? (
        <div
          className=' flex items-center justify-center'
          style={{ minHeight: "calc(100vh - 404px)" }}
        >
          <h2 className='mb-8 text-4xl tracking-tight font-extrabold text-center text-gray-900'>
            Thank you for your message!
          </h2>
        </div>
      ) : (
        <div className='mx-auto max-w-screen-md'>
          <h2 className='mb-8 text-4xl tracking-tight font-extrabold text-center text-gray-900'>
            Contact Me
          </h2>
          <p className='mb-8 md:mb-16 font-light text-center text-gray-500 sm:text-xl'>
            If you are interested in my skills or portfolio, please feel free to
            reach out!
          </p>
          <form
            id='contactForm'
            action='#'
            className='space-y-8'
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Your email
              </label>
              <input
                type='email'
                id='email'
                name='from_name'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                placeholder=''
                required
              />
            </div>
            <div>
              <label
                htmlFor='subject'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='form_subject'
                className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500'
                placeholder=''
                required
              />
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Your message
              </label>
              <textarea
                id='message'
                rows={6}
                name='form_message'
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500'
                placeholder='Leave a comment...'
              ></textarea>
            </div>
            <div className='text-center md:text-left pt-4'>
              <button
                type='submit'
                className='py-3 px-5 text-sm font-medium text-center text-white rounded-md bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
