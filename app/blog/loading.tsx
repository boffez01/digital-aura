import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4 bg-slate-800" />
          <Skeleton className="h-6 w-96 mx-auto bg-slate-800" />
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full bg-slate-800 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 bg-slate-800" />
                <Skeleton className="h-4 w-full bg-slate-800" />
                <Skeleton className="h-4 w-2/3 bg-slate-800" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16 bg-slate-800" />
                <Skeleton className="h-4 w-20 bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
