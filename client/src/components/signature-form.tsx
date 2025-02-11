import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { SignatureData } from "@/lib/signature";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SiInstagram, SiYoutube, SiTiktok, SiApple, SiGoogleplay } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string(),
  company: z.string(),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").or(z.literal("")),
  logo: z.string().optional(),
  socialLinks: z.object({
    instagram: z.string(),
    youtube: z.string(),
    tiktok: z.string(),
    apple: z.string(),
    playstore: z.string()
  }),
  enabledIcons: z.object({
    instagram: z.boolean(),
    youtube: z.boolean(),
    tiktok: z.boolean(),
    apple: z.boolean(),
    playstore: z.boolean()
  })
});

interface SignatureFormProps {
  signatureData: SignatureData;
  onUpdate: (data: SignatureData) => void;
}

export function SignatureForm({ signatureData, onUpdate }: SignatureFormProps) {
  const { toast } = useToast();
  const form = useForm<SignatureData>({
    resolver: zodResolver(formSchema),
    defaultValues: signatureData
  });

  const onSubmit = (data: SignatureData) => {
    onUpdate(data);
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 1MB",
        variant: "destructive"
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        form.setValue('logo', base64String);
        onUpdate({ ...form.getValues(), logo: base64String });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const socialIcons = [
    { name: "instagram", icon: SiInstagram, label: "Instagram" },
    { name: "youtube", icon: SiYoutube, label: "YouTube" },
    { name: "tiktok", icon: SiTiktok, label: "TikTok" },
    { name: "apple", icon: SiApple, label: "App Store" },
    { name: "playstore", icon: SiGoogleplay, label: "Play Store" }
  ] as const;

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="cursor-pointer"
                />
                {form.watch('logo') && (
                  <div className="mt-2">
                    <img 
                      src={form.watch('logo')} 
                      alt="Logo preview" 
                      className="max-w-[200px] max-h-[100px] object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        form.setValue('logo', '');
                        onUpdate({ ...form.getValues(), logo: '' });
                      }}
                    >
                      Remove Logo
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Chief of Staff" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Ice Barrel" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@company.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://company.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Social Media Links</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {socialIcons.map(({ name, icon: Icon, label }) => (
              <div key={name} className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name={`enabledIcons.${name}`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Icon className="h-4 w-4" />
                      <FormLabel className="!mt-0">{label}</FormLabel>
                    </FormItem>
                  )}
                />
                {form.watch(`enabledIcons.${name}`) && (
                  <FormField
                    control={form.control}
                    name={`socialLinks.${name}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder={`${label} URL`} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </Form>
  );
}