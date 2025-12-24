interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

function Button({ children, type='button', color, ...rest }: ButtonProps){
  return (
    <button type={ type } className="button" style={{ backgroundColor: color }} { ...rest } >{ children }</button>
  );
}

export default Button;