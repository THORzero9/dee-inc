import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  image: string;
  alt: string;
}

export function Lightbox({ open, onClose, image, alt }: LightboxProps) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-2 bg-black/95 border-none">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative flex items-center justify-center w-full h-full">
          <img
            src={image}
            alt={alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
