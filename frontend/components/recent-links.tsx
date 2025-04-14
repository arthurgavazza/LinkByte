'use client'

import { Copy, ExternalLink, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'

interface RecentLinksProps {
  filter?: 'recent' | 'popular'
}

export function RecentLinks({ filter }: RecentLinksProps) {
  // This would fetch data from your API in a real application
  const links = [
    {
      id: '1',
      shortUrl: 'linkbyte.io/product',
      longUrl: 'https://example.com/products/awesome-product-with-very-long-url',
      clicks: 1234,
      createdAt: '2023-04-15T10:30:00Z',
    },
    {
      id: '2',
      shortUrl: 'linkbyte.io/sale',
      longUrl: 'https://example.com/special-sale-spring-collection-2023',
      clicks: 987,
      createdAt: '2023-04-14T14:20:00Z',
    },
    {
      id: '3',
      shortUrl: 'linkbyte.io/blog',
      longUrl: 'https://example.com/blog/top-10-tips-for-productivity',
      clicks: 654,
      createdAt: '2023-04-13T09:15:00Z',
    },
    {
      id: '4',
      shortUrl: 'linkbyte.io/event',
      longUrl: 'https://example.com/events/annual-conference-registration',
      clicks: 321,
      createdAt: '2023-04-12T16:45:00Z',
    },
  ]

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('Copied to clipboard', {
      description: 'The short URL has been copied to your clipboard.',
    })
  }

  return (
    <div className="rounded-md border bg-card shadow-sm">
      <div className="grid grid-cols-1 border-b p-4 text-sm font-medium text-muted-foreground md:grid-cols-4">
        <div>Short URL</div>
        <div className="col-span-2 hidden md:block">Original URL</div>
        <div className="text-right">Clicks</div>
      </div>
      <div className="divide-y">
        {links.map(link => (
          <div
            key={link.id}
            className="grid grid-cols-1 items-center p-4 transition-colors hover:bg-muted/30 md:grid-cols-4"
          >
            <div className="flex items-center gap-2">
              <div className="font-medium text-primary">{link.shortUrl}</div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyToClipboard(link.shortUrl)}
                className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            <div className="col-span-2 hidden truncate text-muted-foreground md:block">
              {link.longUrl}
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="font-medium">{link.clicks.toLocaleString()}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => copyToClipboard(link.shortUrl)}
                    className="cursor-pointer"
                  >
                    <Copy className="mr-2 h-4 w-4 text-primary" />
                    Copy short URL
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`https://${link.shortUrl}`}
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4 text-secondary" />
                      Open link
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/analytics/link/${link.id}`} className="cursor-pointer">
                      View analytics
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/edit/${link.id}`} className="cursor-pointer">
                      Edit link
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
