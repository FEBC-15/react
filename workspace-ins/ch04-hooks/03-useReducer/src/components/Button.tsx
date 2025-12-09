import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  // children: string;
  // type?: 'button' | 'submit' | 'reset';
  // onClick: () => void;
  bgColor?: string;
}

function Button({ children, type="button", bgColor, color, ...props }: ButtonProps) {
  return (
    <button 
      { ...props }
      className="rounded-button"
      type={ type }
      style={{ ...props.style, backgroundColor: bgColor, color }}
    >{ children }</button>
  );
}

export default Button;