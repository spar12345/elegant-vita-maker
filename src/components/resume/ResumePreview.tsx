
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Resume Preview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-[8.5in] mx-auto bg-white text-black print:shadow-none print:border-none">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <span>{resumeData.personalInfo.email}</span>
              )}
              {resumeData.personalInfo.phone && (
                <span>{resumeData.personalInfo.phone}</span>
              )}
              {resumeData.personalInfo.location && (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </div>
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github || resumeData.personalInfo.website) && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-1">
                {resumeData.personalInfo.linkedin && (
                  <span>{resumeData.personalInfo.linkedin}</span>
                )}
                {resumeData.personalInfo.github && (
                  <span>{resumeData.personalInfo.github}</span>
                )}
                {resumeData.personalInfo.website && (
                  <span>{resumeData.personalInfo.website}</span>
                )}
              </div>
            )}
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {resumeData.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{exp.location}</p>
                        <p>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-0">
                      {exp.description.map((desc, index) => (
                        desc.trim() && (
                          <p key={index} className="text-sm text-gray-700 mb-1">
                            • {desc}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{edu.location}</p>
                      <p>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(resumeData.skills.technical.length > 0 || resumeData.skills.languages.length > 0 || resumeData.skills.other.length > 0) && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                SKILLS
              </h2>
              <div className="space-y-2">
                {resumeData.skills.technical.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-800">Technical: </span>
                    <span className="text-sm text-gray-700">
                      {resumeData.skills.technical.join(', ')}
                    </span>
                  </div>
                )}
                {resumeData.skills.languages.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-800">Languages: </span>
                    <span className="text-sm text-gray-700">
                      {resumeData.skills.languages.join(', ')}
                    </span>
                  </div>
                )}
                {resumeData.skills.other.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-800">Other: </span>
                    <span className="text-sm text-gray-700">
                      {resumeData.skills.other.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{project.name}</h3>
                      <div className="text-sm text-gray-600">
                        {project.link && (
                          <span className="mr-2">{project.link}</span>
                        )}
                        {project.github && (
                          <span>{project.github}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Technologies: </span>
                        {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(cert.date)}</p>
                      {cert.link && (
                        <p className="text-xs">{cert.link}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
