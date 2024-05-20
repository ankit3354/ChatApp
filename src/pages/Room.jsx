import React from "react";
import { useState } from "react";
import client, {
  COLLECTION_MESSAGE_ID,
  DATABASES_ID,
  databases,
} from "../appwriteConfig";
import { useEffect } from "react";
import { ID, Query, Role, Permission } from "appwrite";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { BsTrash3Fill } from "react-icons/bs";
import "../App.css";

function Room() {
  const { user } = useAuth();
  const [message, setMessage] = useState([]);
  const [messagesbody, setMessageBody] = useState("");

  useEffect(() => {
    getMessage();
    const unsubscribe = client.subscribe(
      [
        `databases.${DATABASES_ID}.collections.${COLLECTION_MESSAGE_ID}.documents`,
      ],
      (response) => {
        // console.log("RealTime :", response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A Message Created!!!");
          setMessage((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A Message Deleted!!!");
          setMessage((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessage = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );

    console.log("Response :", response);
    setMessage(response.documents);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    const permissions = [Permission.write(Role.user(user.$id))];

    const payload = {
      user_id: user.$id,
      username: user.name,
      body: messagesbody,
    };

    try {
      const response = await databases.createDocument(
        DATABASES_ID,
        COLLECTION_MESSAGE_ID,
        ID.unique(),
        payload,
        permissions
      );

      setMessageBody("");
      console.log("Created :", response);

      // setMessage((prevState) => [response, ...prevState]);
    } catch (error) {
      console.log("Doc create error ", error);
    }
  };

  const deleteMessage = async (messageId) => {
    await databases.deleteDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      messageId
    );
    // setMessage((prevState) =>
    //   message.filter((message) => message.$id !== messageId)
    // );
  };
  return (
    <main className="container bg-[url('/public/BgImage.svg')] relative flex min-h-screen flex-col overflow-hidden py-6 sm:py-12 bg-cover">
      <div className="relative bg-pink-900 px-0 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-8/12 md:w-[60%] lg:w-5/12 sm:rounded-lg sm:px-10 ">
        <div className="mx-auto max-w-xl">
          <div className="space-y-6 text-base leading-7 text-gray-600">
            <div className=" text-white">
              <Header />
              <div className="rounded-md bg-zinc-800/50 px-4 pb-6 pt-3">
                <form
                  onSubmit={(e) => handleUserSubmit(e)}
                  className="mb-8 text-right"
                >
                  <textarea
                    required
                    maxLength={1000}
                    placeholder="Say something.."
                    onChange={(e) => setMessageBody(e.target.value)}
                    value={messagesbody}
                    className="w-full rounded-md bg-pink-500/35 px-2 pt-2 text-xl text-white outline-none mt-4"
                  ></textarea>
                  <input
                    type="submit"
                    value="Send"
                    className="rounded-full bg-pink-800 px-6 py-2 transition-all hover:bg-pink-500 indie-flower-regular "
                  />
                </form>

                <div className="rounded-md  bg-pink-500/50 py-2 sm:px-3">
                  <div>
                    {message.map((message) => (
                      <div key={message.$id} className="py-4 px-2">
                        <div className="flex justify-between">
                          <p>
                            <span>
                              {message?.username ? (
                                <span>{message.username} </span>
                              ) : (
                                <span> Annoymous user </span>
                              )}
                              <span>
                                {new Date(message.$createdAt).toLocaleString()}
                              </span>
                            </span>
                          </p>
                          {message.$permissions.includes(
                            `delete(\"user:${user.$id}\")`
                          ) && (
                            <BsTrash3Fill
                              onClick={() => deleteMessage(message.$id)}
                              className="text-xl text-pink-900 hover:text-pink-400 transition-all cursor-pointer"
                            />
                          )}
                        </div>

                        <div
                          className={`w-fit rounded-full ${
                            message.user_id === user.$id
                              ? "bg-transparent border "
                              : "bg-pink-800"
                          } px-4 py-3 `}
                        >
                          <span className="bubblegum-sans-regular">
                            {message.body}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Room;
