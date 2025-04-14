'use client'

import Link from 'next/link'

import type React from 'react'

import { useState, useEffect } from 'react'
import { CalendarIcon, Loader2, Plus, X } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

// Define the Zod schema for form validation
const editLinkSchema = z.object({
  longUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL including http:// or https://'),
  customAlias: z
    .string()
    .min(1, 'Custom alias is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Custom alias can only contain letters, numbers, underscores and hyphens'),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  expirationEnabled: z.boolean().default(false),
  expirationDate: z.date().optional(),
  alias: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  enableTracking: z.boolean().default(true),
})

// Infer the type from the schema
type EditLinkFormValues = z.infer<typeof editLinkSchema>

interface EditLinkFormProps {
  linkId: string
}

export function EditLinkForm({ linkId }: EditLinkFormProps) {
  const [isFetching, setIsFetching] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditLinkFormValues>({
    resolver: zodResolver(editLinkSchema),
    defaultValues: {
      longUrl: '',
      customAlias: '',
      isPasswordProtected: false,
      password: '',
      expirationEnabled: false,
      expirationDate: undefined,
      alias: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmTerm: '',
      utmContent: '',
      enableTracking: true,
    },
  })

  // Watch values for conditional rendering
  const isPasswordProtected = watch('isPasswordProtected')
  const expirationEnabled = watch('expirationEnabled')

  // Simulate fetching link data
  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        // In a real app, you would fetch the link data based on the linkId
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Mock data
        const mockData = {
          longUrl: 'https://example.com/products/awesome-product-with-very-long-url',
          customAlias: 'product',
          isPasswordProtected: false,
          password: '',
          expirationEnabled: false,
          expirationDate: undefined,
          tags: ['marketing', 'product'],
          alias: 'Product Page',
          utmSource: 'linkbyte',
          utmMedium: 'shortlink',
          utmCampaign: 'spring_sale',
          utmTerm: '',
          utmContent: '',
          enableTracking: true,
        }

        // Reset form with fetched data
        reset(mockData)
        setTags(mockData.tags)
      } catch (error) {
        toast.error('Error fetching link data', {
          description: 'Could not load the link details. Please try again.',
        })
      } finally {
        setIsFetching(false)
      }
    }

    fetchLinkData()
  }, [linkId, reset])

  // Form submission handler
  const onSubmit: SubmitHandler<EditLinkFormValues> = async (data) => {
    try {
      // In a real app, this would call an API to update the link
      await new Promise(resolve => setTimeout(resolve, 1500))

      setShowSuccess(true)

      toast.success('Link updated successfully', {
        description: 'Your link settings have been updated.',
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      toast.error('Error updating link', {
        description: 'Could not update the link. Please try again.',
      })
    }
  }

  const addTag = () => {
    if (
      currentTag &&
      !tags.includes(currentTag) &&
      tags.length < 5
    ) {
      const newTags = [...tags, currentTag]
      setTags(newTags)
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading link data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
          <AlertTitle className="text-green-800 dark:text-green-300">
            Link updated successfully
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400">
            Your link settings have been updated and are now live.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="longUrl">Destination URL</Label>
            <Input
              id="longUrl"
              type="url"
              placeholder="https://example.com/your-destination-url"
              {...register('longUrl')}
              className={cn(
                'border-input focus:border-primary focus:ring-1 focus:ring-primary/20',
                errors.longUrl &&
                  'border-destructive focus:border-destructive focus:ring-destructive/20'
              )}
            />
            {errors.longUrl && <p className="text-sm text-destructive">{errors.longUrl.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customAlias">Custom Alias</Label>
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
          </div>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="alias">Link Name (Internal)</Label>
                <Input
                  id="alias"
                  placeholder="e.g. Product Page"
                  {...register('alias')}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag} tag</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={e => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="border-input focus:border-primary focus:ring-1 focus:ring-primary/20"
                    disabled={tags.length >= 5}
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
                <p className="text-xs text-muted-foreground">
                  Add up to 5 tags to organize your links.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tracking" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableTracking" className="mb-1 block">
                    Enable Tracking
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Collect analytics data on clicks and visitors
                  </p>
                </div>
                <Switch
                  id="enableTracking"
                  checked={watch('enableTracking')}
                  onCheckedChange={(checked) => setValue('enableTracking', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>UTM Parameters</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="utmSource" className="text-xs">
                      Source
                    </Label>
                    <Input
                      id="utmSource"
                      placeholder="e.g. newsletter"
                      {...register('utmSource')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utmMedium" className="text-xs">
                      Medium
                    </Label>
                    <Input
                      id="utmMedium"
                      placeholder="e.g. email"
                      {...register('utmMedium')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utmCampaign" className="text-xs">
                      Campaign
                    </Label>
                    <Input
                      id="utmCampaign"
                      placeholder="e.g. spring_sale"
                      {...register('utmCampaign')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utmTerm" className="text-xs">
                      Term
                    </Label>
                    <Input
                      id="utmTerm"
                      placeholder="e.g. running+shoes"
                      {...register('utmTerm')}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="utmContent" className="text-xs">
                      Content
                    </Label>
                    <Input
                      id="utmContent"
                      placeholder="e.g. logolink"
                      {...register('utmContent')}
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  These parameters will be added to the destination URL when the link is clicked.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="space-y-4 py-4">
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
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
