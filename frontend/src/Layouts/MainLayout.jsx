import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: {
    minHeight: "80vh",
    padding: "24px",
  }
};