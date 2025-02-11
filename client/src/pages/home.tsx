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
    company: "",
    email: "",
    website: "",
    phone: "",
    logo: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      tiktok: "",
      apple: "",
      playstore: ""
    },
    enabledIcons: {
      instagram: false,
      youtube: false,
      tiktok: false,
      apple: false,
      playstore: false
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