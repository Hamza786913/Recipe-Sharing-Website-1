import { useToast } from '../../context/ToastContext';

export default function Toast() {
  const { toastMsg, toastVisible } = useToast();
  return (
    <div className={`fixed bottom-6 right-6 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-4 rounded-xl shadow-2xl font-bold transition-all duration-300 z-[999] border border-slate-700 dark:border-indigo-500 ${toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="flex items-center gap-2">
        {toastMsg}
      </div>
    </div>
  );
}