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
      iframe.style.opacity = '0';
      document.body.appendChild(iframe);

      // Make sure iframe is loaded before proceeding
      const iframeLoad = new Promise<void>((resolve) => {
        iframe.onload = () => resolve();
      });

      // Set initial content
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

      // Wait for iframe to fully load
      await iframeLoad;

      // Use modern clipboard API if available
      try {
        // Get HTML content from iframe
        const htmlContent = iframeDoc.body.innerHTML;

        // Create a Blob with the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const data = [new ClipboardItem({ 'text/html': blob })];

        // Write to clipboard using the modern Clipboard API
        await navigator.clipboard.write(data);

        toast({
          title: "Copied!",
          description: "Signature copied as rich text for Gmail",
        });
      } catch (clipboardError) {
        // Fallback to selection-based copying
        const range = iframeDoc.createRange();
        range.selectNodeContents(iframeDoc.body);

        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);

          // Try to execute copy command
          document.execCommand('copy');

          toast({
            title: "Copied!",
            description: "Signature copied as rich text for Gmail",
          });
        } else {
          throw new Error("Could not select content");
        }
      } finally {
        // Clean up
        document.body.removeChild(iframe);
      }
    } catch (err) {
      console.error("Copy error:", err);
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