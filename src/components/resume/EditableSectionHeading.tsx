
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";

interface EditableSectionHeadingProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

export function EditableSectionHeading({ title, onTitleChange }: EditableSectionHeadingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleSave = () => {
    onTitleChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="text-lg font-semibold"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={handleSave}>
          <Check className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
        <Edit2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
