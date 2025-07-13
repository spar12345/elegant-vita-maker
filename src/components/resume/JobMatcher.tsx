
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResumeData } from "@/types/resume";

interface JobMatcherProps {
  resumeData: ResumeData;
}

export function JobMatcher({ resumeData }: JobMatcherProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const analyzeMatch = () => {
    // Simple ATS scoring algorithm
    const allResumeSkills = [
      ...resumeData.skills.technical,
      ...resumeData.skills.softSkills,
      ...resumeData.skills.toolsAndTechnologies
    ].map(skill => skill.toLowerCase());

    const jobDescWords = jobDescription.toLowerCase().split(/\W+/);
    const commonSkillKeywords = [
      'react', 'javascript', 'python', 'java', 'html', 'css', 'node',
      'sql', 'git', 'aws', 'docker', 'kubernetes', 'mongodb', 'postgresql',
      'leadership', 'communication', 'teamwork', 'problem solving', 'agile'
    ];

    const jobSkills = jobDescWords.filter(word => 
      commonSkillKeywords.includes(word) || word.length > 3
    );

    const matched = jobSkills.filter(skill => 
      allResumeSkills.some(resumeSkill => 
        resumeSkill.includes(skill) || skill.includes(resumeSkill)
      )
    );

    const missing = jobSkills.filter(skill => 
      !allResumeSkills.some(resumeSkill => 
        resumeSkill.includes(skill) || skill.includes(resumeSkill)
      )
    ).slice(0, 10);

    const score = Math.min(95, Math.max(30, (matched.length / Math.max(jobSkills.length, 1)) * 100));

    setMatchedSkills([...new Set(matched)]);
    setMissingSkills([...new Set(missing)]);
    setAtsScore(Math.round(score));

    // Generate suggestions
    const suggestionList = [
      "Add more specific technical skills mentioned in the job description",
      "Include quantifiable achievements in your experience section",
      "Use keywords from the job description in your summary",
      "Consider adding relevant certifications",
      "Optimize your resume format for ATS parsing"
    ];
    setSuggestions(suggestionList.slice(0, 3));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ATS Score Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to analyze how well your resume matches..."
              rows={8}
              className="mt-2"
            />
          </div>
          
          <Button onClick={analyzeMatch} disabled={!jobDescription.trim()}>
            Analyze Match
          </Button>
        </CardContent>
      </Card>

      {atsScore !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ATS Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold ${getScoreColor(atsScore)}`}>
                  {atsScore}%
                </div>
                <Progress value={atsScore} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  {atsScore >= 80 ? "Excellent match!" : 
                   atsScore >= 60 ? "Good match with room for improvement" : 
                   "Needs significant improvement"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Matched Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.length > 0 ? (
                  matchedSkills.map((skill, index) => (
                    <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No matched skills found</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Missing Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {missingSkills.length > 0 ? (
                  missingSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-red-200 text-red-800">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Great! No major skills missing</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
