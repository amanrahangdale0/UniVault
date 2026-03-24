import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 w-screen h-screen">
             <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 10 }}
               className="bg-card w-full max-w-md p-6 rounded-xl border border-border shadow-lg pointer-events-auto"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="flex justify-between items-start mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                     <AlertTriangle size={20} />
                  </div>
                  <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 transition-colors rounded-md active:bg-secondary">
                     <X size={20} />
                  </button>
               </div>
               
               <h3 className="text-lg font-medium mb-2">{title}</h3>
               <p className="text-sm text-muted-foreground mb-8">{description}</p>
               
               <div className="flex justify-end gap-3">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                  >
                     {cancelText}
                  </button>
                  <button 
                    onClick={() => {
                       onConfirm();
                       onClose();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${isDestructive ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90 text-primary-foreground'}`}
                  >
                     {confirmText}
                  </button>
               </div>
             </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
