'use client'

import type React from 'react'

import { useState } from 'react'
import { Copy, Link2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useCreateLinkApiLinksPost } from '@/lib/api/generated/links/links'
import type { LinkCreate } from '@/lib/api/generated/models'

// Define the Zod schema for form validation
const urlShortenerSchema = z.object({
  longUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL including http:// or https://'),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, 'Custom alias can only contain letters, numbers, underscores and hyphens')
    .optional(),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  expirationEnabled: z.boolean().default(false),
  expirationDate: z.string().optional(),
})

// Infer the type from the schema
type URLShortenerFormValues = z.infer<typeof urlShortenerSchema>

export function URLShortenerForm() {
  const [shortUrl, setShortUrl] = useState('')

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<URLShortenerFormValues>({
    resolver: zodResolver(urlShortenerSchema),
    defaultValues: {
      longUrl: '',
      customAlias: '',
      isPasswordProtected: false,
      password: '',
      expirationEnabled: false,
      expirationDate: '',
    },
  })

  // Watch values for conditional rendering
  const isPasswordProtected = watch('isPasswordProtected')
  const expirationEnabled = watch('expirationEnabled')

  // Use the generated React Query mutation hook
  const createLinkMutation = useCreateLinkApiLinksPost({
    mutation: {
      onSuccess: data => {
        const baseUrl = process.env.NEXT_PUBLIC_LINK_BYTE_DOMAIN
        const shortUrl = `${baseUrl}/${data.short_code}`
        setShortUrl(shortUrl)
        toast.success('URL shortened successfully', {
          description: 'Your short URL is ready to use.',
        })
      },
      onError: _error => {
        toast.error('Error shortening URL', {
          description: 'Please try again with a valid URL.',
        })
      },
    },
  })

  // Form submission handler
  const onSubmit: SubmitHandler<URLShortenerFormValues> = (data) => {
    try {
      // Create the LinkCreate payload based on the form data
      const payload: LinkCreate = {
        original_url: data.longUrl,
        custom_alias: data.customAlias || undefined,
        is_password_protected: data.isPasswordProtected,
        password: data.isPasswordProtected ? data.password : undefined,
        expires_at:
          data.expirationEnabled && data.expirationDate ? new Date(data.expirationDate).toISOString() : undefined,
      }

      // Pass the data object as expected by the mutation
      createLinkMutation.mutate({
        data: payload,
      })
    } catch (_error) {
      toast.error('Error shortening URL', {
        description: 'Please try again with a valid URL.',
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success('Copied to clipboard', {
      description: 'The short URL has been copied to your clipboard.',
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="longUrl">Long URL</Label>
          <Input
            id="longUrl"
            type="url"
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            {...register('longUrl')}
            className={errors.longUrl ? 'border-destructive' : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'}
          />
          {errors.longUrl && <p className="text-sm text-destructive">{errors.longUrl.message}</p>}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger value="basic" className="data-[state=active]:bg-background">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
              Advanced
            </TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="customAlias">Custom Alias (Optional)</Label>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 text-sm text-muted-foreground">linkbyte.io/</div>
                <Input
                  id="customAlias"
                  placeholder="my-custom-link"
                  {...register('customAlias')}
                  className={errors.customAlias ? 'border-destructive' : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'}
                />
              </div>
              {errors.customAlias && (
                <p className="text-sm text-destructive">{errors.customAlias.message}</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPasswordProtected"
                  checked={isPasswordProtected}
                  onCheckedChange={(checked) => setValue('isPasswordProtected', checked === true)}
                  className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor="isPasswordProtected">Password Protection</Label>
              </div>
              {isPasswordProtected && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...register('password', {
                      required: isPasswordProtected ? 'Password is required when protection is enabled' : false,
                    })}
                    className="border-input focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                  {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="expirationEnabled"
                  checked={expirationEnabled}
                  onCheckedChange={(checked) => setValue('expirationEnabled', checked === true)}
                  className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor="expirationEnabled">Set Expiration Date</Label>
              </div>
              {expirationEnabled && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="datetime-local"
                    {...register('expirationDate')}
                    className="border-input focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Button
          type="submit"
          className="btn-accent-hover w-full bg-accent text-accent-foreground hover:bg-accent/90"
          disabled={createLinkMutation.isPending}
        >
          {createLinkMutation.isPending ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </form>

      {shortUrl && (
        <div className="mt-4 rounded-md border bg-muted/30 p-4">
          <div className="mb-2 text-sm font-medium">Your shortened URL:</div>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
              <Link2 className="h-4 w-4 text-primary" />
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-primary hover:underline"
              >
                {shortUrl}
              </a>
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={copyToClipboard}
              className="border-primary/20 hover:border-primary/50 hover:bg-primary/5"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy to clipboard</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
