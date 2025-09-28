export default function ChatBubble({ role, content }) {
  const isUser = role === "user";
  const avatarUrl = isUser
    ? "https://ui-avatars.com/api/?name=You&background=6b21a8&color=fff"
    : "https://ui-avatars.com/api/?name=Bot&background=cccccc&color=000";

  return (
    <div className={`flex items-start gap-2 ${isUser ? "justify-end" : "justify-start"} transition-all`}>
      {!isUser && (
        <img
          src={avatarUrl}
          alt="Bot Avatar"
          className="w-8 h-8 rounded-full shadow-md"
        />
      )}
      <div
        className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md animate-fade-in ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {content}
      </div>
      {isUser && (
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-8 h-8 rounded-full shadow-md"
        />
      )}
    </div>
  );
}