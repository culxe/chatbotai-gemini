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

const formatBotMessage = (message) => {
  // Mengubah tanda ** menjadi HTML <strong> untuk bold
  let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Mengubah tanda bintang * menjadi <ul><li> untuk bullet points
  formattedMessage = formattedMessage.replace(/^\* (.*?)(?=\n|\r|$)/gm, "<ul><li>$1</li></ul>");

  // Mengubah blok kode dengan tanda ``` menjadi kontainer code-block
  formattedMessage = formattedMessage.replace(
    /```([\s\S]*?)```/g,
    `<div class="code-block scrollbar-thin scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-track hover:scrollbar-thumb-scrollbar-thumb-hover"><pre><code>$1</code></pre></div>`
  );

  // Mengubah baris baru menjadi <br> untuk line breaks
  formattedMessage = formattedMessage.replace(/\n/g, "<br>");

  return formattedMessage;
};

const App = () => {
  const [messages, setMessages] = useState(
    () =>
      JSON.parse(localStorage.getItem("chatHistory")) || [
        {
          role: "model",
          content: formatBotMessage("Great to meet you. What would you like to know?"),
        },
      ]
  );
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
    // Simpan riwayat percakapan ke localStorage setiap kali ada perubahan
    localStorage.setItem("chatHistory", JSON.stringify(messages));
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

  const handleNewChat = () => {
    // Reset messages dan hapus chat history di localStorage
    setMessages([
      {
        role: "model",
        content: formatBotMessage("Great to meet you. What would you like to know?"),
      },
    ]);
    localStorage.removeItem("chatHistory"); // Hapus chat history dari localStorage
  };

  return (
    <div className="flex flex-col items-center h-screen bg-black p-4">
      {/* Chat Body */}
      <div className="w-full max-w-4xl flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbar-thumb scrollbar-track-scrollbar-track hover:scrollbar-thumb-scrollbar-thumb-hover">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-4 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-gray-800 text-white rounded-l-3xl rounded-tr-3xl" // Bubble kanan
                    : "bg-black border border-gray-700 text-white rounded-r-3xl rounded-tl-3xl" // Bubble kiri
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
              </div>
            </div>
          ))}

          {/* Typing bubble */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 p-3 rounded-l-lg flex items-center">
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
      <div className="w-full max-w-4xl bg-gray-800 p-3 flex items-center rounded-l-lg">
        <input
          type="text"
          placeholder="Ask me something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          className="flex-1 p-2 bg-gray-900 pl-5 rounded-full focus:outline-none focus:ring focus:ring-gray-600 focus:border-0.1 text-white"
        />
        <button onClick={handleSend} disabled={loading} className="ml-2 p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 19.5L21 12m0 0l-6.75-7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Tombol New Chat di pojok kanan atas */}
      <div className="absolute top-4 right-4">
        <button onClick={handleNewChat} className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
          New
        </button>
      </div>
    </div>
  );
};

export default App;
