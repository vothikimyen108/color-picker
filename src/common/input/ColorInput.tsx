import React, { ChangeEvent, FC } from "react";
import "./ColorInput.css";

interface ColorInputProps {
  name: string;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  classNameInput?: string;
  classNameIcon?: string;
  isIcon?: boolean;
  err?: string;
  defaultValue?: string | number;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  isHiddenLabel?: boolean;
  min?: number;
  max?: number;
  isDisabled?: boolean;
}

const ColorInput: FC<ColorInputProps> = ({
  name,
  value,
  onChange,
  onBlur,
  icon,
  classNameInput,
  classNameIcon,
  err,
  defaultValue,
  label,
  type = "text",
  isHiddenLabel,
  min,
  max,
  isDisabled,
}) => {
  return (
    <div className="color-input">
      {label && !isHiddenLabel && (
        <label className="color-input-lable" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        max={max}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue as string}
        className={classNameInput}
        min={min}
        disabled={isDisabled}
      />
      {icon && <span className={classNameIcon}>{icon}</span>}
      {err && (
        <div className="error" style={{ color: "red" }}>
          {err}
        </div>
      )}
    </div>
  );
};

export default ColorInput;
