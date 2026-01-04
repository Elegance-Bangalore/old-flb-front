import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/Redux/Auth/authSlice';
import { MessageCircle } from 'lucide-react';
import ChatModal from './ChatModal';

const FloatingChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);

  // Don't show chat icon if user is not logged in
  if (!user) {
    return null;
  }

  const handleChatClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className="floating-chat-icon"
        onClick={handleChatClick}
      >
        <MessageCircle size={28} color="white" />
      </div>
      
      <ChatModal 
        isOpen={isOpen} 
        onClose={handleCloseModal}
        user={user}
      />
    </>
  );
};

export default FloatingChatIcon;
