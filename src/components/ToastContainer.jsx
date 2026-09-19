export default function ToastContainer({ toasts }) {
  if (toasts.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:end-4 sm:items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in pointer-events-auto flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
