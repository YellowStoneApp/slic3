import React from "react";

interface FormInputProps {
  onValueChange: (value: string) => void;
  name: string;
  type: string;
  placeholder: string;
}

const FormInput = (props: FormInputProps) => {
  const className = `form-control validate-${props.type}`;
  return (
    <>
      <div className="input-style no-borders has-icon validate-field mb-4">
        <i className="fa fa-user"></i>
        <input
          type={props.type}
          className={className}
          id="form1a"
          placeholder={props.placeholder}
          onChange={(target) => props.onValueChange(target.currentTarget.value)}
        />
        <label htmlFor="form1a" className="color-blue-dark font-10 mt-1">
          {props.placeholder}
        </label>
        <i className="fa fa-times disabled invalid color-red-dark"></i>
        <i className="fa fa-check disabled valid color-green-dark"></i>
        <em>(required)</em>
      </div>
    </>
  );
};

export default FormInput;
