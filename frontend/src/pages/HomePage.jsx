import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';



const HomePage = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className="pt-20 px-40 justify-center flex items-center">
        <div className="shadow-cl bg-base-100 rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex rounded-lg h-full overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
