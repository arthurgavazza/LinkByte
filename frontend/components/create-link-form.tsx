'use client'

import type React from 'react'

import { useState } from 'react'
import { CalendarIcon, Copy, Link2, Loader2, Plus, X } from 'lucide-react'
import { format } from 'date-fns'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { shortenUrl } from '@/lib/actions'
import { useCreateLinkApiLinksPost } from '@/lib/api/generated/links/links'

// Define the Zod schema for form validation
const createLinkSchema = z.object({
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
  expirationDate: z.date().optional(),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed').default([]),
})

// Infer the type from the schema
type CreateLinkFormValues = z.infer<typeof createLinkSchema>

export function CreateLinkForm() {
  const [shortUrl, setShortUrl] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')

  const { mutateAsync: createLink, isPending: isCreatingLink } = useCreateLinkApiLinksPost()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      longUrl: '',
      customAlias: '',
      isPasswordProtected: false,
      password: '',
      expirationEnabled: false,
      expirationDate: undefined,
      tags: [],
    },
  })

  // Watch values for conditional rendering
  const isPasswordProtected = watch('isPasswordProtected')
  const expirationEnabled = watch('expirationEnabled')

  // Form submission handler
  const onSubmit: SubmitHandler<CreateLinkFormValues> = async (data) => {
    try {
      // In a real app, this would call the actual API
      const result = await createLink({
        data: {
          original_url: data.longUrl,
          custom_alias: data.customAlias || undefined,
          is_password_protected: data.isPasswordProtected,
          password: data.isPasswordProtected ? data.password : undefined,
          expires_at: data.expirationDate ? data.expirationDate.toISOString() : undefined,
          metadata: {
            tags: data.tags,
          },
        }
      })

      setShortUrl(result.short_code)
      toast.success('URL shortened successfully', {
        description: 'Your short URL is ready to use.',
      })
    } catch (error) {
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

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag) && tags.length < 5) {
      const newTags = [...tags, currentTag]
      setTags(newTags)
      setValue('tags', newTags)
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    setTags(newTags)
    setValue('tags', newTags)
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold tracking-tight">Create New Link</h3>
        <p className="text-sm text-muted-foreground">
          Shorten your URL and customize it with additional options.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="longUrl">Long URL</Label>
          <Input
            id="longUrl"
            type="url"
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            {...register('longUrl')}
            className={cn(
              'border-input focus:border-primary focus:ring-1 focus:ring-primary/20',
              errors.longUrl &&
                'border-destructive focus:border-destructive focus:ring-destructive/20'
            )}
          />
          {errors.longUrl && <p className="text-sm text-destructive">{errors.longUrl.message}</p>}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger value="basic" className="data-[state=active]:bg-background">
              Basic
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
              Advanced
            </TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:bg-background">
              Tracking
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
                  className={cn(
                    'border-input focus:border-primary focus:ring-1 focus:ring-primary/20',
                    errors.customAlias &&
                      'border-destructive focus:border-destructive focus:ring-destructive/20'
                  )}
                />
              </div>
              {errors.customAlias && (
                <p className="text-sm text-destructive">{errors.customAlias.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Leave empty to generate a random short code.
              </p>
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
                    className={cn(
                      'border-input focus:border-primary focus:ring-1 focus:ring-primary/20',
                      errors.password &&
                        'border-destructive focus:border-destructive focus:ring-destructive/20'
                    )}
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !watch('expirationDate') && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {watch('expirationDate') ? (
                          format(watch('expirationDate') as Date, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={watch('expirationDate')}
                        onSelect={(date) => date && setValue('expirationDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 text-xs">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addTag}
                    disabled={!currentTag || tags.length >= 5}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </div>
                {tags.length >= 5 && (
                  <p className="text-xs text-muted-foreground">Maximum of 5 tags allowed.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Shortening...
            </>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </form>

      {shortUrl && (
        <div className="rounded-md border bg-muted/30 p-4">
          <div className="mb-2 font-medium">Your shortened URL:</div>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-md border bg-background px-3 py-2">
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
