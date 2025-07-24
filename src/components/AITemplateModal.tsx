import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Wand2, FileImage, X } from "lucide-react";

interface AITemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AITemplateModal({ open, onOpenChange }: AITemplateModalProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      console.log("Generating template with:", { prompt, file: selectedFile?.name });
      setIsGenerating(false);
      onOpenChange(false);
      // Reset form
      setPrompt("");
      setSelectedFile(null);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Create Template with AI
          </DialogTitle>
          <DialogDescription>
            Describe what you want to extract and optionally upload a sample image
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">
              What do you want to extract? <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Extract the sender name and total amount from invoices"
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              Be specific about the fields you want to extract for better results
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Sample Image (Optional)</Label>
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center transition-colors hover:border-primary/50"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileImage className="w-8 h-8" />
                    <span className="font-medium">{selectedFile.name}</span>
                    <Button
                      onClick={removeFile}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">
                      Drop your image here, or{" "}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-primary hover:underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports JPG and PNG files
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
          </div>

          {/* Benefits */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2">Benefits of providing a sample image:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• More accurate field detection</li>
              <li>• Better format understanding</li>
              <li>• Automatic validation rules</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isGenerating}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerate} 
              disabled={!prompt.trim() || isGenerating}
              className="gap-2 bg-gradient-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Template
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}