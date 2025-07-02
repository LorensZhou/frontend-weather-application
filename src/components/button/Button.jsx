
import './Button.css';

function Button({ type, children, onClick, disabled = false, variant }) {
    let buttonClassName = "button";

    if(variant === "primary") {
        buttonClassName += " button-primary";
    }
    else if(variant === "secondary"){
        buttonClassName += " button-secondary";
    }
    else if(variant === "tertiary"){
        buttonClassName += " button-tertiary";
    }
    else {
        buttonClassName += " button-secondary";
    }
    return (
        <button type={type}
                disabled={disabled}
                onClick={onClick}
                className={buttonClassName}>
            {children}
        </button>
    );
}

export default Button;