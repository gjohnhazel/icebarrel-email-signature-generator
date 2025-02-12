import { SignatureData } from "@/lib/signature";
import { generateSignatureHTML } from "@/lib/signature";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import AspectRatio from "@/components/ui/aspect-ratio"; // Assuming this component exists

interface SignaturePreviewProps {
  signatureData: SignatureData;
}

export function SignaturePreview({ signatureData }: SignaturePreviewProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      const html = generateSignatureHTML(signatureData);
      await navigator.clipboard.writeText(html);
      toast({
        title: "Copied!",
        description: "Signature has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy signature",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          onClick={copyToClipboard}
          className="bg-blue-600 text-white rounded-md hover:bg-blue-600/90 transition-colors"
        >
          Copy Signature
        </Button>
      </div>

      <Card className="border border-gray-200/80 rounded-lg">
        <CardContent className="p-6">
          <div
            dangerouslySetInnerHTML={{
              __html: generateSignatureHTML(signatureData),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}