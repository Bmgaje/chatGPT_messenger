import React from "react";
import Newchat from "./NewChat";

function Sidebar() {
  return (
    <div className="p-2 flex-col h-screen ">
      <div className="flex-1">
        <div>
          <div>
            <Newchat />
          </div>
          <div>{/* modelSelection */}</div>

          {/* map to chat rows */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
