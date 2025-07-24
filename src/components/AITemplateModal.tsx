import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    if (file && /^image\/(jpeg|png)$/.test(file.type)) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && /^image\/(jpeg|png)$/.test(file.type)) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      console.log("Generated template with:", {
        prompt,
        file: selectedFile?.name,
      });
      setIsGenerating(false);
      setPrompt("");
      setSelectedFile(null);
      onOpenChange(false);
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
            Describe the fields you want to extract and optionally upload a
            sample document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt">
              What do you want to extract?{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Extract invoice number, vendor name, and total amount"
              className="min-h-[100px]"
              disabled={isGenerating}
            />
            <p className="text-sm text-muted-foreground">
              Be as specific as possible for optimal results.
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Sample Image (optional)</Label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/60"
            >
              {selectedFile ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary">
                    <FileImage className="w-5 h-5" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <Button
                      onClick={removeFile}
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                  <p className="text-sm">
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
                    JPG or PNG up to 10MB
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload sample image"
            />
          </div>

          {/* Benefits */}
          <div className="bg-muted/40 p-4 rounded-lg text-sm space-y-1">
            <h4 className="font-medium">Why upload a sample?</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Improves field recognition accuracy</li>
              <li>Understands real layout structure</li>
              <li>Generates better validation logic</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="gap-2 bg-gradient-primary hover:opacity-90 disabled:opacity-60"
              aria-busy={isGenerating}
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
