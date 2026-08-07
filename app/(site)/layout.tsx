import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProgressHydrator } from "@/components/layout/progress-hydrator";
import { AuthProvider } from "@/components/auth/auth-provider";
import { HelpNavigator } from "@/components/help/help-navigator";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Order matters: ProgressHydrator's mount effect must hydrate guest
          state from localStorage before AuthProvider's effect can safely
          snapshot it for a guest-to-account merge -- see AuthProvider's docstring. */}
      <ProgressHydrator />
      <AuthProvider />
      {/* Hidden when printing (e.g. a certificate) -- site chrome has no place on a printed page. */}
      <div className="print:hidden">
        <Header />
      </div>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
      {/* Bottom-left, global (every page) -- deliberately opposite corner from
          the lesson page's bottom-right AI tutor launcher so the two never
          overlap. */}
      <HelpNavigator />
    </>
  );
}
