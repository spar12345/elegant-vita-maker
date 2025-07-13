
import { useState } from "react";
import { ResumeForm } from "./resume/ResumeForm";
import { ResumePreview } from "./resume/ResumePreview";
import { ResumeData } from "@/types/resume";

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: ""
  },
  summary: "",
  experience: [],
  education: [],
  skills: {
    technical: [],
    languages: [],
    other: []
  },
  projects: [],
  certifications: []
};

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume in minutes</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <ResumeForm 
              resumeData={resumeData} 
              updateResumeData={updateResumeData} 
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="sticky top-6">
              <ResumePreview resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
