// 서버 컴포넌트용 정적 스켈레톤 — Client bundle 에 포함되지 않습니다.

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-7 bg-gray-100 rounded w-40" />
      <div className="h-4 bg-gray-100 rounded w-72" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-48 bg-gray-100 rounded-xl" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-6 animate-pulse">
      <PageHeaderSkeleton />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-6 animate-pulse">
      <PageHeaderSkeleton />
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="h-12 bg-slate-100" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-14 bg-white border-t border-gray-50" />
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <PageHeaderSkeleton />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="h-10 bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
