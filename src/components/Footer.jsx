import React from "react";
import { FaTwitter, FaGithub, FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#fef9ee] mt-20 py-12 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div>
            <Link to='/'>
             <img src="https://i.ibb.co.com/wZLf9dTJ/logo-plateshare.png" className="w-16 h-16 rounded-4xl inline" alt="" /> <span className="font-semibold text-2xl text-[#b48518] ">PLATESHARE</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold mb-3">COMMUNITY</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Submit an issue</li>
                <li>GitHub Repo</li>
                <li>Slack</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">GETTING STARTED</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Introduction</li>
                <li>Documentation</li>
                <li>Usage</li>
                <li>Globals</li>
                <li>Elements</li>
                <li>Collections</li>
                <li>Themes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">RESOURCES</h3>
              <ul className="space-y-2 text-gray-600">
                <li>API</li>
                <li>Form Validations</li>
                <li>Visibility</li>
                <li>Accessibility</li>
                <li>Community</li>
                <li>Design Defined</li>
                <li>Marketplace</li>
              </ul>
            </div>
          </div>
        </div>

      
        <div className="border-t mt-10 pt-6"></div>

        
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-600 gap-4 text-sm">

          <p>© 2020 Plateshare All rights reserved.</p>

          <div className="flex gap-6">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Security</p>
            <p>Sitemap</p>
          </div>

        
          <div className="flex gap-4 text-xl">
            
  <a
    href="https://x.com/home"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#b48518] transition"
  >
    <FaTwitter />
  </a>

  <a
    href="https://github.com/rafiul040"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#b48518] transition"
  >
    <FaGithub />
  </a>

  <a
    href="https://www.facebook.com/rafiulislam22"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#b48518] transition"
  >
    <FaFacebook />
  </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
