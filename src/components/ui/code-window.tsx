'use client';

import React, { Fragment, useMemo } from 'react';

import { Highlight, Language, RenderProps, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type CodeWindowProps = {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  bodyClassName?: string;
};

const CodeWindow = ({
  children,
  className,
  border = true,
  bodyClassName,
}: CodeWindowProps) => {
  return (
    <div
      className={cn(
        'relative flex h-[31.625rem] max-h-[60vh] overflow-hidden bg-secondary shadow-xl dark:bg-secondary/40 dark:ring-1 dark:ring-inset dark:ring-primary/10 dark:backdrop-blur sm:max-h-[none] sm:rounded-md lg:h-[34.6875rem] xl:h-[31.625rem]',
        className
      )}
    >
      <div className="relative flex w-full flex-col">
        <div className={cn('flex-none', border && 'border-b')}>
          <div className="flex h-9 items-center space-x-1.5 px-3">
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
            <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-muted-foreground/20" />
          </div>
          {/* <div className="h-px bg-gradient-to-r from-sky-300/0 via-sky-300/20 to-sky-300/0" /> */}
        </div>
        <div
          className={cn(
            'relative flex min-h-0 flex-auto flex-col bg-background dark:bg-inherit',
            bodyClassName
          )}
        >
          {children}
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
  code: string;
  language: Language;
};

export const CodeWindowCode = ({
  showLineNumbers = true,
  overflow = true,
  wrap = false,
  className,
  code,
  language,
}: CodeWindowCodeProps) => {
  const { resolvedTheme } = useTheme();

  const theme = useMemo(() => {
    return resolvedTheme === 'light' ? themes.vsLight : themes.dracula;
  }, [resolvedTheme]);

  return (
    <div
      className={cn(className, 'flex min-h-0 w-full flex-auto', {
        'overflow-auto': overflow === true || overflow === 'y',
      })}
    >
      <div className="relative w-full flex-auto">
        <Highlight code={code} language={language} theme={theme}>
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
};
export default CodeWindow;
