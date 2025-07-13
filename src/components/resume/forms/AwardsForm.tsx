
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import { Award } from "@/types/resume";

interface AwardsFormProps {
  data: Award[];
  onUpdate: (data: Award[]) => void;
}

export function AwardsForm({ data, onUpdate }: AwardsFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: "",
      issuer: "",
      date: "",
      description: ""
    };
    onUpdate([...data, newAward]);
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    const updated = data.map(award => 
      award.id === id ? { ...award, [field]: value } : award
    );
    onUpdate(updated);
  };

  const removeAward = (id: string) => {
    onUpdate(data.filter(award => award.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Awards & Achievements</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button onClick={addAward} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Award
          </Button>
        </div>
      </div>

      {data.map((award) => (
        <Card key={award.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {award.title || "New Award"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAward(award.id)}
                disabled={!isEditing}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Award/Achievement Title *</Label>
              <Input
                value={award.title}
                onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                placeholder="Best Student Award"
                disabled={!isEditing}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issuing Organization *</Label>
                <Input
                  value={award.issuer}
                  onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                  placeholder="University of California"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Date Received *</Label>
                <Input
                  type="month"
                  value={award.date}
                  onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={award.description || ''}
                onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                placeholder="Brief description of the achievement..."
                rows={2}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No awards or achievements added yet.</p>
          <Button onClick={addAward} className="mt-2">
            Add Your First Award
          </Button>
        </div>
      )}
    </div>
  );
}
