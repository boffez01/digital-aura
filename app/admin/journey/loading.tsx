"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function JourneyLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Analytics Dashboard Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Journey Visualization Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="relative overflow-x-auto pb-8">
              <div className="flex items-center space-x-8 min-w-max">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="relative">
                    {/* Stage Card Skeleton */}
                    <Card className="w-80">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="space-y-2">
                              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center space-y-1">
                            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                          </div>
                          <div className="text-center space-y-1">
                            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                              <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Flow Arrow Skeleton */}
                    {i < 6 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex-1 space-y-2">
                          <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
