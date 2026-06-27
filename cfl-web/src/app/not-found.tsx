import ThemedStatePage from "@/components/state/ThemedStatePage";

export default function NotFound() {
  return (
    <ThemedStatePage
      code="404"
      title="Page not found"
      message="That route is not part of the CommonFunLib workspace. Head home or step back to the last tool you were using."
    />
  );
}
