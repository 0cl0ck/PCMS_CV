import * as React from 'react';
import { cn } from 'src/utilities/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return <textarea className={cn(className)} ref={ref} {...props} />;
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
