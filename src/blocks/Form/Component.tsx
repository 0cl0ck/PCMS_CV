'use client';
import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Control, FieldErrors, FormProvider, useForm, UseFormRegister } from 'react-hook-form';

import { getClientSideURL } from '@/utilities/getURL';
import { buildInitialFormState } from './buildInitialFormState';
import { fields } from './fields';

export type FormValues = Record<string, unknown>;

export interface Data {
  [key: string]: unknown;
}

export type FormBlockType = {
  blockName?: string;
  blockType?: 'formBlock';
  enableIntro: boolean;
  form: FormType;
  introContent?: SerializedEditorState;
};

type FieldComponentProps = {
  form: FormType;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
} & { blockType: string; name?: string }; // `name` devient optionnel

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props;

  const formMethods = useForm<FormValues>({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<{ message: string; status?: string } | undefined>();
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: Data) => {
      setError(undefined);

      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value,
      }));

      // delay loading indicator by 1s
      const loadingTimerID = setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formID,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        const res = await req.json();

        clearTimeout(loadingTimerID);

        if (req.status >= 400) {
          setIsLoading(false);
          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: res.status,
          });
          return;
        }

        setIsLoading(false);
        setHasSubmitted(true);

        if (confirmationType === 'redirect' && redirect) {
          const { url } = redirect;
          if (url) router.push(url);
        }
      } catch (err) {
        console.warn(err);
        setIsLoading(false);
        setError({ message: 'Something went wrong.' });
      }
    },
    [router, formID, redirect, confirmationType],
  );

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps?.fields?.map((field, index) => {
                  const FieldComponent = fields[field.blockType] as React.FC<
                    Partial<FieldComponentProps>
                  >;

                  if (FieldComponent) {
                    return (
                      <div className="mb-6 last:mb-0" key={index}>
                        <FieldComponent
                          form={formFromProps}
                          {...field}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  );
};

