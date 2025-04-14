'use client'
import { Copy, ExternalLink, Lock, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'

interface LinkTableProps {
  filter?: 'active' | 'expired' | 'protected'
}

export function LinkTable({ filter }: LinkTableProps) {
  // This would fetch data from your API in a real application
  const links = [
    {
      id: '1',
      shortUrl: 'linkbyte.io/product',
      longUrl: 'https://example.com/products/awesome-product-with-very-long-url',
      clicks: 1234,
      createdAt: '2023-04-15T10:30:00Z',
      expiresAt: null,
      isProtected: false,
      tags: ['marketing', 'product'],
    },
    {
      id: '2',
      shortUrl: 'linkbyte.io/sale',
      longUrl: 'https://example.com/special-sale-spring-collection-2023',
      clicks: 987,
      createdAt: '2023-04-14T14:20:00Z',
      expiresAt: '2023-05-14T14:20:00Z',
      isProtected: false,
      tags: ['marketing', 'sale'],
    },
    {
      id: '3',
      shortUrl: 'linkbyte.io/blog',
      longUrl: 'https://example.com/blog/top-10-tips-for-productivity',
      clicks: 654,
      createdAt: '2023-04-13T09:15:00Z',
      expiresAt: null,
      isProtected: true,
      tags: ['content', 'blog'],
    },
    {
      id: '4',
      shortUrl: 'linkbyte.io/event',
      longUrl: 'https://example.com/events/annual-conference-registration',
      clicks: 321,
      createdAt: '2023-04-12T16:45:00Z',
      expiresAt: '2023-06-01T00:00:00Z',
      isProtected: false,
      tags: ['event'],
    },
    {
      id: '5',
      shortUrl: 'linkbyte.io/promo',
      longUrl: 'https://example.com/promotions/summer-special-discount',
      clicks: 210,
      createdAt: '2023-04-11T11:30:00Z',
      expiresAt: null,
      isProtected: true,
      tags: ['marketing', 'promotion'],
    },
  ]

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('Copied to clipboard', {
      description: 'The short URL has been copied to your clipboard.',
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short URL</TableHead>
            <TableHead className="hidden md:table-cell">Original URL</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="hidden md:table-cell">Expires</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map(link => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {link.shortUrl}
                  {link.isProtected && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
              </TableCell>
              <TableCell className="hidden max-w-[200px] truncate md:table-cell">
                {link.longUrl}
              </TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(link.createdAt)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {link.expiresAt ? formatDate(link.expiresAt) : 'Never'}
              </TableCell>
              <TableCell>{link.clicks.toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {link.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(`https://${link.shortUrl}`)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`https://${link.shortUrl}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Open</span>
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/analytics/link/${link.id}`}>View analytics</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/edit/${link.id}`}>Edit link</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
