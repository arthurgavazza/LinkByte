import { notFound, redirect } from 'next/navigation'
import { headers } from 'next/headers'

// Directly fetch from API with server component
async function resolveShortLink(shortCode: string) {
  try {
    // Get request headers for analytics
    const headersList = await headers()
    // Forward relevant headers to the backend
    const forwardHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Safely extract headers
    const userAgent = headersList.get('user-agent')
    if (userAgent) forwardHeaders['User-Agent'] = userAgent
    
    const referer = headersList.get('referer')
    if (referer) forwardHeaders['Referer'] = referer
    
    const forwardedFor = headersList.get('x-forwarded-for')
    if (forwardedFor) forwardHeaders['X-Forwarded-For'] = forwardedFor
    
    const realIp = headersList.get('x-real-ip')
    if (realIp) forwardHeaders['X-Real-IP'] = realIp
    
    // Call backend API to resolve the short URL and track click in one request
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${shortCode}/resolve`, {
      method: 'GET',
      headers: forwardHeaders,
      cache: 'no-store', // Don't cache this response
    })

    if (!response.ok) {
      if (response.status === 404) {
        return notFound()
      }
      
      if (response.status === 410) {
        throw new Error('Link has expired')
      }
      
      if (response.status === 401) {
        // If password protected, redirect to password page
        return { isPasswordProtected: true }
      }
      
      throw new Error(`Error resolving link: ${response.statusText}`)
    }

    const data = await response.json()
    return { originalUrl: data.original_url }
  } catch (error) {
    console.error('Error resolving link:', error)
    throw error
  }
}

// Server Component - optimized for direct redirection
export default async function ShortCodeRedirect({ params }: { params: { shortCode: string } }) {
  const { shortCode } = params
  
  // Get the original URL with server-side click tracking
  const result = await resolveShortLink(shortCode)
  
  // Handle password protected links
  if ('isPasswordProtected' in result) {
    // Redirect to password entry page
    redirect(`/${shortCode}/password`)
  }
  
  // Redirect to the original URL if found
  if ('originalUrl' in result) {
    // Use HTTP 301 for permanent redirect (better for SEO and browser caching)
    redirect(result.originalUrl)
  }
  
  // This should not be reached due to notFound() in resolveShortLink
  return notFound()
}

// Generate static 404 page for invalid short codes
export function generateStaticParams() {
  return []
} 