import { NextApiRequest, NextApiResponse } from "next";
import openai from "../../../lid/chatgpt";

type Option = {
  value: string;
  label: string;
};
type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("handler tri");
  const models = await openai.models.list().then((res) => res.data);

  console.log("models > ", models);
  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  res.status(200).json({
    modelOptions,
  });
}
