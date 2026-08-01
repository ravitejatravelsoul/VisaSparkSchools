export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Escaping "<" prevents a stray "</script>" inside a string value (there
  // are none in our own static content today, but this is cheap insurance)
  // from prematurely closing the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
