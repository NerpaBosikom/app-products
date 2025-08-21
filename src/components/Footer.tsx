import { FiGithub, FiHeart } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="mt-20 bg-white/90 backdrop-blur-lg border-t border-violet-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
            <p className="text-lg font-semibold">Developed with</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <FiHeart className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-sm text-violet-700">
                © 2025 by Svetlana Tomzova
              </span>
            </div>
          </div>

          <a
            href="https://github.com/NerpaBosikom"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-2xl hover:from-violet-700 hover:to-purple-600 hover:shadow-lg transition-all duration-300 shadow-md"
          >
            <FiGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">GitHub</span>
          </a>

          <div className="w-24 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full mt-2" />
        </div>
      </div>
    </footer>
  );
}
