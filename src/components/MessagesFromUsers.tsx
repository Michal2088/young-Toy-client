import { FunctionComponent, useEffect, useState } from "react";
import { UserMessage } from "../interfaces/UserMessage";
import { errorMsg, successMsg } from "../services/feedbacksService";
import {
  changeIfUserMessageAlreadyBeenRead,
  getAllUsersMessages,
} from "../services/userMessageService";

interface MessagesFromUsersProps {}

const MessagesFromUsers: FunctionComponent<MessagesFromUsersProps> = () => {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  useEffect(() => {
    getAllUsersMessages()
      .then((result) => {
        setMessages(result.data);
      })
      .catch((err) => console.log(err));
  }, [isChanged]);

  const handleOnChange = (message: UserMessage) => {
    changeIfUserMessageAlreadyBeenRead(message._id as string)
      .then(() => {
        successMsg(`You have successfully changed the alreadyBeenRead field`);
        setIsChanged(!isChanged);
      })
      .catch((err) => {
        errorMsg(err.response.data);
      });
  };
  return (
    <>
      <div className="d-none d-md-block">
        <h3 className="headerColor text-center">Messages From Users</h3>
      </div>
      <div className="d-block d-md-none">
        <h3 className="hToo text-center">Messages From Users</h3>
      </div>

      {messages.length ? (
        messages.map((message: UserMessage) => (
          <div className="mx-5 my-5" key={message._id}>
            <div className="card text-center">
              <div className="card-header">{message.name}</div>
              <div className="card-body">
                <h5 className="card-title">email:{message.email}</h5>
                <p className="card-text">message: {message.message}</p>
              </div>
              <div onClick={() => handleOnChange(message)}>
                {message.alreadyBeenRead ? (
                  <div>
                    <p className="text-primary">message already been read</p>{" "}
                    <div className="btn btn-primary mb-4">
                      Return to "I haven't read yet"
                    </div>
                  </div>
                ) : (
                  <div className="btn btn-success mb-4">
                    <b> new message</b>
                  </div>
                )}
                <div className="card-footer text-muted">{message.date}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>no messages</div>
      )}
    </>
  );
};

export default MessagesFromUsers;
