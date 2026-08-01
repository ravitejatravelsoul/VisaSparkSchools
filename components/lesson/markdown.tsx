import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-content max-w-none text-(--color-ink)">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => <h2 className="mt-6 mb-2 text-xl font-semibold" {...props} />,
          h2: (props) => <h3 className="mt-6 mb-2 text-lg font-semibold" {...props} />,
          h3: (props) => <h4 className="mt-4 mb-2 font-semibold" {...props} />,
          p: (props) => <p className="mb-4 leading-7 text-(--color-ink)" {...props} />,
          ul: (props) => <ul className="mb-4 ml-5 list-disc space-y-1" {...props} />,
          ol: (props) => <ol className="mb-4 ml-5 list-decimal space-y-1" {...props} />,
          li: (props) => <li className="leading-7" {...props} />,
          strong: (props) => <strong className="font-semibold text-(--color-ink)" {...props} />,
          a: (props) => (
            <a
              className="underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-brand)"
              target={props.href?.startsWith("http") ? "_blank" : undefined}
              rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = Boolean(className);
            if (isBlock) {
              return (
                <code
                  className={`block rounded-lg bg-(--color-code-bg) p-3 font-mono text-sm ${className ?? ""}`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded bg-(--color-code-bg) px-1.5 py-0.5 font-mono text-[0.9em]"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: (props) => (
            <pre
              tabIndex={0}
              role="region"
              aria-label="Code block"
              className="mb-4 overflow-x-auto"
              {...props}
            />
          ),
          table: (props) => (
            <div tabIndex={0} role="region" aria-label="Table" className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="border border-(--color-border) bg-(--color-canvas) px-3 py-2 text-left"
              {...props}
            />
          ),
          td: (props) => <td className="border border-(--color-border) px-3 py-2" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
