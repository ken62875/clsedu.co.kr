export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded mb-6" />
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-7 w-3/4 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
        <div className="p-6 space-y-3">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-11/12 bg-gray-100 rounded" />
          <div className="h-4 w-10/12 bg-gray-100 rounded" />
          <div className="h-4 w-9/12 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
