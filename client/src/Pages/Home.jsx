import RightSidebar from '../Components/RightSidebar';
import ChatContainer from '../Components/ChatContainer';
import SideBar from '../Components/SideBar';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';




const Home = () => {

  const {selectedUser} = useContext(ChatContext)

  return (
   <div className="w-full h-screen sm:px-[15%] sm:py-[5%]">

      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden
        h-[100%] grid grid-cols-1 relative 
        ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>

        <SideBar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home