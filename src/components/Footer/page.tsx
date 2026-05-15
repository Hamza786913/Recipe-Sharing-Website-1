export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 dark:text-gray-400 py-12 px-8 mt-auto text-center text-sm border-t border-slate-800 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-serif text-lg text-white">✨ Appify</div>
        <p className="m-0">© 2026 Appify – All Rights Reserved</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}