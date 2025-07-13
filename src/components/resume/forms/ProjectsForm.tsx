
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X, Edit } from "lucide-react";
import { Project } from "@/types/resume";

interface ProjectsFormProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export function ProjectsForm({ data, onUpdate }: ProjectsFormProps) {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState(false);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      demo: ""
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onUpdate(updated);
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string, tech: string) => {
    if (tech.trim()) {
      const project = data.find(p => p.id === projectId);
      if (project) {
        updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
        setNewTech({ ...newTech, [projectId]: "" });
      }
    }
  };

  const removeTechnology = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const updated = project.technologies.filter((_, i) => i !== index);
      updateProject(projectId, 'technologies', updated);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button onClick={addProject} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {data.map((project) => (
        <Card key={project.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">
                {project.name || "New Project"}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                disabled={!isEditing}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="My Awesome Project"
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <Label>Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe what your project does, the problem it solves, and key features..."
                rows={3}
                disabled={!isEditing}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Project Link</Label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  placeholder="https://myproject.com"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>GitHub Repository</Label>
                <Input
                  value={project.github || ''}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label>Demo Link</Label>
                <Input
                  value={project.demo || ''}
                  onChange={(e) => updateProject(project.id, 'demo', e.target.value)}
                  placeholder="https://demo.myproject.com"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div>
              <Label>Technologies Used</Label>
              <div className="flex gap-2 mt-2 mb-3">
                <Input
                  value={newTech[project.id] || ''}
                  onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology(project.id, newTech[project.id] || '');
                    }
                  }}
                  placeholder="e.g., React, Node.js, MongoDB"
                  disabled={!isEditing}
                />
                <Button
                  onClick={() => addTechnology(project.id, newTech[project.id] || '')}
                  size="sm"
                  disabled={!isEditing}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {tech}
                    {isEditing && (
                      <button
                        onClick={() => removeTechnology(project.id, index)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No projects added yet.</p>
          <Button onClick={addProject} className="mt-2">
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
}
