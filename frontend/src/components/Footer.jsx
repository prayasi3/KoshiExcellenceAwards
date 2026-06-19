import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Koshi Excellence Awards</p>
    </footer>
  );
}