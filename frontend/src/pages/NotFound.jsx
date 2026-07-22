import { Home as HomeIcon, Compass } from "lucide-react";
import Container from "../components/layout/Container";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-[#0B1F3A] text-white">
      <Container className="text-center">
        <p className="font-heading text-8xl font-bold text-[#C9A84C]">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">This page couldn't be found</h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          The page you're looking for may have moved or no longer exists.
          Let's get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button to="/" icon={HomeIcon} iconPosition="left">
            Back to Home
          </Button>
          <Button to="/categories" variant="ghost" icon={Compass} iconPosition="left">
            Explore Categories
          </Button>
        </div>
      </Container>
    </section>
  );
}
