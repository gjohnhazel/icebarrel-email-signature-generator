import { SignatureForm } from "@/components/signature-form";
import { SignaturePreview } from "@/components/signature-preview";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignatureData } from "@/lib/signature";

export default function Home() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: "",
    title: "",
    company: "Ice Barrel",
    email: "",
    website: "www.icebarrel.com",
    phone: "",
    logo: "https://cdn.shopify.com/s/files/1/0593/8125/2163/files/ice-barrel-logo-rounded.png?v=1739309263",
    socialLinks: {
      instagram: "https://www.instagram.com/icebarrel/",
      youtube: "https://www.youtube.com/channel/UC40pA9GBIVro1iZDRWG8seQ",
      tiktok: "https://tiktok.com/@icebarrel",
      apple: "https://apps.apple.com/us/app/ice-barrel/id6448100865",
      playstore: "https://play.google.com/store/apps/details?id=com.icebarrel&amp;pli=1"
    },
    enabledIcons: {
      instagram: true,
      youtube: true,
      tiktok: true,
      apple: true,
      playstore: true
    }
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Email Signature Generator</h1>
          <p className="text-muted-foreground">
            Create a professional email signature compatible with major email clients
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="edit" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Signature</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4">
                <SignatureForm 
                  signatureData={signatureData} 
                  onUpdate={setSignatureData} 
                />
              </TabsContent>

              <TabsContent value="preview" className="min-h-[400px]">
                <SignaturePreview signatureData={signatureData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}