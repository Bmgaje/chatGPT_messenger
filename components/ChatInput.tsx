"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  ChatId: string;
};
function ChatInput({ ChatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // useSWR to get model

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui.avatars.com/api/?name=${session?.user?.image!} `,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        ChatId,
        "message"
      ),
      message
    );
    // Toast notifacation to say loading

    const notifacation = toast.loading("Chat GPT is thinking....");

    console.log(notifacation);

    await fetch("/api/auth/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        ChatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notifacation to say successful
      toast.success("ChatGPT has responded!!!!!!", {
        id: notifacation,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex ">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 "
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Typr your message here......."
        />

        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className=" md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
