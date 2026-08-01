import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Container className="flex flex-col items-center py-24 text-center">
          <p className="text-sm font-semibold tracking-wide text-(--color-ink-faint) uppercase">
            404
          </p>
          <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
          <p className="mt-2 max-w-md text-(--color-ink-muted)">
            That page doesn&apos;t exist, or may have moved. Try searching, or head back to the
            homepage.
          </p>
          <div className="mt-6 flex gap-3">
            <LinkButton href="/">Go home</LinkButton>
            <LinkButton href="/search" variant="secondary">
              Search
            </LinkButton>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
