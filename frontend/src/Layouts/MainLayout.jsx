import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { EditionsProvider } from "../context/EditionsContext";

export default function MainLayout({ children }) {
  return (
    <EditionsProvider>
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </EditionsProvider>
  );
}
