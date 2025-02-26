import type { SelectField } from '@payloadcms/plugin-form-builder/types';
import type { Control, FieldErrorsImpl } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { Controller } from 'react-hook-form';

import { Error } from '../Error';
import { Width } from '../Width';

// Type spécifique pour les options du select
type SelectFieldOption = {
  label: string;
  value: string;
};

// Définition stricte des valeurs du formulaire
type FormValues = Record<string, string>;

export const Select: React.FC<
  SelectField & {
    control: Control<FormValues>; // ✅ Remplace `FieldValues, any`
    errors: Partial<FieldErrorsImpl<FormValues>>; // ✅ Remplace `[x: string]: any;`
  }
> = ({ name, control, errors, label, options, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t: SelectFieldOption) => t.value === value);

          return (
            <SelectComponent onValueChange={onChange} value={controlledValue?.value}>
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }: SelectFieldOption) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectComponent>
          );
        }}
        rules={{ required }}
      />
      {required && errors[name] && <Error />}
    </Width>
  );
};
