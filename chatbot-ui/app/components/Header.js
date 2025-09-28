export default function Header({ selectedLang, setSelectedLang }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 text-xl font-bold flex items-center justify-between">
      <div className="flex items-center gap-4">
        🌍 Multilingual Chatbot
        <span className="text-sm bg-green-400 text-black px-2 py-1 rounded-full animate-pulse">Online</span>
      </div>

      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="bg-white text-black text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="hi">हिन्दी</option>
        <option value="es">Español</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}