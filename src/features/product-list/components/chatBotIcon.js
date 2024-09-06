import React from "react";

const ChatBotIcon=()=>{
    return(
        <div className="relative cursor-pointer w-[370px] rounded-lg bg-gray-800">
        <div style={{ width: 350, height: 430 }}>
        <iframe
          width="100%"
          height="100%"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/cdb8c6a7-a7c7-4482-acc3-0fbcaaaabaee"
        
        ></iframe>
          </div>
      </div>
    )
}
export default ChatBotIcon;