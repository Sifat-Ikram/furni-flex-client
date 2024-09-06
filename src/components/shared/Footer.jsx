import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { FaInstagram } from "react-icons/fa6";
import cross from "../../assets/cross.png";
import flag from "../../assets/flag.png";

const Footer = () => {
  return (
    <div className="w-full bg-black rounded-b-md">
      <div className="flex max-md:flex-col justify-center w-4/5 mx-auto pb-10 pt-20">
        <div className="w-2/5">
          <a href="/" className="flex">
            <img src={logo} className="" />
            <h1 className="text-xl font-bold text-[#81859F]">
              Furni<span className="text-[#1E99F5]">Flex</span>
            </h1>
          </a>
        </div>
        <div className="flex-1 flex justify-between items-start text-[#81859F]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold">About Us</h1>
            <ul className="mt-8 space-y-2">
              <li>
                <a href="#" className="text-lg font-semibold">
                  Master Plan
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Invest
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Pressroom
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold">Explore EEVE</h1>
            <ul className="mt-8 space-y-2">
              <li>
                <a href="#" className="text-lg font-semibold">
                  Unlock my Robot Power
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Starlight
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Robot Platform
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  EEVE Roadmap
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-semibold">Community & Support</h1>
            <ul className="mt-8 space-y-2">
              <li>
                <a href="#" className="text-lg font-semibold">
                  Willow X Community
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Developer & Maker Access
                </a>
              </li>
              <li>
                <a href="#" className="text-lg font-semibold">
                  Special Cases
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-4/5 mx-auto border-t-[1px] flex justify-between items-center border-solid py-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <FaFacebookF className="text-[#81859F] text-xl" />
            <FaInstagram className="text-[#81859F] text-xl" />
            <img src={cross} />
            <FaLinkedinIn className="text-[#81859F] text-xl" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <h1 className="text-[#81859F] text-lg font-semibold">
            March22 Recap
          </h1>
          <h1 className="text-[#81859F] text-lg font-semibold">
            Privacy Policy
          </h1>
          <h1 className="text-[#81859F] text-lg font-semibold">
            General Terms
          </h1>
          <h1 className="text-[#81859F] text-lg font-semibold">Contact</h1>
        </div>
        <div className="flex justify-center items-center gap-3">
          <img src={flag} />
          <h1 className="text-[#81859F] text-lg font-semibold">
            United States (English)
          </h1>
        </div>
      </div>
      <div className="pb-5">
        <h1 className="text-[#81859F] text-center text-lg font-semibold">
          EEVE © 2024. All rights reserved.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
