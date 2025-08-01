import Heading from "@/components/ui/heading";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <Heading align="center">Local Event Planner & RSVP Tracker</Heading>

      <div className="flex gap-4">
        <Link
          href="/events/my-events"
          className="px-6 py-2 bg-complementary text-white rounded hover:bg-primary transition"
        >
          My Events
        </Link>

        <Link
          href="/public-events"
          className="px-6 py-2 bg-complementary text-white rounded hover:bg-primary transitio"
        >
          Public Events
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
