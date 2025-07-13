
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
  const [newSkill, setNewSkill] = useState({ technical: "", softSkills: "", toolsAndTechnologies: "" });

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
      <h3 className="text-lg font-semibold">Skills</h3>

      <div>
        <Label className="text-base font-semibold">Technical Skills</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Programming languages, frameworks, databases, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.technical}
            onChange={(e) => setNewSkill({ ...newSkill, technical: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'technical', newSkill.technical)}
            placeholder="e.g., React, Python, JavaScript"
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
        <Label className="text-base font-semibold">Tools & Technologies</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Software tools, platforms, cloud services, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.toolsAndTechnologies}
            onChange={(e) => setNewSkill({ ...newSkill, toolsAndTechnologies: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'toolsAndTechnologies', newSkill.toolsAndTechnologies)}
            placeholder="e.g., AWS, Docker, Git, Figma"
          />
          <Button
            onClick={() => addSkill('toolsAndTechnologies', newSkill.toolsAndTechnologies)}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.toolsAndTechnologies.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {skill}
              <button
                onClick={() => removeSkill('toolsAndTechnologies', index)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Soft Skills</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Communication, leadership, problem-solving, etc.
        </p>
        <div className="flex gap-2 mb-3">
          <Input
            value={newSkill.softSkills}
            onChange={(e) => setNewSkill({ ...newSkill, softSkills: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, 'softSkills', newSkill.softSkills)}
            placeholder="e.g., Leadership, Communication, Team Collaboration"
          />
          <Button
            onClick={() => addSkill('softSkills', newSkill.softSkills)}
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.softSkills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pr-1">
              {skill}
              <button
                onClick={() => removeSkill('softSkills', index)}
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
