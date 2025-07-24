import { useState } from "react";
import { Plus, Wand2, Edit, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateTemplateModal } from "@/components/CreateTemplateModal";
import { AITemplateModal } from "@/components/AITemplateModal";

interface Template {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  fields: string[];
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Invoice Scanner",
    description:
      "Extract key details from invoices including amounts, dates, and vendor information",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    fields: [
      "Invoice Number",
      "Total Amount",
      "Due Date",
      "Vendor Name",
      "Tax Amount",
    ],
  },
  {
    id: "2",
    name: "Receipt Parser",
    description: "Parse retail receipts for expense tracking and accounting",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    fields: ["Store Name", "Total", "Date", "Items", "Payment Method"],
  },
  {
    id: "3",
    name: "ID Card Reader",
    description: "Extract personal information from government issued IDs",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
    fields: [
      "Full Name",
      "Date of Birth",
      "ID Number",
      "Address",
      "Expiry Date",
      "Photo",
    ],
  },
];

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => (
  <Card className="flex flex-col justify-between h-full bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-200">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-foreground">{template.name}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {template.description}
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          aria-label="Edit Template"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col justify-between flex-grow space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Key Fields:</p>
        <div className="flex flex-wrap gap-1">
          {template.fields.slice(0, 3).map((field) => (
            <Badge key={field} variant="secondary" className="text-xs">
              {field}
            </Badge>
          ))}
          {template.fields.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.fields.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(template.updatedAt).toLocaleDateString()}</p>
      </div>

      <div className="pt-2">
        <Link to={`/extraction/${template.id}`}>
          <Button className="w-full bg-gradient-primary hover:opacity-90">
            Use Template
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

const Extraction: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  const handleAddTemplate = (newTemplate: Template) => {
    setTemplates((prev) => [newTemplate, ...prev]); // prepend new template
  };

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      {/* Page Header */}
      <header className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
            <FileSearch
              className="w-8 h-8 text-white"
              aria-label="Search Icon"
            />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">
            Data Extraction Templates
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Create and manage templates to extract key details from images
          </p>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-gradient-primary hover:opacity-90 shadow-glow"
          size="lg"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </Button>
        <Button
          onClick={() => setIsAIModalOpen(true)}
          variant="outline"
          className="gap-2 border-primary/50 hover:bg-primary/10"
          size="lg"
        >
          <Wand2 className="w-4 h-4" />
          Create with AI
        </Button>
      </div>

      {/* Templates Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Correct */}
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </section>

      {/* Modals */}
      <CreateTemplateModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreate={handleAddTemplate} // ✅ pass callback
      />
      <AITemplateModal open={isAIModalOpen} onOpenChange={setIsAIModalOpen} />
    </div>
  );
};

export default Extraction;
