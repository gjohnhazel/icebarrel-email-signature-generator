import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { SignatureData } from "@/lib/signature";
import { SiInstagram, SiYoutube, SiTiktok, SiApple, SiGoogleplay } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface SignatureFormProps {
  signatureData: SignatureData;
  onUpdate: (data: SignatureData) => void;
}

export function SignatureForm({ signatureData, onUpdate }: SignatureFormProps) {
  const { toast } = useToast();
  const form = useForm<SignatureData>({
    defaultValues: signatureData
  });

  const onSubmit = (data: SignatureData) => {
    onUpdate(data);
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@icebarrel.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
        </div>

      </form>
    </Form>
  );
}