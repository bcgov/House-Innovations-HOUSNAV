// repo
import Link from "@repo/ui/link";

export default function NotFound() {
  // TODO - need a design for this
  return (
    <div className="u-container">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
