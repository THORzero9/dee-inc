import { ReactNode } from "react";

interface ComicPanelProps {
  title: string;
  color: "primary" | "secondary" | "accent";
  description: string;
  children?: ReactNode;
}

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary"
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary/20",
    text: "text-secondary"
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/20",
    text: "text-accent"
  }
};

const ComicPanel = ({ title, color, description, children }: ComicPanelProps) => {
  const classes = colorClasses[color];

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className={`p-3 ${classes.bg} border-b ${classes.border}`}>
        <h4 className={`font-medium ${classes.text}`}>{title}</h4>
      </div>
      <div className="p-4">
        <div className="bg-neutral-light/50 h-40 flex items-center justify-center rounded-lg mb-3">
          {children || (
            <div className="text-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-neutral-dark/30 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-neutral-dark/50 text-sm">Comic panel illustration</p>
            </div>
          )}
        </div>
        <p className="text-sm text-neutral-dark/80">{description}</p>
      </div>
    </div>
  );
};

export default ComicPanel;
