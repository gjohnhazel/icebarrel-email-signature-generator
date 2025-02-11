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
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDItMTNUMjE6MTg6MzItMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDItMTNUMjE6MTg6MzItMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTAyLTEzVDIxOjE4OjMyLTA1OjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg1ZTU5ZGYwLTY4OTEtNGZiZC1iMjE2LWMyZWRhZmU3ZjIwZCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjc3YjhlMzU1LTNkOWEtNGU0OC1h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",
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