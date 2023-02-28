import { FunctionComponent } from "react";

interface ShippingNoticeProps {}

const ShippingNotice: FunctionComponent<ShippingNoticeProps> = () => {
  return (
    <>
      <div className="alert alert-light my-2 text-center" role="alert">
    <b>  FREE GROUND SHIPPING FOR ORDERS OVER $49 ... <i className="fa-solid fa-truck-fast"></i></b>
      </div>
    </>
  );
};

export default ShippingNotice;
