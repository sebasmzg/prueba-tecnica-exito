"use client"

import { useFormContext } from "react-hook-form";
import { FieldType, FormFieldProps } from "@/app/core/application/models/form.type";
import { useState } from "react";
import styles from './formField.module.scss';
import { Checkbox, ErrorMessage, Input, Label, Select } from "@/components/atoms";

export const FormField = ({
  name,
  label,
  type,
  placeholder,
  options,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let autoCompleteProps = {};
  if (type === FieldType.Email) {
    autoCompleteProps = { autoComplete: "email" };
  } else if (type === FieldType.Password) {
    autoCompleteProps = { autoComplete: "current-password" };
  } else if (type === FieldType.Text && name.toLowerCase().includes("name")) {
    autoCompleteProps = { autoComplete: "name" };
  } else if (type === FieldType.Tel) {
    autoCompleteProps = { autoComplete: "tel" };
  }

  return (
    <div className={styles.fieldWrapper}>
      {type !== FieldType.Checkbox && (
        <Label 
          htmlFor={name} 
        >
          {label}
        </Label>
      )}
      
      {type === FieldType.Text ||
      type === FieldType.Email ||
      type === FieldType.Number ||
      type === FieldType.Tel ? (
        <>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            hasError={!!error}
            {...register(name)}
            {...autoCompleteProps}
          />
          <ErrorMessage message={error} />
        </>
      ) : type === FieldType.Password ? (
        <div className={styles.passwordWrapper}>
          <Input 
            id={name}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            hasError={!!error}
            {...register(name)}
            {...autoCompleteProps}
            className={styles.passwordInput}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.passwordToggle}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <span className={styles.toggleText}>Ocultar</span>
            ) : (
              <span className={styles.toggleText}>Mostrar</span>
            )}
          </button>
          <ErrorMessage message={error} />
        </div>
      ) : type === FieldType.Select && options ? (
        <>
          <Select
            id={name}
            options={options}
            hasError={!!error}
            {...register(name)}
          />
          <ErrorMessage message={error} />
        </>
      ) : type === FieldType.Checkbox ? (
        <>
          <Checkbox 
            label={label} 
            {...register(name)} 
            hasError={!!error} 
          />
          <ErrorMessage message={error} />
        </>
      ) : null}
    </div>
  );
};