import './Input.css';

function Input({ type, id, name, labelText, required, handleChange, value, maxValue, minValue, minLength, disabled = false }) {
    return (
        <label htmlFor={id}>
            {labelText}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                required={required}
                onChange={handleChange}
                max={maxValue}
                min={minValue}
                minLength={minLength}
                disabled={disabled}
            />
        </label>
    );
}

export default Input;


