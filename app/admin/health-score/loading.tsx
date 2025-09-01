export default function HealthScoreLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-48 h-8 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="w-24 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-28 h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Dashboard Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-16 h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-full h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="w-8 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-40 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-40 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-40 h-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="w-40 h-10 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Health Score Cards Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-3 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-3 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="text-center">
                    <div className="w-16 h-3 bg-gray-300 rounded animate-pulse mx-auto mb-1"></div>
                    <div className="w-8 h-5 bg-gray-300 rounded animate-pulse mx-auto"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-32 h-3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-full h-8 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="w-32 h-3 bg-gray-300 rounded animate-pulse mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
