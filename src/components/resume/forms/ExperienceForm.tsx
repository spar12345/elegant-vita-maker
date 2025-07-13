
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Experience } from "@/types/resume";

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""]
    };
    onUpdate([...data, newExp]);
    setEditingId(newExp.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const exp = data.find(e => e.id === id);
    if (exp) {
      const newDesc = [...exp.description];
      newDesc[index] = value;
      updateExperience(id, 'description', newDesc);
    }
  };

  const addDescriptionPoint = (id: string) => {
    const exp = data.find(e => e.id === id);
    if (exp) {
      updateExperience(id, 'description', [...exp.description, ""]);
    }
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const exp = data.find(e => e.id === id);
    if (exp && exp.description.length > 1) {
      const newDesc = exp.description.filter((_, i) => i !== index);
      updateExperience(id, 'description', newDesc);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.map((exp) => (
        <Card key={exp.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {exp.position || "New Position"} {exp.company && `at ${exp.company}`}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Position Title *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
              />
              <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
            </div>
            
            <div>
              <Label>Job Description</Label>
              <div className="space-y-2 mt-2">
                {exp.description.map((desc, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescription(exp.id, index, e.target.value)}
                      placeholder="• Describe your key responsibilities and achievements..."
                      rows={2}
                      className="flex-1"
                    />
                    {exp.description.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDescriptionPoint(exp.id, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addDescriptionPoint(exp.id)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bullet Point
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No work experience added yet.</p>
          <Button onClick={addExperience} className="mt-2">
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );
}
