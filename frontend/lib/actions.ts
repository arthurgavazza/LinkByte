'use server'

interface ShortenUrlParams {
  longUrl: string
  customAlias?: string
  password?: string
  expirationDate?: string
}

interface ShortenUrlResult {
  shortUrl: string
  longUrl: string
  id: string
}

export async function shortenUrl(params: ShortenUrlParams): Promise<ShortenUrlResult> {
  // In a real application, this would interact with a database
  // For this example, we'll just return a mock response

  const { longUrl, customAlias } = params

  // Validate URL
  try {
    new URL(longUrl)
  } catch (error) {
    throw new Error('Invalid URL')
  }

  // Generate a short code or use custom alias
  const shortCode = customAlias || generateRandomCode(6)

  // In a real app, you would save this to a database

  return {
    shortUrl: `linksnip.com/${shortCode}`,
    longUrl,
    id: Math.random().toString(36).substring(2, 9),
  }
}

function generateRandomCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
