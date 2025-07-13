
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { SummaryForm } from "./forms/SummaryForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { CertificationsForm } from "./forms/CertificationsForm";
import { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
}

export function ResumeForm({ resumeData, updateResumeData }: ResumeFormProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Build Your Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certifications">Certs</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="personal">
              <PersonalInfoForm 
                data={resumeData.personalInfo}
                onUpdate={(data) => updateResumeData('personalInfo', data)}
              />
            </TabsContent>
            
            <TabsContent value="summary">
              <SummaryForm 
                data={resumeData.summary}
                onUpdate={(data) => updateResumeData('summary', data)}
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceForm 
                data={resumeData.experience}
                onUpdate={(data) => updateResumeData('experience', data)}
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationForm 
                data={resumeData.education}
                onUpdate={(data) => updateResumeData('education', data)}
              />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsForm 
                data={resumeData.skills}
                onUpdate={(data) => updateResumeData('skills', data)}
              />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectsForm 
                data={resumeData.projects}
                onUpdate={(data) => updateResumeData('projects', data)}
              />
            </TabsContent>
            
            <TabsContent value="certifications">
              <CertificationsForm 
                data={resumeData.certifications}
                onUpdate={(data) => updateResumeData('certifications', data)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
