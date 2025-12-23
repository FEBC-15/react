import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: string;
  bg?: string;
}

function Button({ children, type='button', bg, color, ...rest }: ButtonProps){
  return (
    <button type={ type } className={`${styles.button} ${styles[`bg-${bg}-text-${color}`]}`} { ...rest }>{ children }</button>
  );
}

export default Button;