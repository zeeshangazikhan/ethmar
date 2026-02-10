import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fffcf8]" lang="en">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                The page you are looking for does not exist.
              </p>

              <Link 
                href="/en" 
                className="mt-6 inline-block text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Go back home
              </Link>
            </CardContent>
          </Card>
        </div>
  )
}
