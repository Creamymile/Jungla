export default function Loading() {
  return (
    <>
      <section className="px-[5.5vw] pt-16 pb-[80px]">
        <div className="h-3 w-24 bg-black/5 rounded mb-6 animate-pulse" />
        <div className="h-12 w-80 bg-black/5 rounded animate-pulse" />
      </section>

      <section className="px-[5.5vw] pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-black/5 rounded-lg mb-4" />
              <div className="h-4 w-3/4 bg-black/5 rounded mb-2" />
              <div className="h-3 w-1/2 bg-black/5 rounded" />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
