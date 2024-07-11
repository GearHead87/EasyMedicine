import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold">EasyMedicine</h2>
          <p className="mt-2">
            Feel Free to Contact us
          </p>
          <div className="mt-4">
            <h3 className="font-bold">Trade License</h3>
            <p>TRAD/DNCC/057777/2024</p>
            <p>Others License: 180000</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Refund and Return Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Useful Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Account
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Best Selling Products
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Blogs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Contact Info</h3>
          <p>
            <strong>Address:</strong> Chattogram Sadar, Chattogram
          </p>
          <p>
            <strong>Hot Line:</strong> 0962000000
          </p>
          <p>
            <strong>Mobile:</strong> 0170000000
          </p>
          <p>
            <strong>Email:</strong> easymedicine@gmail.com
          </p>
          <div className="flex mt-4 space-x-2">
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-teal-700 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            {/* <img
              src="/sslcommerz.png"
              alt="SSLCommerz"
              className="w-32 mx-auto"
            /> */}
          </div>
          <p className="text-center md:text-right">
            &copy; 2021-2024 Poonno.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
