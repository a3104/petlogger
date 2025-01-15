import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>
        <h1>My Homepage</h1>
        <p>My Homepage content.</p>

        <Button variant="contained">test</Button>
        <Link href="/register">Link</Link>
      </div>
    </div>
  );
}
