import { FunctionComponent } from "react";

interface CarrouselProps {}

const Carrousel: FunctionComponent<CarrouselProps> = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/005.png"
              className="d-block w-100 img_size"
              alt="perfect"
            />
            <div className="carousel-caption d-none d-md-block mb-5">
              <p className="carrousel_AFont text-info-emphasis">
                Find me a present
              </p>
              <p className="carrousel_PFont">
                An experiential interface that will find you the perfect gift
                according to interests and budget
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/002.png"
              className="d-block w-100 img_size"
              alt="Fast Shipping"
            />
            <div className="carousel-caption d-none d-md-block mb-5">
              <p className="carrousel_AFont">Fast Shipping</p>
              <p className="carrousel_PFont">Order today receive today!!!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/003.png"
              className="d-block w-100 img_size"
              alt="Games for children"
            />
            <div className="carousel-caption d-none d-md-block mb-5">
              <p className="carrousel_AFont">special for your baby!!</p>
              <p className="carrousel_PFont">
                A selection of special games for preschoolers
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/004.png"
              className="d-block w-100 img_size"
              alt="Pay with Bit"
            />
            <div className="carousel-caption d-none d-md-block mb-5">
              <p className="carrousel_AFont">Pay with Bit</p>
              <p className="carrousel_PFont">
                From today you can also pay in the Bit app!!!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="images/001.png"
              className="d-block w-100 img_size"
              alt="Games for all ages"
            />
            <div className="carousel-caption d-none d-md-block mb-5">
              <p className="carrousel_AFont">Games for all ages</p>
              <p className="carrousel_PFont">
                A huge selection of games for all children
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrousel;
