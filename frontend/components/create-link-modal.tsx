"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, Loader2, Plus, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateLinkApiLinksPost } from "@/lib/api/generated/links/links"
import { useQueryClient } from "@tanstack/react-query"

interface CreateLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

// Create schema matching API DTO
const createLinkSchema = z.object({
  original_url: z.string().url({ message: "Please enter a valid URL including http:// or https://" }),
  custom_alias: z.string().regex(/^[a-zA-Z0-9_-]*$/, {
    message: "Custom alias can only contain letters, numbers, underscores and hyphens",
  }).optional(),
  password: z.string().optional(),
  is_password_protected: z.boolean().default(false),
  expires_at: z.date().optional().nullable(),
  expires_enabled: z.boolean().default(false),
  tags: z.array(z.string()).max(5),
  utmParams: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    term: z.string().optional(),
    content: z.string().optional(),
  }),
  showAdvanced: z.boolean().default(false),
});

type FormValues = z.infer<typeof createLinkSchema>;

export function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
  const queryClient = useQueryClient()
  const [currentTag, setCurrentTag] = useState("")

  // Initialize form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      original_url: "",
      custom_alias: "",
      is_password_protected: false,
      password: "",
      expires_enabled: false,
      expires_at: null,
      tags: [],
      utmParams: {
        source: "",
        medium: "",
        campaign: "",
        term: "",
        content: "",
      },
      showAdvanced: false,
    }
  });

  // Use the Orval-generated mutation hook
  const createLinkMutation = useCreateLinkApiLinksPost({
    mutation: {
      onSuccess: (data) => {
        const shortUrl = `http://localhost:8000/api/r/${data.short_code}`;
        
        // First close the modal and reset the form
        onClose();
        form.reset();
        
        // Show toast with the URL and copy action
        toast.success("URL shortened successfully", {
          description: (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs truncate max-w-[240px]">{shortUrl}</span>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 px-2 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  toast.success("Copied to clipboard");
                }}
              >
                Copy
              </Button>
            </div>
          ),
          duration: 5000,
        });
        
        // Invalidate links query to refresh any lists
        queryClient.invalidateQueries({ queryKey: ['/api/links/'] });
      },
      onError: (error: any) => {
        toast.error("Error shortening URL", {
          description: error.response?.data?.detail || "Please try again with a valid URL."
        });
      }
    }
  });

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    try {
      // Construct the final URL with UTM parameters if provided
      let finalLongUrl = values.original_url;
      const utmParamsArray = [];

      if (values.utmParams.source) utmParamsArray.push(`utm_source=${encodeURIComponent(values.utmParams.source)}`);
      if (values.utmParams.medium) utmParamsArray.push(`utm_medium=${encodeURIComponent(values.utmParams.medium)}`);
      if (values.utmParams.campaign) utmParamsArray.push(`utm_campaign=${encodeURIComponent(values.utmParams.campaign)}`);
      if (values.utmParams.term) utmParamsArray.push(`utm_term=${encodeURIComponent(values.utmParams.term)}`);
      if (values.utmParams.content) utmParamsArray.push(`utm_content=${encodeURIComponent(values.utmParams.content)}`);

      if (utmParamsArray.length > 0) {
        const separator = finalLongUrl.includes("?") ? "&" : "?";
        finalLongUrl = `${finalLongUrl}${separator}${utmParamsArray.join("&")}`;
      }

      // Construct metadata including tags if any are set
      const metadata = values.tags.length > 0 ? { tags: values.tags } : undefined;

      // Call the Orval-generated API endpoint
      createLinkMutation.mutate({
        data: {
          original_url: finalLongUrl,
          custom_alias: values.custom_alias || undefined,
          is_password_protected: values.is_password_protected,
          password: values.is_password_protected ? values.password : undefined,
          expires_at: values.expires_enabled && values.expires_at ? values.expires_at.toISOString() : undefined,
          metadata
        }
      });
    } catch (error) {
      toast.error("Error shortening URL", {
        description: "Please try again with a valid URL."
      });
    }
  };

  // Tag handlers
  const addTag = () => {
    if (currentTag && !form.getValues("tags").includes(currentTag) && form.getValues("tags").length < 5) {
      form.setValue("tags", [...form.getValues("tags"), currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags", 
      form.getValues("tags").filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Link</DialogTitle>
          <DialogDescription>Shorten a URL and customize its settings.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="original_url"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/very/long/url/that/needs/shortening"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custom_alias"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Custom Alias (Optional)</FormLabel>
                  <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 text-sm text-muted-foreground">linkbyte.io/</div>
                    <FormControl>
                      <Input
                        placeholder="my-custom-link"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">Leave empty to generate a random short code.</p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showAdvanced"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 pt-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Show Advanced Settings</FormLabel>
                </FormItem>
              )}
            />

            {form.watch("showAdvanced") && (
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
                    <FormField
                      control={form.control}
                      name="is_password_protected"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </FormControl>
                          <FormLabel>Password Protection</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("is_password_protected") && (
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className="space-y-2 pl-6">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="expires_enabled"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                          </FormControl>
                          <FormLabel>Set Expiration Date</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("expires_enabled") && (
                      <FormField
                        control={form.control}
                        name="expires_at"
                        render={({ field }) => (
                          <FormItem className="space-y-2 pl-6">
                            <FormLabel>Expiration Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Select a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  initialFocus
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tracking" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.watch("tags").map((tag) => (
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
                        disabled={form.watch("tags").length >= 5}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={addTag}
                        disabled={!currentTag || form.watch("tags").length >= 5}
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
                          value={form.watch("utmParams.source") || ""}
                          onChange={(e) => form.setValue("utmParams.source", e.target.value)}
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
                          value={form.watch("utmParams.medium") || ""}
                          onChange={(e) => form.setValue("utmParams.medium", e.target.value)}
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
                          value={form.watch("utmParams.campaign") || ""}
                          onChange={(e) => form.setValue("utmParams.campaign", e.target.value)}
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
                          value={form.watch("utmParams.term") || ""}
                          onChange={(e) => form.setValue("utmParams.term", e.target.value)}
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
                          value={form.watch("utmParams.content") || ""}
                          onChange={(e) => form.setValue("utmParams.content", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 btn-accent-hover"
                disabled={createLinkMutation.isPending}
              >
                {createLinkMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Link"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
