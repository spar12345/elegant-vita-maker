
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SummaryForm } from "./forms/SummaryForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { AwardsForm } from "./forms/AwardsForm";
import { EditableSectionHeading } from "./EditableSectionHeading";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  sectionTitles: {
    personal: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    certifications: string;
    awards: string;
  };
  updateSectionTitle: (section: string, newTitle: string) => void;
}

export function ResumeForm({ resumeData, updateResumeData, sectionTitles, updateSectionTitle }: ResumeFormProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Build Your Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certs</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="personal">
              <EditableSectionHeading 
                title={sectionTitles.personal}
                onTitleChange={(title) => updateSectionTitle('personal', title)}
              />
              <PersonalInfoForm 
                data={resumeData.personalInfo}
                onUpdate={(data) => updateResumeData('personalInfo', data)}
              />
            </TabsContent>
            
            <TabsContent value="summary">
              <EditableSectionHeading 
                title={sectionTitles.summary}
                onTitleChange={(title) => updateSectionTitle('summary', title)}
              />
              <SummaryForm 
                data={resumeData.summary}
                onUpdate={(data) => updateResumeData('summary', data)}
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <EditableSectionHeading 
                title={sectionTitles.experience}
                onTitleChange={(title) => updateSectionTitle('experience', title)}
              />
              <ExperienceForm 
                data={resumeData.experience}
                onUpdate={(data) => updateResumeData('experience', data)}
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EditableSectionHeading 
                title={sectionTitles.education}
                onTitleChange={(title) => updateSectionTitle('education', title)}
              />
              <EducationForm 
                data={resumeData.education}
                onUpdate={(data) => updateResumeData('education', data)}
              />
            </TabsContent>
            
            <TabsContent value="skills">
              <EditableSectionHeading 
                title={sectionTitles.skills}
                onTitleChange={(title) => updateSectionTitle('skills', title)}
              />
              <SkillsForm 
                data={resumeData.skills}
                onUpdate={(data) => updateResumeData('skills', data)}
              />
            </TabsContent>
            
            <TabsContent value="projects">
              <EditableSectionHeading 
                title={sectionTitles.projects}
                onTitleChange={(title) => updateSectionTitle('projects', title)}
              />
              <ProjectsForm 
                data={resumeData.projects}
                onUpdate={(data) => updateResumeData('projects', data)}
              />
            </TabsContent>
            
            <TabsContent value="certifications">
              <EditableSectionHeading 
                title={sectionTitles.certifications}
                onTitleChange={(title) => updateSectionTitle('certifications', title)}
              />
              <CertificationsForm 
                data={resumeData.certifications}
                onUpdate={(data) => updateResumeData('certifications', data)}
              />
            </TabsContent>
            
            <TabsContent value="awards">
              <EditableSectionHeading 
                title={sectionTitles.awards}
                onTitleChange={(title) => updateSectionTitle('awards', title)}
              />
              <AwardsForm 
                data={resumeData.awards}
                onUpdate={(data) => updateResumeData('awards', data)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
