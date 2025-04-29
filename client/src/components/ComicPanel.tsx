import { ReactNode } from "react";
import { ImageIcon } from "lucide-react";

interface ComicPanelProps {
  title: string;
  color: "primary" | "secondary" | "accent";
  description: string;
  children?: ReactNode;
}

const colorClasses = {
  primary: {
    bg: "bg-primary/20",
    border: "border-primary/30",
    text: "text-primary",
    light: "bg-primary/5"
  },
  secondary: {
    bg: "bg-secondary/20",
    border: "border-secondary/30",
    text: "text-secondary-foreground",
    light: "bg-secondary/5"
  },
  accent: {
    bg: "bg-accent/20",
    border: "border-accent/30",
    text: "text-accent-foreground",
    light: "bg-accent/5"
  }
};

const ComicPanel = ({ title, color, description, children }: ComicPanelProps) => {
  const classes = colorClasses[color];
  
  // Random subtle rotation
  const randomRotation = Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1);

  return (
    <div 
      className={`relative bg-white rounded-xl overflow-hidden shadow-sm border-2 ${classes.border} transition-transform hover:-translate-y-1 hover:shadow-md duration-300`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-2 left-6 w-8 h-8 bg-white border-2 border-dashed border-foreground/20 rounded-full"></div>
      <div className="absolute -top-2 right-6 w-8 h-8 bg-white border-2 border-dashed border-foreground/20 rounded-full"></div>
      
      <div className={`p-3 ${classes.bg} border-b-2 border-dashed ${classes.border}`}>
        <h4 className={`font-heading text-xl ${classes.text}`}>{title}</h4>
      </div>
      
      <div className={`p-4 ${classes.light}`}>
        <div className="bg-white h-40 flex items-center justify-center rounded-lg mb-3 border border-dashed border-foreground/10 relative overflow-hidden">
          {children || (
            <div className="text-center px-4">
              <div className="relative">
                <ImageIcon className="h-10 w-10 mx-auto text-foreground/20 mb-2" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin-slow border-foreground/10"></div>
                </div>
              </div>
              <p className="font-heading text-foreground/40 text-sm">Comic panel illustration</p>
            </div>
          )}
          
          {/* Decorative corner tape */}
          <div className="absolute -top-1 -right-1 w-12 h-12 bg-white/80 transform rotate-45"></div>
        </div>
        
        <p className="font-body text-foreground/80 leading-relaxed text-sm py-2 px-1">{description}</p>
      </div>
      
      {/* Speech bubble style arrow */}
      <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-foreground/10"></div>
    </div>
  );
};

export default ComicPanel;
