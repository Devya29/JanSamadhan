export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>);

}