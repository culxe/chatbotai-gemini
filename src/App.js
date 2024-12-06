import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Pastikan API Key sudah ada di .env file
const genAI = new GoogleGenerativeAI("AIzaSyBRoLDddSyrDtvscgXCThgmun6_Un4nuxM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
// Fungsi untuk memformat respons bot agar rapi
const formatBotMessage = (message) => {
  return message
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Ubah **bold** menjadi HTML <strong>
    .replace(/\n/g, "<br>"); // Ubah baris baru menjadi HTML <br>
};

const App = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: formatBotMessage("Great to meet you. What would you like to know?"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref untuk elemen terakhir di daftar pesan
  const messagesEndRef = useRef(null);

  // Fungsi untuk menggulir halaman ke elemen terakhir
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Efek untuk menggulir ke bawah setiap kali ada pesan baru
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Mengirim pesan ke Gemini API
      const result = await chat.sendMessage(input);
      const formattedResponse = formatBotMessage(result.response.text());
      const botMessage = { role: "model", content: formattedResponse };

      // Update state dengan pesan baru dari model
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating response: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          content: formatBotMessage("Something went wrong. Please try again."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white p-4">
      {/* Chat Body */}
      <div className="w-full max-w-3xl bg-white flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-4 max-w-md transition-transform duration-500 ease-in-out transform ${
                  message.role === "user"
                    ? "bg-black text-white rounded-l-3xl rounded-tr-3xl" //bubble kanan
                    : "bg-gray-200 text-black rounded-r-3xl rounded-tl-3xl" // Bubble kiri
                }`}
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></div>
            </div>
          ))}

          {/* Typing bubble */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-l-lg flex items-center">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-400"></span>
                </div>
              </div>
            </div>
          )}

          {/* Elemen untuk scroll otomatis */}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="w-full max-w-3xl bg-white p-3 flex items-center rounded-l-lg">
        <input
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring focus:ring-gray-100 focus:border-0.1"
        />
        <button onClick={handleSend} disabled={loading} className="ml-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 19.5L21 12m0 0l-6.75-7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;
