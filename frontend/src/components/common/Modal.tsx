interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        {children}
        <button onClick={onClose} className="mt-4 text-sm text-red-500">
          Close
        </button>
      </div>
    </div>
  );
}
