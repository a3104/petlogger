import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>My Homepage</h1>
      <p>My Homepage content.</p>

      <Button variant="contained">test</Button>
      <Link href="/register">
        <Button variant="contained">Register Cat Information</Button>
      </Link>
    </div>
  );
}
