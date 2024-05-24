export const BounceLoading = () => (
  <div className="flex space-x-2" data-testid="bounce-loading">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="size-2 animate-bounce rounded-full bg-current"
        style={{ animationDelay: `${index * 0.2}s` }}
      />
    ))}
  </div>
)
