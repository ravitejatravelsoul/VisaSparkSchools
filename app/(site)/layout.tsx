import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressHydrator } from "@/components/layout/progress-hydrator";
import { AuthProvider } from "@/components/auth/auth-provider";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Order matters: ProgressHydrator's mount effect must hydrate guest
          state from localStorage before AuthProvider's effect can safely
          snapshot it for a guest-to-account merge -- see AuthProvider's docstring. */}
      <ProgressHydrator />
      <AuthProvider />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
