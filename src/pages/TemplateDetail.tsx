import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, FileImage, X, RotateCcw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock template data - in real app this would come from API
const mockTemplate = {
  id: "1",
  name: "Invoice Scanner",
  description:
    "Extract key details from invoices including amounts, dates, and vendor information",
  fields: [
    {
      name: "Invoice Number",
      type: "String",
      description: "Unique invoice identifier",
    },
    { name: "Total Amount", type: "Currency", description: "Total amount due" },
    { name: "Due Date", type: "Date", description: "Payment due date" },
    {
      name: "Vendor Name",
      type: "String",
      description: "Name of the vendor/supplier",
    },
    { name: "Tax Amount", type: "Currency", description: "Tax amount" },
  ],
};

export default function TemplateDetail() {
  const { templateId } = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<Record<string, string>>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const template = mockTemplate; // In real app: fetch by templateId

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      // Mock extracted data
      const mockData = {
        "Invoice Number": "INV-2024-001",
        "Total Amount": "$1,234.56",
        "Due Date": "2024-02-15",
        "Vendor Name": "Acme Corporation",
        "Tax Amount": "$123.45",
      };
      setExtractedData(mockData);
      setIsProcessing(false);
    }, 3000);
  };

  const resetFields = () => {
    setExtractedData({});
  };

  const updateField = (fieldName: string, value: string) => {
    setExtractedData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/extraction">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Templates
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {template.name}
          </h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image Upload */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Image
              </CardTitle>
              <CardDescription>
                Upload an image to extract data using this template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors hover:border-primary/50"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <FileImage className="w-12 h-12" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={removeFile}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                      <Button
                        onClick={processImage}
                        disabled={isProcessing}
                        aria-busy={isProcessing}
                        className="gap-2 bg-gradient-primary hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            Process Image
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium">
                        Drop your image here, or{" "}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-primary underline underline-offset-4 hover:text-primary/80"
                        >
                          browse
                        </button>
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Supports JPG and PNG files up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Fields</CardTitle>
              <CardDescription>
                Fields that will be extracted from your image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {template.fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{field.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {field.description}
                      </p>
                    </div>
                    <Badge variant="outline">{field.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Extracted Data */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Extracted Data</CardTitle>
                  <CardDescription>
                    Review and edit the extracted information
                  </CardDescription>
                </div>
                {Object.keys(extractedData).length > 0 && (
                  <Button
                    onClick={resetFields}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {Object.keys(extractedData).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileImage className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload and process an image to see extracted data here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {template.fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>{field.name}</Label>
                      <Input
                        id={field.name}
                        value={extractedData[field.name] || ""}
                        onChange={(e) =>
                          updateField(field.name, e.target.value)
                        }
                        placeholder={`Enter ${field.name.toLowerCase()}...`}
                      />
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Export Data
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
