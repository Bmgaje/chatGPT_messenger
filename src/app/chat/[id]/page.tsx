import React from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

function chatPage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <Chat ChatId={id} />
      <ChatInput ChatId={id} />
    </div>
  );
}

export default chatPage;
