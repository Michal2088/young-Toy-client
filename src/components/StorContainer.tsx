import { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { getIsAdmin } from "../services/userService";

interface StorContainerProps {}

const StorContainer: FunctionComponent<StorContainerProps> = () => {
  const categories = [
    {
      name: "babies",
      img: "images/baby.jpg",
    },
    {
      name: "box games",
      img: "images/be8c72943d71b38fba6463f2ef62b191.jpg",
    },
    {
      name: "multi-age",
      img: "images/H57780_3_HARDWARE_Photography_Detail-View-1_white.jpg",
    },
    {
      name: "cars",
      img: "images/ffb3768a-0b4e-42d2-9b06-a5d5a7c08667.jpg",
    },
    {
      name: "dolls",
      img: "images/kirabeily_autoOrient_i.jpg",
    },
    {
      name: "motorized",
      img: "images/262392_01062020172131_large.jpg",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h2 className="hToo text-center">Search by categories</h2>
      {getIsAdmin() ? (
        <Link to={`newProduct`} className="myButton2 rounded-pill">
          Add new product
        </Link>
      ) : null}

      <div className="d-flex justify-content-around flex-wrap p-5">
        {categories.map((category) => (
          <div className="p-5"  key={category.name}>
            <Link to={`categories/${category.name}`}>
              <div className="card borderCard">
                <div className="card-body">
                  <h5 className="card-title text-center categoryColor">
                    {category.name}
                  </h5>
                </div>
                <img
                  src={category.img}
                  className="card-img-bottom myImgSize"
                  alt={category.name}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default StorContainer;
