'use client';
import RichText from '@/components/RichText';
import { cn } from '@/lib/utils';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  faqs: Array<{
    question: string;
    answer: SerializedEditorState;
  }>;
};

export const FAQ: React.FC<Props> = ({ faqs }) => {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-20 md:grid-cols-2 md:px-8 md:py-40">
      <h2 className="text-center text-4xl font-bold tracking-tight text-neutral-600 dark:text-neutral-50 md:text-left md:text-6xl">
        FAQ
      </h2>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string;
  answer: SerializedEditorState;
  open: string | null;
  setOpen: (open: string | null) => void;
}) => {
  const isOpen = open === question;

  return (
    <div
      className="cursor-pointer py-4"
      onClick={() => {
        if (isOpen) {
          setOpen(null);
        } else {
          setOpen(question);
        }
      }}
    >
      <div className="flex items-start">
        <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
          <IconPlus
            className={cn(
              'absolute inset-0 h-6 w-6 transform text-blue-500 transition-all duration-200',
              isOpen && 'rotate-90 scale-0',
            )}
          />
          <IconMinus
            className={cn(
              'absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-blue-500 transition-all duration-200',
              isOpen && 'rotate-0 scale-100',
            )}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200">{question}</h3>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden text-neutral-500 dark:text-neutral-400"
              >
                <div className="rich-text">
                  <RichText data={answer} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

