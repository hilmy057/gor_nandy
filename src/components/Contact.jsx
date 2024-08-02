import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Kontak <span className="text-green-500">Kami</span></h1>
      <p className="text-gray-600 mb-8">Hubungi kami jika ada saran yang ingin di sampaikan</p>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Map Section */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65638779785!2d107.02311644562902!3d-6.3039139783670815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699b2918f7fedd%3A0x1c58797d68859e2e!2sKarawang%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1658148948159!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <form className="space-y-4">
            <div className="flex items-center bg-gray-100 p-2 rounded">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <input type="text" placeholder="nama" className="bg-transparent w-full focus:outline-none" />
            </div>
            <div className="flex items-center bg-gray-100 p-2 rounded">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <input type="email" placeholder="email" className="bg-transparent w-full focus:outline-none" />
            </div>
            <div className="flex items-center bg-gray-100 p-2 rounded">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <input type="tel" placeholder="no telp" className="bg-transparent w-full focus:outline-none" />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;