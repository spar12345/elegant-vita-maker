
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export function SummaryForm({ data, onUpdate }: SummaryFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          rows={6}
          className="mt-2"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Tip: Keep your summary concise (2-3 sentences) and focus on your most relevant skills and achievements.
      </p>
    </div>
  );
}
