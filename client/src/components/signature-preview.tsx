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
      // Create a hidden iframe to preserve styles better when copying
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '500px';  // Wider to avoid word wrapping
      iframe.style.height = '500px'; // Taller to fit all content
      iframe.style.opacity = '0.01';
      iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);
      
      // Wait for iframe to be ready
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (!iframeDoc) throw new Error("Could not access iframe document");
          
          // Add content to iframe with preserved styles
          iframeDoc.open();
          iframeDoc.write(`
            <html>
              <head>
                <style>
                  body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                  table { border-collapse: collapse; }
                  * { box-sizing: border-box; }
                  img { display: block; }
                </style>
              </head>
              <body>${generateGmailSignatureHTML(signatureData)}</body>
            </html>
          `);
          iframeDoc.close();
          
          // Select the content
          const range = iframeDoc.createRange();
          range.selectNodeContents(iframeDoc.body);
          const selection = iframeDoc.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
          
          // Execute copy command
          iframeDoc.execCommand('copy');
          
          // Clean up
          document.body.removeChild(iframe);
          
          toast({
            title: "Copied!",
            description: "Signature copied as rich text for Gmail",
          });
        } catch (error) {
          document.body.removeChild(iframe);
          throw error;
        }
      };
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