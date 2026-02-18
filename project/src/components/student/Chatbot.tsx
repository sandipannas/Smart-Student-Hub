import { X, Send, User } from "lucide-react";

import { useState } from "react";

interface ChatbotProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

 const Chatbot: React.FC<ChatbotProps>=({setShow})=> {
  const [typed, setTyped] = useState<string>("");
  const [messg, setMessg] = useState<string[]>([]);

  const handleSubmit = () => {
    if (typed.trim() !== "") {
      setMessg([...messg, typed]);
      setTyped("")
    }
  };

  return (
    <div className="w-[80%] h-[80%] lg:w-[30%] lg:h-[80%]  bg-white rounded-sm fixed top-5 right-10 z-[1000] border border-black lg:top-10 lg:right-20  flex flex-col items-center justify-between animate-grow">
      <div className="flex h-[10%] items-center justify-between w-full bg-blue-100 p-4 border-b-2 border-blue-600 rounded-t-sm">
        <h5 className="text-sm lg:text-lg font-semibold">
          Carrier guidance Chatbot
        </h5>
        <X className="text-lg cursor-pointer" onClick={()=>setShow(false)}/>
      </div>
      <div className="h-[75%] w-full flex flex-col items-center justify-start overflow-y-auto p-4">
        {messg.length>0 && messg.map((chat,index)=>(
            <div className="h-[40%] w-full flex flex-col items-center justify-start flex-shrink-0" key={index}>
          <div className="h-[50%] w-full flex items-center justify-end ">
            <div className="h-fit w-fit p-2  rounded-b-xl rounded-l-xl bg-blue-100">
              <p>{chat}</p>
            </div>
          </div>
          <div className="h-[50%] w-full flex items-center justify-start ">
            <div className="h-fit w-fit p-2  rounded-b-xl rounded-r-xl bg-blue-100">
              <p>work in progress...</p>
            </div>
          </div>
        </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-end  h-[15%] border-t-2 border-blue-600 rounded-b-sm">
        <input
          type="text"
          placeholder="ask something..."
          className="w-[100%] h-[100%] p-4 bg-blue-100 rounded-b-sm"
          value={typed}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTyped(event.target.value)
          }
        />
        <div
          className="fixed rounded-full h-[40px] w-[40px] bg-blue-600 mr-6 flex items-center justify-center cursor-pointer"
          onClick={handleSubmit}
        >
          <Send className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default Chatbot