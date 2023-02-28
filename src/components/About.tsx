import { FunctionComponent, useEffect } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
    <div className="container text-center p-5">
    <div className="d-none d-md-block">
            <h1 className="headerColor">ABUT YOUNG TOY</h1>
    </div>
    <div className="d-block d-md-none">
            <h1 className="hToo text-info">ABUT YOUNG TOY</h1>
    </div>

      <h2 className="mt-5 hToo">Dear client</h2>
      <p className="fs-2 m-5 pStyle">
        The Harniyot Yup site is the site of your child's dreams The site gives
        a great offer of children's games, baby toys and motorized tools The
        site is structured in categories in an orderly and understandable way so
        that you can enjoy the most convenient available This is indicated on
        every product that is on sale and automatically the price that will be
        included in the shopping cart will only include the sale price Home
        deliveries can be ordered at a price of $20 for delivery Also, a
        purchase over $49 will get you free home delivery In order to add to
        your shopping cart the products you want to buy, you will have to
        register on the website This step was taken so that we can hear from you
        and serve you in the best possible way, as well as to prevent unpleasant
        malfunctions We will be happy to hear your experience with our products,
        and answer anything you need quickly and efficiently You can leave
        messages on the site's contact page, the messages go directly to the
        site administrator Thank you for coming to us
      </p>
      </div>
    </>
  );
};

export default About;
