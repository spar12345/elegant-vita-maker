
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { Skills } from "@/types/resume";

interface SkillsFormProps {
  data: Skills;
  onUpdate: (data: Skills) => void;
}

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState({ technical: "", languages: "", other: "" });

  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim()) {
      const updated = {
        ...data,
        [category]: [...data[category], skill.trim()]
      };
      onUpdate(updated);
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    const updated = {
      ...data,
      [category]: data[category].filter((_, i) => i !== index)
    };
    onUpdate(updated);
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills, value: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category, value);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Technical Skills</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Programming languages, frameworks, tools, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.technical}
            onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'technical', newSkill.technical)}
            placeholder="e.g., React, Python, AWS"
          />
          <Button
            onClick={() => addSkill('technical', newSkill.technical)}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.technical.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {skill}
              <button
                onClick={() => removeSkill('technical', index)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Languages</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Spoken languages and proficiency levels
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.languages}
            onChange={(e) => setNewSkill({ ...newSkill, languages: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'languages', newSkill.languages)}
            placeholder="e.g., English (Native), Spanish (Fluent)"
          />
          <Button
            onClick={() => addSkill('languages', newSkill.languages)}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.languages.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {skill}
              <button
                onClick={() => removeSkill('languages', index)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Other Skills</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Soft skills, certifications, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.other}
            onChange={(e) => setNewSkill({ ...newSkill, other: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'other', newSkill.other)}
            placeholder="e.g., Project Management, Public Speaking"
          />
          <Button
            onClick={() => addSkill('other', newSkill.other)}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.other.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {skill}
              <button
                onClick={() => removeSkill('other', index)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
