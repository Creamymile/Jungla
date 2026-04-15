export default function Loading() {
  return (
    <>
      <section className="px-[5.5vw] pt-16 pb-[80px]">
        <div className="h-3 w-28 bg-black/5 rounded mb-6 animate-pulse" />
        <div className="h-12 w-72 bg-black/5 rounded animate-pulse" />
      </section>

      <section className="px-[5.5vw] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse border border-black/10 rounded-lg overflow-hidden">
              <div className="aspect-[4/3] bg-black/5" />
              <div className="p-6 space-y-3">
                <div className="h-5 w-2/3 bg-black/5 rounded" />
                <div className="h-3 w-1/3 bg-black/5 rounded" />
                <div className="h-4 w-1/2 bg-black/5 rounded" />
                <div className="h-10 w-full bg-black/5 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
