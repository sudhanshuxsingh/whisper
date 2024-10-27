'use client';

import React, { forwardRef, Fragment, RefObject, useMemo, useRef } from 'react';

import { Highlight, Language, RenderProps, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useClipboard } from '@/hooks/useClipboard';
import { CopyButtonIcon, SuccessButton } from './copy-to-clipboard-button';

type CodeWindowProps = {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  bodyClassName?: string;
  codeWindowClassName?: string;
} & CodeWindowCodeProps;

const CodeWindow = ({
  children,
  className,
  border = true,
  bodyClassName,
  language,
  codeWindowClassName,
  showLineNumbers = true,
}: CodeWindowProps) => {
  const ref = useRef<HTMLPreElement>(null);
  const { onCopy, hasCopied } = useClipboard(1000);
  const handleCopy = () => {
    if (ref.current) {
      const textToCopy = ref.current.innerText;
      onCopy(textToCopy);
    }
  };

  return (
    <div
      className={cn(
        'relative flex bg-secondary shadow-md dark:bg-secondary/10 dark:ring-1 dark:ring-inset dark:ring-primary/10 dark:backdrop-blur sm:rounded-md',
        className
      )}
    >
      <div className="sticky top-0 flex w-full flex-col">
        <div className={cn('flex items-center', border && 'border-b')}>
          <div className="flex h-9 items-center space-x-1.5 px-3">
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
          </div>
          <div className="ml-auto mr-4" onClick={handleCopy}>
            {hasCopied ? <SuccessButton /> : <CopyButtonIcon />}
          </div>
        </div>
        {/* <div className="h-px bg-gradient-to-r from-sky-300/0 via-sky-300/20 to-sky-300/0" /> */}
        <div
          className={cn(
            'relative flex min-h-0 flex-auto flex-col bg-background dark:bg-inherit',
            bodyClassName
          )}
        >
          <CodeWindowCode
            language={language ?? 'js'}
            ref={ref}
            className={codeWindowClassName}
            showLineNumbers={showLineNumbers}
          >
            {children}
          </CodeWindowCode>
        </div>
      </div>
    </div>
  );
};

type CodeWindowCodeProps = {
  lines?: number;
  showLineNumbers?: boolean;
  initialLineNumber?: number;
  overflow?: boolean | 'x' | 'y';
  wrap?: boolean;
  className?: string;
  children: string;
  language: Language;
  ref?: RefObject<HTMLPreElement>;
};

export const CodeWindowCode = forwardRef<HTMLPreElement, CodeWindowCodeProps>(
  (
    {
      showLineNumbers = true,
      overflow = true,
      wrap = false,
      className,
      children,
      language,
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();

    const theme = useMemo(() => {
      return resolvedTheme === 'light' ? themes.vsLight : themes.dracula;
    }, [resolvedTheme]);

    return (
      <div
        className={cn(
          'flex h-[40rem] min-h-0 w-full flex-auto overflow-auto text-xs',
          {
            'overflow-auto': overflow === true || overflow === 'y',
          },
          className
        )}
      >
        <div className="relative w-full flex-auto">
          <Highlight code={children} language={language} theme={theme}>
            {({
              className,
              tokens,
              getLineProps,
              getTokenProps,
            }: RenderProps) => (
              <pre
                className={cn(
                  'flex min-h-full text-sm leading-6',
                  language && `language-${language}`,
                  className
                )}
              >
                {showLineNumbers && (
                  <div
                    aria-hidden="true"
                    className="hidden w-[3.125rem] flex-none select-none py-4 pr-4 text-right text-slate-600 md:block"
                  >
                    {Array.from({ length: tokens.length ?? 0 }).map((_, i) =>
                      i === 0 ? (
                        i + 1
                      ) : (
                        <Fragment key={i + 1}>
                          <br />
                          {i + 1}
                        </Fragment>
                      )
                    )}
                  </div>
                )}
                <code
                  className={cn(
                    'relative block flex-auto text-slate-50',
                    {
                      'overflow-auto': overflow === true || overflow === 'x',
                      'whitespace-pre-wrap': wrap,
                      'p-4': showLineNumbers,
                    },
                    language && `language-${language}`
                  )}
                  ref={ref}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => {
                        return <span key={key} {...getTokenProps({ token })} />;
                      })}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    );
  }
);
CodeWindowCode.displayName = 'CodeWindowCode';
export default CodeWindow;
