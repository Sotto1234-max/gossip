import React, { useState } from 'react';
import './App.css';

const users = [
  { name: 'sampleuser', age: 18, location: 'Andhra Pradesh, India', gender: 'male' },
  { name: 'Rakesh', age: 27, location: 'Telangana, India', gender: 'male' },
  { name: 'Sunil', age: 18, location: 'Maharashtra, India', gender: 'male' },
];

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});

  const sendMessage = (text) => {
    if (!selectedUser) return;
    setMessages((prev) => ({
      ...prev,
      [selectedUser.name]: [...(prev[selectedUser.name] || []), { sender: 'me', text }]
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-white border-r overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4">Online Users</h2>
        {users.map((user) => (
          <div
            key={user.name}
            className="p-2 border rounded mb-2 bg-blue-100 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-600">{user.age} yrs, {user.location}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 font-bold">
              {selectedUser.name} - {selectedUser.gender}, {selectedUser.age} yrs, {selectedUser.location}
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              {(messages[selectedUser.name] || []).map((msg, idx) => (
                <div key={idx} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  <span className="inline-block bg-white p-2 rounded shadow">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center gap-2 border-t">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.target.value)}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => sendMessage("Hello!")}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
}
