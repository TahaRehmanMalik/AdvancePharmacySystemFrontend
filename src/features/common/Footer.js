import {FaFacebook,FaInstagram,FaTwitter,FaLinkedin} from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Footer(){
    return(
        <>
  
  <div className="flex items-end w-full">
    <footer className="w-full  text-gray-700 bg-gray-200 body-font">
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <div className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start w-12">
            <img src="/ecommerce.png"></img>
          </div>
          <p className="mt-2 text-sm text--500">Get medicine on your door</p>
          <div className="mt-4">
            <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start text-2xl">
              <a className="text-sky-500 cursor-pointer hover:text-gray-700 " href='https://www.facebook.com'>
                <FaFacebook/>
              </a>
              <a className="ml-3 text-sky-500 cursor-pointer hover:text-gray-700"href='https://www.twitter.com'>
                <FaTwitter/>
                
              </a>
              <a className="ml-3 text-sky-500 cursor-pointer hover:text-gray-700"href='https://www.instagram.com'>
                <FaInstagram/>
                
              </a>
              <a className="ml-3 text-sky-500 cursor-pointer hover:text-gray-700 " href='https://www.linkedin.com'>
                <FaLinkedin />
                
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-purple-900 uppercase title-font">
              About
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <Link  to='/about' className="text-gray-700 cursor-pointer hover:text-gray-900">
                  About us
                </Link>
              </li>
              <li className="mt-3">
                <Link to='/blog' className="ttext-gray-700 cursor-pointer hover:text-gray-900">
                  Blog
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-purple-900 uppercase title-font">
              Platform
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <Link to="/policy" className="text-gray-700 cursor-pointer hover:text-gray-900">
                  Terms &amp; Privacy
                </Link>
              </li>
              <li className="mt-3">
                <Link to="/faq" className="text-gray-700 cursor-pointer hover:text-gray-900">
                  FAQ
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-purple-900 uppercase title-font">
              Contact
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-700 cursor-pointer hover:text-gray-900">
                Tel:+123-456-7890
                </a>
              </li>
              <li className="mt-3">
                <a className="text-gray-700 cursor-pointer hover:text-gray-900">
                Email:pharmacy@veloxmd.pk
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-purple-900">
        <div className="container px-5 py-4 mx-auto">
          <p className="text-sm text-white capitalize sm:text-center ">
            © 2023 VeloxMD Pharma. All rights reserved{" "}
          </p>
        </div>
      </div>
    </footer>
  </div>
</>

      

    )
}
export default Footer;