import React from "react";
import Chat from "../../../../components/Chat";
import ChatInput from "../../../../components/ChatInput";

function chatPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <Chat />
      <ChatInput />
    </div>
  );
}

export default chatPage;
