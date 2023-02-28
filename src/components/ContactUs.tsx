import { useState } from "react";
import { addUserMessage } from "../services/userMessageService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { error } from "console";

const ContactUs = () => {
  const [userMessage, setUserMessage] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const resetForm = () => {
    setUserMessage({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleTextChange = (ev: any) => {
    let newUserMessage = JSON.parse(JSON.stringify(userMessage));
    newUserMessage[ev.target.id] = ev.target.value;
    setUserMessage(newUserMessage);
  };
  const handleFormSubmit = (ev: any) => {
    ev.preventDefault();
    addUserMessage(userMessage)
      .then(() => {
        successMsg("We have received your message");
        resetForm();
      })
      .catch((err: any) => {
        errorMsg(err.response.data);
      });
  };

  return (
    <>
      <div className="container-fluid footer_class">
        <div className="row myMarging">
          <div className="col-12 col-md-8">
            <form onSubmit={handleFormSubmit} className="container">
              <h1 className="h1_footer">We are here for you!</h1>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <input
                      placeholder="name"
                      type="text"
                      className="inputStyle gridFooterItemN"
                      id="name"
                      onChange={handleTextChange}
                      value={userMessage.name}
                    />
                  </div>
                  <p>{}</p>
                  <div className="mb-3">
                    <input
                      placeholder="email"
                      type="email"
                      className="inputStyle gridFooterItemM"
                      id="email"
                      onChange={handleTextChange}
                      value={userMessage.email}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      placeholder="phone"
                      type="text"
                      className="inputStyle gridFooterItemM"
                      id="phone"
                      onChange={handleTextChange}
                      value={userMessage.phone}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="mb-3">
                    <textarea
                      placeholder="message"
                      className="inputStyle gridFooterItemT"
                      id="message"
                      rows={3}
                      onChange={handleTextChange}
                      value={userMessage.message}
                    ></textarea>
                  </div>

                  <button className="inputStyle gridFooterItemB mb-3">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-4">
            <div className="contactIcons">
              <div className="greyLainTopAndBot"></div>
              <div>YoungToy</div>
              <div>
                <i className="fa-solid fa-phone-flip" id="Icolor"></i> Phon:03-6895655
              </div>
              <div>
                <i className="fa-solid fa-fax" id="Icolor"></i> Fax:03-6895655
              </div>
              <div>
                <i className="fa-brands fa-whatsapp" id="Icolor"></i> 0546765564
              </div>
              <div>
                <i className="fa-solid fa-location-dot" id="Icolor"></i> Tveria
                30 Petach Tikva
              </div>
              <div className="greyLainTopAndBot"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
