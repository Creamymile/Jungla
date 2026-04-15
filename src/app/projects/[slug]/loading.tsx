export default function Loading() {
  return (
    <div className="px-[5.5vw] pt-16 pb-[120px]">
      {/* Cover image skeleton */}
      <div className="aspect-[16/9] lg:aspect-[21/9] bg-black/5 rounded-lg mb-12 animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main content */}
        <div className="lg:col-span-8 space-y-6 animate-pulse">
          <div className="h-3 w-24 bg-black/5 rounded" />
          <div className="h-10 w-3/4 bg-black/5 rounded" />
          <div className="h-4 w-full bg-black/5 rounded" />
          <div className="h-4 w-5/6 bg-black/5 rounded" />
          <div className="h-4 w-2/3 bg-black/5 rounded" />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 animate-pulse">
          <div className="border border-black/10 p-6 space-y-4">
            <div className="h-6 w-1/2 bg-black/5 rounded" />
            <div className="h-4 w-full bg-black/5 rounded" />
            <div className="h-4 w-3/4 bg-black/5 rounded" />
            <div className="h-12 w-full bg-black/5 rounded mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
