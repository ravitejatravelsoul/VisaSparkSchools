"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-(--color-ink-muted)">
        This page hit an unexpected error. You can try again, or head back to the homepage.
      </p>
      <Button type="button" onClick={reset} className="mt-6">
        Try again
      </Button>
    </Container>
  );
}
