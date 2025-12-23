interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color?: string;
}

function Button({ children, type='button', color, ...rest }: ButtonProps){
  return (
    <button type={ type } className="rounded-button" style={{ backgroundColor: color }} { ...rest } >{ children }</button>
  );
}

export default Button;