import { SignatureData } from "@/lib/signature";
import { generateSignatureHTML, generateGmailSignatureHTML } from "@/lib/signature";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface SignaturePreviewProps {
  signatureData: SignatureData;
}

export function SignaturePreview({ signatureData }: SignaturePreviewProps) {
  const { toast } = useToast();

  const copyToClipboard = async (isGmail: boolean = false) => {
    try {
      const html = isGmail ? generateGmailSignatureHTML(signatureData) : generateSignatureHTML(signatureData);
      await navigator.clipboard.writeText(html);
      toast({
        title: "Copied!",
        description: `Signature has been copied${isGmail ? ' (Gmail format)' : ''}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy signature",
        variant: "destructive",
      });
    }
  };

  const copyAsRichText = async () => {
    try {
      // Create a hidden div with the signature content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateGmailSignatureHTML(signatureData);
      document.body.appendChild(tempDiv);
      
      // Select the content
      const range = document.createRange();
      range.selectNode(tempDiv);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      // Execute copy command to copy rich text
      document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(tempDiv);
      if (selection) {
        selection.removeAllRanges();
      }
      
      toast({
        title: "Copied!",
        description: "Signature copied as rich text for Gmail",
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
      <div className="flex justify-end gap-2">
        <Button 
          onClick={copyAsRichText}
          className="bg-blue-600 text-white rounded-md hover:bg-blue-600/90 transition-colors"
        >
          Copy for Gmail
        </Button>
        <Button 
          onClick={() => copyToClipboard(false)}
          className="bg-blue-600 text-white rounded-md hover:bg-blue-600/90 transition-colors"
        >
          Copy HTML
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