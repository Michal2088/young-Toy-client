import { FunctionComponent } from "react";
import ContactUs from "./ContactUs";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const today = new Date();
  const date = today.getFullYear();
  return (
    <>
      
      <ContactUs></ContactUs>
      <div className="alert alert-light mb-0 text-center" role="alert">
        <h6>© Michal Bracha {date}</h6>
        <div className="fs-4">
          <i className="fa-brands fa-whatsapp m-1"></i>
          <i className="fa-brands fa-facebook-square m-1"></i>
          <i className="fa-brands fa-instagram-square m-1"></i>
        </div>
      </div>
    </>
  );
};

export default Footer;
