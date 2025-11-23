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
    <section className='w-full bg-transparent'>
      {success ? (
        <div
          className='flex items-center justify-center'
          style={{ minHeight: "calc(100vh - 404px)" }}
        >
          <h2 className='text-3xl font-light tracking-tight text-black'>
            Message sent.
          </h2>
        </div>
      ) : (
        <div className='mx-auto max-w-xl border border-black/10 bg-white/80 px-6 py-10 backdrop-blur-md md:px-10 md:py-12 shadow-sm'>
          <div className='mb-8 space-y-2 text-center'>
            <p className='text-[10px] uppercase tracking-[0.32em] text-gray-500'>
              Contact
            </p>
            <h2 className='text-3xl font-light tracking-tight text-black'>
              Please feel free to reach out!
            </h2>
          </div>
          <form
            id='contactForm'
            action='#'
            className='space-y-7'
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <div className='space-y-2'>
              <label
                htmlFor='email'
                className='block text-xs uppercase tracking-[0.2em] text-gray-500'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='from_name'
                className='block w-full border-b border-black/20 bg-transparent pb-3 text-base text-black outline-none transition focus:border-black'
                required
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='subject'
                className='block text-xs uppercase tracking-[0.2em] text-gray-500'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='form_subject'
                className='block w-full border-b border-black/20 bg-transparent pb-3 text-base text-black outline-none transition focus:border-black'
                required
              />
            </div>
            <div className='space-y-2'>
              <label
                htmlFor='message'
                className='block text-xs uppercase tracking-[0.2em] text-gray-500'
              >
                Message
              </label>
              <textarea
                id='message'
                rows={5}
                name='form_message'
                className='block w-full border border-black/10 bg-gray-50 p-4 text-base text-black outline-none transition focus:border-black'
                placeholder=''
              ></textarea>
            </div>
            <div className='pt-2 text-center md:text-left'>
              <button
                type='submit'
                className='inline-flex items-center gap-3 rounded-full border border-black bg-black px-6 py-3 text-sm uppercase tracking-[0.22em] text-white transition hover:-translate-y-[2px] hover:bg-black/80'
              >
                Send
                <span className='h-px w-6 bg-white/50' />
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
