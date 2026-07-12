import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "../src/admin/components/ScrollToTop";


export default function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>

  );
}