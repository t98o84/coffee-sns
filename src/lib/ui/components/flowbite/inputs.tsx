import {
  FileInput,
  FileInputProps,
  Label,
  LabelProps,
  Select,
  SelectProps,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from 'flowbite-react';
import React, { ReactNode } from 'react';

export interface WithLabelProps {
  label: string;
  id?: string;
  helperText?: ReactNode;
  errors?: string[];
  children: (props: { id: string; helperText: ReactNode }) => ReactNode;
  labelProps?: Partial<LabelProps>;
}

export function WithLabel({
  label,
  labelProps,
  errors,
  children,
  ...props
}: WithLabelProps) {
  const id = props.id || btoa(encodeURIComponent(label));

  const helperText = (
    <>
      {errors?.map((error, index) => (
        <div key={index} className="text-xs text-red-500">
          {error}
        </div>
      ))}
      {props.helperText}
    </>
  );

  return (
    <div>
      <div>
        <Label
          {...labelProps}
          color={errors ? 'failure' : labelProps?.color}
          value={label}
          className={`bold pb-1 ${labelProps?.className}`}
          htmlFor={id}
        />
      </div>
      {children({ id, helperText })}
    </div>
  );
}

export interface TextInputWithLabelProps
  extends TextInputProps,
    Omit<WithLabelProps, 'children'> {}

export function TextInputWithLabel(props: TextInputWithLabelProps) {
  return (
    <WithLabel {...props}>
      {({ id, helperText }) => (
        <TextInput
          {...props}
          id={id}
          helperText={helperText}
          color={props.errors ? 'failure' : props?.color}
        />
      )}
    </WithLabel>
  );
}

export interface TextareaWithLabelProps
  extends TextareaProps,
    Omit<WithLabelProps, 'children'> {}

export function TextAreaWithLabel(props: TextareaWithLabelProps) {
  return (
    <WithLabel {...props}>
      {({ id, helperText }) => (
        <Textarea
          {...props}
          id={id}
          helperText={helperText}
          color={props.errors ? 'failure' : props?.color}
        />
      )}
    </WithLabel>
  );
}

export interface SelectWithLabelProps
  extends SelectProps,
    Omit<WithLabelProps, 'children'> {}

export function SelectWithLabel(props: SelectWithLabelProps) {
  return (
    <WithLabel {...props}>
      {({ id, helperText }) => (
        <Select
          {...props}
          id={id}
          helperText={helperText}
          color={props.errors ? 'failure' : props?.color}
        />
      )}
    </WithLabel>
  );
}

export interface FileInputWithLabelProps
  extends FileInputProps,
    Omit<WithLabelProps, 'children'> {}

export function FileInputWithLabel(props: FileInputWithLabelProps) {
  return (
    <WithLabel {...props}>
      {({ id, helperText }) => (
        <FileInput
          {...props}
          id={id}
          helperText={helperText}
          color={props.errors ? 'failure' : props?.color}
        />
      )}
    </WithLabel>
  );
}
