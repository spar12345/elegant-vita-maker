
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, ExternalLink } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      const element = resumeRef.current;
      
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${resumeData.personalInfo.fullName || 'Resume'}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: white;
              color: black;
              line-height: 1.4;
            }
            .resume-container { 
              max-width: 210mm; 
              margin: 0 auto; 
              background: white;
              padding: 30px;
            }
            h1 { font-size: 28px; margin-bottom: 8px; color: #1a1a1a; }
            h2 { font-size: 18px; margin: 20px 0 10px 0; color: #1a1a1a; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
            h3 { font-size: 16px; margin: 12px 0 4px 0; color: #1a1a1a; }
            p, li { font-size: 14px; margin: 4px 0; color: #374151; }
            .contact-info { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; font-size: 14px; }
            .contact-links { display: flex; flex-wrap: wrap; gap: 15px; margin-top: 8px; font-size: 14px; }
            .experience-item, .education-item, .project-item, .cert-item, .award-item { margin-bottom: 15px; }
            .date-location { float: right; text-align: right; font-style: italic; color: #6b7280; }
            ul { margin: 8px 0 8px 20px; }
            .tech-list { color: #6b7280; font-size: 13px; margin-top: 4px; }
            @media print { 
              body { -webkit-print-color-adjust: exact; }
              .resume-container { box-shadow: none; margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${element.innerHTML}
          </div>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const createClickableLink = (url: string, displayText: string) => {
    if (!url) return null;
    const href = url.startsWith('http') ? url : `https://${url}`;
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-gray-800 inline-flex items-center gap-1"
      >
        {displayText}
        <ExternalLink className="w-3 h-3" />
      </a>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Resume Preview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-[8.5in] mx-auto bg-white text-black shadow-lg">
        <CardContent className="p-8 space-y-6" ref={resumeRef}>
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="contact-info flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
            </div>
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github || resumeData.personalInfo.website) && (
              <div className="contact-links flex flex-wrap justify-center gap-4 text-sm mt-2">
                {resumeData.personalInfo.linkedin && createClickableLink(resumeData.personalInfo.linkedin, "LinkedIn")}
                {resumeData.personalInfo.github && createClickableLink(resumeData.personalInfo.github, "GitHub")}
                {resumeData.personalInfo.website && createClickableLink(resumeData.personalInfo.website, "Portfolio")}
              </div>
            )}
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{exp.location}</p>
                        <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      </div>
                    </div>
                    <ul className="ml-0 mt-2">
                      {exp.description.map((desc, index) => (
                        desc.trim() && (
                          <li key={index} className="text-sm text-gray-700 mb-1">
                            • {desc}
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="education-item flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {(edu.gpa || edu.percentage) && (
                        <p className="text-sm text-gray-600">
                          {edu.gpa && `GPA: ${edu.gpa}`}
                          {edu.gpa && edu.percentage && ' | '}
                          {edu.percentage && `Score: ${edu.percentage}`}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{edu.location}</p>
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(resumeData.skills.technical.length > 0 || resumeData.skills.softSkills.length > 0 || resumeData.skills.toolsAndTechnologies.length > 0) && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                SKILLS
              </h2>
              <div className="space-y-2">
                {resumeData.skills.technical.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900">Technical Skills: </span>
                    <span className="text-sm text-gray-700">{resumeData.skills.technical.join(', ')}</span>
                  </div>
                )}
                {resumeData.skills.toolsAndTechnologies.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900">Tools & Technologies: </span>
                    <span className="text-sm text-gray-700">{resumeData.skills.toolsAndTechnologies.join(', ')}</span>
                  </div>
                )}
                {resumeData.skills.softSkills.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900">Soft Skills: </span>
                    <span className="text-sm text-gray-700">{resumeData.skills.softSkills.join(', ')}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="project-item">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">{project.name}</h3>
                      <div className="text-sm flex gap-2">
                        {project.link && createClickableLink(project.link, "Live")}
                        {project.github && createClickableLink(project.github, "GitHub")}
                        {project.demo && createClickableLink(project.demo, "Demo")}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="tech-list text-sm text-gray-600">
                        <span className="font-medium">Technologies: </span>
                        {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="cert-item flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(cert.date)}</p>
                      {cert.link && createClickableLink(cert.link, "View Certificate")}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {resumeData.awards.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                AWARDS & ACHIEVEMENTS
              </h2>
              <div className="space-y-2">
                {resumeData.awards.map((award) => (
                  <div key={award.id} className="award-item flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{award.title}</h3>
                      <p className="text-gray-700">{award.issuer}</p>
                      {award.description && <p className="text-sm text-gray-600 mt-1">{award.description}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(award.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
