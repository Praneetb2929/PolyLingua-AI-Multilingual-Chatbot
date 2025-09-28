export default function InputBar({ input, setInput, sendMessage, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US"; // You can dynamically set this based on selectedLang
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <div className="p-4 bg-gray-100 flex items-center gap-2 border-t">
      <button
        onClick={startVoiceInput}
        className="text-purple-600 hover:text-purple-800 text-xl"
        title="Speak your message"
      >
        🎤
      </button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Your message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-all"
      >
        Send
      </button>
    </div>
  );
}