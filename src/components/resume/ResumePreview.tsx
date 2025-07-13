
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, ExternalLink } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { format } from "date-fns";

interface ResumePreviewProps {
  resumeData: ResumeData;
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
}

export function ResumePreview({ resumeData, sectionTitles }: ResumePreviewProps) {
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
            @page { 
              size: A4; 
              margin: 0.5in; 
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              padding: 0; 
              background: white;
              color: black;
              line-height: 1.2;
              font-size: 11px;
            }
            .resume-container { 
              max-width: 100%; 
              margin: 0; 
              background: white;
              padding: 0;
            }
            h1 { font-size: 20px; margin-bottom: 4px; color: #1a1a1a; }
            h2 { font-size: 14px; margin: 12px 0 6px 0; color: #1a1a1a; border-bottom: 1px solid #e5e7eb; padding-bottom: 2px; }
            h3 { font-size: 12px; margin: 8px 0 2px 0; color: #1a1a1a; }
            p, li { font-size: 10px; margin: 1px 0; color: #374151; }
            .contact-info { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; font-size: 10px; }
            .contact-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; font-size: 10px; }
            .item-container { 
              margin-bottom: 8px; 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start;
            }
            .left-content { flex: 1; }
            .right-content { 
              text-align: right; 
              font-style: italic; 
              color: #6b7280; 
              font-size: 9px;
              min-width: 80px;
              margin-left: 8px;
              flex-shrink: 0;
            }
            ul { margin: 4px 0 4px 12px; }
            .tech-list { color: #6b7280; font-size: 9px; margin-top: 2px; }
            a { color: #000000 !important; text-decoration: none; font-size: 10px; }
            .link-icon { display: none; }
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
        className="text-black hover:text-gray-800 text-xs inline-flex items-center gap-1"
      >
        {displayText}
        <ExternalLink className="w-2 h-2 link-icon" />
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
        <CardContent className="p-6 space-y-4 text-sm" ref={resumeRef}>
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-3">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="contact-info flex flex-wrap justify-center gap-3 text-xs text-gray-600">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
            </div>
            {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github || resumeData.personalInfo.website) && (
              <div className="contact-links flex flex-wrap justify-center gap-3 text-xs mt-2">
                {resumeData.personalInfo.linkedin && createClickableLink(resumeData.personalInfo.linkedin, "LinkedIn")}
                {resumeData.personalInfo.github && createClickableLink(resumeData.personalInfo.github, "GitHub")}
                {resumeData.personalInfo.website && createClickableLink(resumeData.personalInfo.website, "Portfolio")}
              </div>
            )}
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.summary.toUpperCase()}
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">{resumeData.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.experience.toUpperCase()}
              </h2>
              <div className="space-y-3">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="item-container">
                    <div className="left-content">
                      <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                      <p className="text-gray-700 font-medium text-sm">{exp.company}</p>
                      <ul className="ml-0 mt-1">
                        {exp.description.map((desc, index) => (
                          desc.trim() && (
                            <li key={index} className="text-xs text-gray-700 mb-1">
                              • {desc}
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                    <div className="right-content">
                      <p className="text-xs">{exp.location}</p>
                      <p className="text-xs">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.education.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="item-container">
                    <div className="left-content">
                      <h3 className="font-bold text-gray-900 text-sm">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700 text-sm">{edu.institution}</p>
                      {(edu.gpa || edu.percentage) && (
                        <p className="text-xs text-gray-600">
                          {edu.gpa && `GPA: ${edu.gpa}`}
                          {edu.gpa && edu.percentage && ' | '}
                          {edu.percentage && `Score: ${edu.percentage}`}
                        </p>
                      )}
                    </div>
                    <div className="right-content">
                      <p className="text-xs">{edu.location}</p>
                      <p className="text-xs">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(resumeData.skills.technical.length > 0 || resumeData.skills.softSkills.length > 0 || resumeData.skills.toolsAndTechnologies.length > 0) && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.skills.toUpperCase()}
              </h2>
              <div className="space-y-1">
                {resumeData.skills.technical.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900 text-sm">Technical Skills: </span>
                    <span className="text-xs text-gray-700">{resumeData.skills.technical.join(', ')}</span>
                  </div>
                )}
                {resumeData.skills.toolsAndTechnologies.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900 text-sm">Tools & Technologies: </span>
                    <span className="text-xs text-gray-700">{resumeData.skills.toolsAndTechnologies.join(', ')}</span>
                  </div>
                )}
                {resumeData.skills.softSkills.length > 0 && (
                  <div>
                    <span className="font-bold text-gray-900 text-sm">Soft Skills: </span>
                    <span className="text-xs text-gray-700">{resumeData.skills.softSkills.join(', ')}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Projects */}
          {resumeData.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.projects.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="item-container">
                    <div className="left-content">
                      <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                      <p className="text-xs text-gray-700 mb-1">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <p className="tech-list text-xs text-gray-600">
                          <span className="font-medium">Technologies: </span>
                          {project.technologies.join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="right-content">
                      <div className="text-xs flex flex-col gap-1">
                        {project.link && createClickableLink(project.link, "Live")}
                        {project.github && createClickableLink(project.github, "GitHub")}
                        {project.demo && createClickableLink(project.demo, "Demo")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.certifications.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="item-container">
                    <div className="left-content">
                      <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                      <p className="text-gray-700 text-sm">{cert.issuer}</p>
                    </div>
                    <div className="right-content">
                      <p className="text-xs">{formatDate(cert.date)}</p>
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
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                {sectionTitles.awards.toUpperCase()}
              </h2>
              <div className="space-y-2">
                {resumeData.awards.map((award) => (
                  <div key={award.id} className="item-container">
                    <div className="left-content">
                      <h3 className="font-bold text-gray-900 text-sm">{award.title}</h3>
                      <p className="text-gray-700 text-sm">{award.issuer}</p>
                      {award.description && <p className="text-xs text-gray-600 mt-1">{award.description}</p>}
                    </div>
                    <div className="right-content">
                      <p className="text-xs">{formatDate(award.date)}</p>
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
