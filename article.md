# Leveraging MDC Files to Improve Development Workflow in Cursor

## What Are MDC Files?

MDC (Markdown Configuration) files are special documentation files used by Cursor AI to understand codebases and guide development. These files contain project-specific rules, patterns, and best practices that help the AI provide more contextual and relevant code suggestions and modifications.

When working with Cursor AI, these MDC files act as a knowledge base that shapes how the AI responds to your requests. They enable the AI to understand your project's architecture, coding standards, and patterns without having to analyze the entire codebase repeatedly.

## How MDC Files Enhance Development Workflow

MDC files significantly improve development workflow in Cursor by:

1. **Providing consistent patterns**: Ensure all team members follow the same code structure and patterns.
2. **Accelerating onboarding**: Help new developers understand project conventions quickly.
3. **Reducing cognitive load**: Document complex patterns so developers don't need to remember everything.
4. **Guiding AI assistance**: Enable Cursor AI to provide more relevant and accurate code suggestions.
5. **Enforcing best practices**: Codify project-specific standards and best practices.

## Organizing Rules with cursor-rules.mdc

The `cursor-rules.mdc` file serves as a meta-rule that helps organize and structure all other rules. It provides guidelines on how to:

- Structure rule content concisely (15-25 lines of content)
- Focus each rule on a single topic or technology
- Use bullet points instead of paragraphs
- Include minimal code examples
- Organize files with proper naming conventions

This meta-rule approach helps keep your rules organized and maintainable. By following the structure defined in `cursor-rules.mdc`, you ensure that all other rules remain focused, specific, and easy to update.

According to the rule, MDC files should be organized with proper prefixes:
- `core-`: Project-wide standards
- `fe-`: Frontend guidelines
- `be-`: Backend guidelines
- `test-`: Testing practices
- `tool-`: Tool-specific guidelines

This organization makes it easy to find relevant rules when needed and ensures that the AI can pick up the right context for different parts of your codebase.

## A Real-World Example: Analyzing the CreateLinkModal Component

Let's examine a real-world component to see how MDC rules can help improve code quality and adherence to project standards. Below is a `CreateLinkModal` component from our URL shortener application:

```tsx
"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Copy, Link2, Loader2, Plus, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { shortenUrl } from "@/lib/actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [longUrl, setLongUrl] = useState("")
  const [customAlias, setCustomAlias] = useState("")
  const [isPasswordProtected, setIsPasswordProtected] = useState(false)
  const [password, setPassword] = useState("")
  const [expirationEnabled, setExpirationEnabled] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [utmParams, setUtmParams] = useState({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  })
  const [errors, setErrors] = useState({
    longUrl: "",
    customAlias: "",
    password: "",
  })

  const resetForm = () => {
    setLongUrl("")
    setCustomAlias("")
    setIsPasswordProtected(false)
    setPassword("")
    setExpirationEnabled(false)
    setExpirationDate(undefined)
    setTags([])
    setCurrentTag("")
    setShortUrl("")
    setShowAdvanced(false)
    setUtmParams({
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    })
    setErrors({
      longUrl: "",
      customAlias: "",
      password: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validateForm = () => {
    const newErrors = {
      longUrl: "",
      customAlias: "",
      password: "",
    }
    let isValid = true

    // URL validation
    if (!longUrl) {
      newErrors.longUrl = "URL is required"
      isValid = false
    } else {
      try {
        new URL(longUrl)
      } catch (e) {
        newErrors.longUrl = "Please enter a valid URL including http:// or https://"
        isValid = false
      }
    }

    // Custom alias validation (optional)
    if (customAlias && !/^[a-zA-Z0-9_-]+$/.test(customAlias)) {
      newErrors.customAlias = "Custom alias can only contain letters, numbers, underscores and hyphens"
      isValid = false
    }

    // Password validation (if enabled)
    if (isPasswordProtected && !password) {
      newErrors.password = "Password is required when protection is enabled"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Construct the final URL with UTM parameters if provided
      let finalLongUrl = longUrl
      const utmParamsArray = []

      if (utmParams.source) utmParamsArray.push(`utm_source=${encodeURIComponent(utmParams.source)}`)
      if (utmParams.medium) utmParamsArray.push(`utm_medium=${encodeURIComponent(utmParams.medium)}`)
      if (utmParams.campaign) utmParamsArray.push(`utm_campaign=${encodeURIComponent(utmParams.campaign)}`)
      if (utmParams.term) utmParamsArray.push(`utm_term=${encodeURIComponent(utmParams.term)}`)
      if (utmParams.content) utmParamsArray.push(`utm_content=${encodeURIComponent(utmParams.content)}`)

      if (utmParamsArray.length > 0) {
        const separator = finalLongUrl.includes("?") ? "&" : "?"
        finalLongUrl = `${finalLongUrl}${separator}${utmParamsArray.join("&")}`
      }

      // In a real app, this would call the actual API
      const result = await shortenUrl({
        longUrl: finalLongUrl,
        customAlias: customAlias || undefined,
        password: isPasswordProtected ? password : undefined,
        expirationDate: expirationEnabled && expirationDate ? expirationDate.toISOString() : undefined,
      })

      setShortUrl(result.shortUrl)
      toast.success('URL shortened successfully', {
        description: 'Your short URL is ready to use.',
      })
    } catch (error) {
      toast.error('Error shortening URL', {
        description: 'Please try again with a valid URL.',
      })
    } finally {
      setIsLoading(false)
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
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>Shorten a URL and customize its settings.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="longUrl">Long URL</Label>
            <Input
              id="longUrl"
              type="url"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className={cn(
                "border-input focus:border-primary focus:ring-1 focus:ring-primary/20",
                errors.longUrl && "border-destructive focus:border-destructive focus:ring-destructive/20",
              )}
            />
            {errors.longUrl && <p className="text-sm text-destructive">{errors.longUrl}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customAlias">Custom Alias (Optional)</Label>
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 text-sm text-muted-foreground">linkbyte.io/</div>
              <Input
                id="customAlias"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className={cn(
                  "border-input focus:border-primary focus:ring-1 focus:ring-primary/20",
                  errors.customAlias && "border-destructive focus:border-destructive focus:ring-destructive/20",
                )}
              />
            </div>
            {errors.customAlias && <p className="text-sm text-destructive">{errors.customAlias}</p>}
            <p className="text-xs text-muted-foreground">Leave empty to generate a random short code.</p>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch id="advanced-settings" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
            <Label htmlFor="advanced-settings">Show Advanced Settings</Label>
          </div>

          {showAdvanced && (
            <Tabs defaultValue="protection" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1">
                <TabsTrigger value="protection" className="data-[state=active]:bg-background">
                  Protection
                </TabsTrigger>
                <TabsTrigger value="tracking" className="data-[state=active]:bg-background">
                  Tracking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="protection" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="password-protection"
                      checked={isPasswordProtected}
                      onCheckedChange={(checked) => setIsPasswordProtected(checked === true)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="password-protection">Password Protection</Label>
                  </div>
                  {isPasswordProtected && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cn(
                          "border-input focus:border-primary focus:ring-1 focus:ring-primary/20",
                          errors.password && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        )}
                      />
                      {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="expiration"
                      checked={expirationEnabled}
                      onCheckedChange={(checked) => setExpirationEnabled(checked === true)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="expiration">Set Expiration Date</Label>
                  </div>
                  {expirationEnabled && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="expiration-date">Expiration Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !expirationDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expirationDate ? format(expirationDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expirationDate}
                            onSelect={setExpirationDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (Optional)</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
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
                      id="tags"
                      placeholder="Add a tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
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
                  <p className="text-xs text-muted-foreground">Add up to 5 tags to organize your links.</p>
                </div>

                <div className="space-y-2">
                  <Label>UTM Parameters (Optional)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="utm-source" className="text-xs">
                        Source
                      </Label>
                      <Input
                        id="utm-source"
                        placeholder="google"
                        value={utmParams.source}
                        onChange={(e) => setUtmParams({ ...utmParams, source: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="utm-medium" className="text-xs">
                        Medium
                      </Label>
                      <Input
                        id="utm-medium"
                        placeholder="cpc"
                        value={utmParams.medium}
                        onChange={(e) => setUtmParams({ ...utmParams, medium: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="utm-campaign" className="text-xs">
                        Campaign
                      </Label>
                      <Input
                        id="utm-campaign"
                        placeholder="spring_sale"
                        value={utmParams.campaign}
                        onChange={(e) => setUtmParams({ ...utmParams, campaign: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="utm-term" className="text-xs">
                        Term
                      </Label>
                      <Input
                        id="utm-term"
                        placeholder="running+shoes"
                        value={utmParams.term}
                        onChange={(e) => setUtmParams({ ...utmParams, term: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="utm-content" className="text-xs">
                        Content
                      </Label>
                      <Input
                        id="utm-content"
                        placeholder="logolink"
                        value={utmParams.content}
                        onChange={(e) => setUtmParams({ ...utmParams, content: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {shortUrl ? (
            <div className="rounded-md border p-4 bg-muted/30">
              <div className="mb-2 text-sm font-medium">Your shortened URL:</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm flex-1">
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
          ) : (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 btn-accent-hover"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Link"
                )}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

## Identifying Issues with the Component

Looking at the `CreateLinkModal` component, we can see that it doesn't follow several rules defined in our MDC files:

### Violations of `form-api-patterns.mdc` Rule:

1. **Not using React Hook Form with Zod validation**:
   - The component uses manual state management with multiple `useState` hooks
   - Form validation is handled manually instead of using Zod schemas
   - No structured form state management

2. **No API integration with Orval-generated hooks**:
   - Direct API calls instead of using generated hooks
   - Missing proper API error handling patterns
   - No React Query integration for cache management

### Violations of `fe-component-patterns.mdc` Rule:

1. **Component has multiple responsibilities**:
   - Form state management
   - Form validation
   - API integration
   - UI rendering
   - Should extract form logic to a custom hook

2. **No separation of presentation and logic**:
   - UI and business logic are tightly coupled
   - No abstraction of form handling

### Violations of `core-code-quality.mdc` Rule:

1. **Functions are too large**:
   - `handleSubmit` function handles multiple concerns
   - Component is over 400 lines of code
   - Several functions exceed the recommended limit of 20 lines

2. **Too many state variables**:
   - 11+ separate state hooks when they could be combined
   - Deep nesting in conditional rendering
   - Complex state interactions

## Improving the Component with MDC Rules

The goal is to refactor this component using Cursor AI while following the patterns defined in our MDC files. The refactored version will:

1. Use React Hook Form with Zod validation
2. Integrate with Orval-generated API hooks
3. Separate concerns into smaller, focused components
4. Extract form logic to custom hooks
5. Implement proper testing with Storybook

This refactoring will demonstrate how MDC files guide the AI to implement best practices and project-specific patterns without having to manually specify all the details each time.

## How Cursor AI Implemented the Refactoring

Following the rules defined in our MDC files, Cursor AI implemented a complete refactoring of the `CreateLinkModal` component. Let's look at how the AI used each rule to guide its implementation:

### Following form-api-patterns.mdc

The original component used manual state management with many individual useState hooks and manual form validation. Following the form-api-patterns rule, Cursor:

1. **Implemented React Hook Form with Zod validation:**
   ```typescript
   // Zod schema definition
   export const createLinkFormSchema = z.object({
     longUrl: z
       .string()
       .min(1, "URL is required")
       .url("Please enter a valid URL including http:// or https://"),
     // Other fields...
   })
   
   // React Hook Form setup
   const form = useForm<CreateLinkFormValues>({
     resolver: zodResolver(createLinkFormSchema),
     defaultValues: {
       // Default values...
     },
   })
   ```

2. **Used Orval-generated hooks for API integration:**
   ```typescript
   const createLinkMutation = useCreateLinkApiLinksPost({
     mutation: {
       onSuccess: (data) => {
         // Success handling
       },
       onError: (error) => {
         // Error handling
       },
     },
   })
   ```

3. **Structured error handling with toast notifications:**
   ```typescript
   onError: (error) => {
     let errorMessage = "Please try again with a valid URL."
     
     // Check if it's an HTTPValidationError with detail field
     if (error && typeof error === 'object' && 'detail' in error) {
       // Error handling logic
     }
     
     toast.error("Error shortening URL", {
       description: errorMessage,
     })
   }
   ```

### Following fe-component-patterns.mdc

The original component had UI and business logic tightly coupled. Following the component patterns rule, Cursor:

1. **Extracted form logic to a custom hook:**
   Created a new `useCreateLinkForm` hook in `frontend/hooks/use-create-link-form.ts` that encapsulates all form logic, API calls, and state management.

2. **Focused the component on UI rendering:**
   ```typescript
   export function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
     const [currentTag, setCurrentTag] = useState("")
     
     // Use our custom hook
     const { form, shortUrl, isLoading, resetForm, onSubmit } = useCreateLinkForm()
     
     // UI rendering logic...
   }
   ```

3. **Maintained separation of concerns:**
   - The hook manages form state, validation, and API integration
   - The component manages UI rendering and user interactions
   - Storybook tests validate component behavior

### Following core-code-quality.mdc

The original component had long functions and complex state management. Following code quality standards, Cursor:

1. **Wrote smaller, focused functions:**
   Each function now handles one specific responsibility, staying under the recommended 20 lines.

2. **Used proper typing:**
   ```typescript
   export type CreateLinkFormValues = z.infer<typeof createLinkFormSchema>
   
   interface CreateLinkModalProps {
     isOpen: boolean
     onClose: () => void
   }
   ```

3. **Reduced state complexity:**
   Consolidated multiple useState hooks into a single form state managed by React Hook Form.

### Implementing Storybook Tests

Following the Storybook testing rules, Cursor created comprehensive tests in `frontend/components/create-link-modal.stories.tsx`:

```typescript
// Base story setup with mocking
const mockCreateLinkResponse = {
  id: '123',
  short_code: 'abc123',
  original_url: 'https://example.com',
  is_active: true,
  is_password_protected: false,
  created_at: new Date().toISOString(),
  user_id: null,
  expires_at: null,
  click_count: 0
}

// Create a query client provider for proper React Query context
const withQueryClient = (StoryFn: any) => {
  const queryClient = createQueryClient()
  
  // Mock the API endpoint
  const originalFetch = window.fetch
  window.fetch = async (url, options) => {
    if (url.toString().includes('/api/links')) {
      return {
        ok: true,
        status: 200,
        json: async () => mockCreateLinkResponse,
      } as Response
    }
    return originalFetch(url, options)
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <StoryFn />
    </QueryClientProvider>
  )
}

// Testing with steps pattern
export const FormSubmission: Story = {
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    
    await step('Fill in the basic form fields', async () => {
      // Test steps...
    })
    
    await step('Submit the form', async () => {
      // Test steps...
    })

    await step('Verify submission and result', async () => {
      // Test assertions...
    })
  },
}

// Additional stories for error handling and advanced features
export const ErrorHandling: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
  parameters: {
    mockData: [
      {
        url: '/api/links/',
        method: 'POST',
        status: 400,
        response: { 
          detail: 'Invalid URL format' 
        },
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    // Error handling test steps...
  },
}
```

The Storybook tests follow best practices specified in `storybook-basics.mdc` and `test-mocking.mdc`:

1. **Using proper decorators and providers**:
   - Custom QueryClientProvider decorator ensures React Query context is available
   - Mocked fetch API for predictable testing without actual API calls

2. **Testing user interactions with play function**:
   - Uses the step function for better organization and readability
   - Simulates actual user interactions like typing, clicking buttons, and form submission
   - Accesses elements by role and label (accessibility-friendly approach)

3. **Comprehensive test coverage**:
   - Basic component rendering (Default story)
   - Form submission workflow with validation
   - Advanced options UI interaction
   - Error handling scenarios
   
4. **Proper mocking**:
   - API responses mocked for consistent test results
   - Different response states (success, error) for complete coverage

When run in Storybook, these tests automatically execute the user interactions and verify the component behavior, providing visual confirmation that the component works as expected under various scenarios.

## Conclusion

MDC files are a powerful tool for improving development workflow in Cursor. They provide a structured way to document and enforce project standards and patterns, helping both human developers and AI assistants understand the codebase better.

By creating focused, specific rules and organizing them according to the guidelines in `cursor-rules.mdc`, you can create a knowledge base that makes development faster, more consistent, and less error-prone. When used effectively, MDC files become an integral part of your development workflow, guiding both developers and AI to create high-quality, consistent code that follows your project's best practices. 