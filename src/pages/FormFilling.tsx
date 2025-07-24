import { FileEdit, Construction } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormFilling() {
  return (
    <div className="container mx-auto p-6">
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                <FileEdit className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">Form-Filling</CardTitle>
            <CardDescription>
              Automatically populate forms using extracted data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Construction className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              This feature is coming soon. Form-filling will automatically populate various document types using your extracted data.
            </p>
            <div className="pt-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-sm">Planned Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• PDF form auto-population</li>
                  <li>• Excel template filling</li>
                  <li>• Custom form builders</li>
                  <li>• Batch processing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}