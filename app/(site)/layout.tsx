import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressHydrator } from "@/components/layout/progress-hydrator";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressHydrator />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
