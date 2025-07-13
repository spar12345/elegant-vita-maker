
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Certification } from "@/types/resume";

interface CertificationsFormProps {
  data: Certification[];
  onUpdate: (data: Certification[]) => void;
}

export function CertificationsForm({ data, onUpdate }: CertificationsFormProps) {
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      link: ""
    };
    onUpdate([...data, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updated = data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onUpdate(updated);
  };

  const removeCertification = (id: string) => {
    onUpdate(data.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <Button onClick={addCertification} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {data.map((cert) => (
        <Card key={cert.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {cert.name || "New Certification"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Certification Name *</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issuing Organization *</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <Label>Date Obtained *</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label>Credential URL</Label>
              <Input
                value={cert.link || ''}
                onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                placeholder="https://certification-url.com"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No certifications added yet.</p>
          <Button onClick={addCertification} className="mt-2">
            Add Your First Certification
          </Button>
        </div>
      )}
    </div>
  );
}
