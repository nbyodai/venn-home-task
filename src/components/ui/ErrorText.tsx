export function ErrorText({ error }: { error: string }) {
  return <p className="text-red-500 text-sm ml-1">{error}</p>;
}
