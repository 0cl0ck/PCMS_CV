import * as React from 'react';
import { cn } from 'src/utilities/cn';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return <textarea className={cn(className)} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';

export { Textarea };
