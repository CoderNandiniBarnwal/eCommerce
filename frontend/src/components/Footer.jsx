import React from "react";

function Footer() {
  return (
    <div className="mt-8">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      {/* Footer Section */}
      <footer className="relative bg-gray-900 text-white pt-16 pb-8">
        {/* Wave SVG background */}
        <div
          className="absolute -top-12 left-0 w-full h-12"
          style={{
            backgroundImage: 'url("data:image/svg+xml',
            backgroundSize: "cover",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 relative z-10">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Brand Name Or Logo
            </h2>
            <p className="mb-4 leading-relaxed opacity-90">
              Your premier destination for creative expression and professional
              production in the heart of Lucknow. We provide fully-equipped
              spaces for artists, creators, and businesses.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 hover:bg-yellow-400"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 hover:bg-yellow-400"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 hover:bg-yellow-400"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 flex items-center justify-center rounded-full text-white transition-transform hover:-translate-y-1 hover:bg-yellow-400"
              >
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> About
                  Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" />{" "}
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> Gallery
                </a>
              </li>
            </ul>
          </div>
          {/* Our Services */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" />{" "}
                  Recording Studio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> Theatre
                  Room
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" />{" "}
                  Workshop Space
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" />{" "}
                  Photoshoot Studio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                >
                  <i className="fas fa-chevron-right text-yellow-400" /> Event
                  Hosting
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h3 className="text-xl text-yellow-400 mb-6 border-b-2 border-yellow-400 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt text-yellow-400 mt-1" />
                <div>India</div>
              </li>
              <li className="flex items-start gap-4">
                <i className="fas fa-phone-alt text-yellow-400 mt-1" />
                <div>
                  <a
                    href="tel:+91987654321"
                    className="block hover:underline opacity-90 hover:opacity-100"
                  >
                    +91 7307022824
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <i className="fas fa-envelope text-yellow-400 mt-1" />
                <div>
                  <a
                    href="mailto:kuldeepprajapati2111@gmail.com"
                    className="block hover:underline opacity-90 hover:opacity-100"
                  >
                    kuldeepprajapati2111@gmail.com
                  </a>
                </div>
              </li>
            </ul>
            {/* Newsletter */}
            <h3 className="text-xl text-yellow-400 mb-2 border-b-2 border-yellow-400 pb-2">
              Newsletter
            </h3>
            <p className="mb-4 opacity-70">
              Subscribe to get updates on our latest events and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                required=""
                className="flex-1 p-3 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-pink-500 text-white p-3 rounded-r-md transition"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center opacity-70 text-sm">
          <p>
            © 2024 Tab Creative Studio. All Rights Reserved. | Designed with{" "}
            <i className="fas fa-heart text-yellow-400" /> by Your Team
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
