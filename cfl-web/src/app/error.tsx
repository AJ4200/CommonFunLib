"use client";

import ThemedStatePage from "@/components/state/ThemedStatePage";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ThemedStatePage
      code={error.digest ? `Error ${error.digest.slice(0, 8)}` : "Error"}
      title="Something went sideways"
      message="The app hit a runtime problem while loading this view. You can try again, go home, or step back to the previous screen."
      reset={reset}
    />
  );
}
