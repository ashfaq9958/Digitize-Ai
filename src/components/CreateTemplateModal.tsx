import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Field {
  id: string;
  name: string;
  type: string;
  description: string;
  length?: number;
  formatRule?: string;
  formatExample?: string;
  startDate?: Date;
  endDate?: Date;
}

interface CreateTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (template: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    fields: string[];
  }) => void;
}

export function CreateTemplateModal({
  open,
  onOpenChange,
  onCreate, // ✅ Add this line
}: CreateTemplateModalProps) {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [fields, setFields] = useState<Field[]>([
    { id: "1", name: "", type: "String", description: "" },
  ]);

  const addField = () => {
    const newField: Field = {
      id: Date.now().toString(),
      name: "",
      type: "String",
      description: "",
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const handleSave = () => {
    const newTemplate = {
      id: Date.now().toString(),
      name: templateName,
      description: templateDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fields: fields.map((field) => field.name).filter(Boolean), // Only keep valid field names
    };

    onCreate(newTemplate); // ✅ pass new template to parent
    onOpenChange(false); // ✅ close modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
          <DialogDescription>
            Manually define the fields you want to extract from images
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Template Name
              </Label>
              <Input
                id="name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Invoice Scanner"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Describe what this template extracts..."
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Template Fields</Label>
              <Button onClick={addField} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Field
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-5 rounded-xl border border-border/60 bg-muted/10 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Field {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      onClick={() => removeField(field.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Field Name</Label>
                    <Input
                      value={field.length !== undefined ? field.length : ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        updateField(field.id, {
                          length: value ? parseInt(value) : undefined,
                        });
                      }}
                      placeholder="e.g., Total Amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={field.type}
                      onValueChange={(value) =>
                        updateField(field.id, { type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="String">String</SelectItem>
                        <SelectItem value="Number">Number</SelectItem>
                        <SelectItem value="Date">Date</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Currency">Currency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={field.description}
                      onChange={(e) =>
                        updateField(field.id, { description: e.target.value })
                      }
                      placeholder="What this field contains..."
                    />
                  </div>
                </div>

                {/* Optional advanced fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Max Length (Optional)</Label>
                    <Input
                      type="number"
                      value={field.length || ""}
                      onChange={(e) =>
                        updateField(field.id, {
                          length: parseInt(e.target.value) || undefined,
                        })
                      }
                      placeholder="Maximum characters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Format Example (Optional)</Label>
                    <Input
                      value={field.formatExample || ""}
                      onChange={(e) =>
                        updateField(field.id, { formatExample: e.target.value })
                      }
                      placeholder="e.g., $1,234.56"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-6 border-t border-border/60 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-primary hover:opacity-90"
            >
              Save Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
