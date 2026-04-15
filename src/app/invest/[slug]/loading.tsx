export default function Loading() {
  return (
    <div className="px-[5.5vw] pt-16 pb-[120px]">
      <div className="h-3 w-32 bg-black/5 rounded mb-6 animate-pulse" />
      <div className="h-10 w-2/3 bg-black/5 rounded mb-8 animate-pulse" />
      <div className="aspect-[16/9] bg-black/5 rounded-lg mb-12 animate-pulse" />
      <div className="max-w-3xl space-y-4 animate-pulse">
        <div className="h-4 w-full bg-black/5 rounded" />
        <div className="h-4 w-5/6 bg-black/5 rounded" />
        <div className="h-4 w-2/3 bg-black/5 rounded" />
      </div>
    </div>
  )
}
