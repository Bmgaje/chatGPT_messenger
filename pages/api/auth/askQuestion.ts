import { NextApiRequest, NextApiResponse } from "next";
import query from "../../../lid/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../../firebase-Admin";

import openai from "../../../lid/chatgpt";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const models = await openai.models.list().then((res) => res.data);

    const modelOptions = models.map((model) => ({
      value: model.id,
      label: model.id,
    }));

    res.status(200).json({
      modelOptions,
    });
  }
  const { prompt, ChatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a promt" });
    return;
  }

  if (!ChatId) {
    res.status(400).json({ answer: "please provide a Chat Id" });
    return;
  }

  const response = await query(prompt, ChatId, model);

  const message: Message = {
    text: response || "chatGPT is unable to find answer for that! ",

    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(ChatId)
    .collection("message")
    .add(message);

  res.status(200).json({ answer: message.text });
}

type Option = {
  value: string;
  label: string;
};
