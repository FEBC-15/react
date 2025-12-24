import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  bg?: string;
}

function Button({ children, type='button', color, bg, ...rest }: ButtonProps){
  return (
    <button type={ type } className={`button bg-${bg}-text-${color}`} { ...rest } >{ children }</button>
  );
}

export default Button;