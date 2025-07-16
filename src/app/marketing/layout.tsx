import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="marketing" />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  )
}
