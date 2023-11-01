"use client";

import React, { useEffect, useState } from "react";
import Newchat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

function Sidebar() {
  const { data: session } = useSession();

  const [models, setModels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState(null);

  // const { data: models, isLoading } = useSWR("models", fetchModels);
  // const { data: model, mutate: setModel } = useSWR("model", {
  //   fallbackData: "text-davinci-003",
  // });

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchModels = await fetch("/api/auth/askQuestion");
      const data = await fetchModels.json();
      setModels(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <Newchat />

          <div className="hidden sm:inline">
            {models && (
              <ModelSelection
                model={model}
                models={models["modelOptions"]}
                isLoading={isLoading}
                setModel={setModel}
              />
            )}
          </div>
          <div className="flex flex-col space-y-2 my-2 ">
            {loading && (
              <div className=" animate-pulse text-center text-white ">
                <p> Loading Chats....</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="profile"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
        />
      )}
    </div>
  );
}

export default Sidebar;
