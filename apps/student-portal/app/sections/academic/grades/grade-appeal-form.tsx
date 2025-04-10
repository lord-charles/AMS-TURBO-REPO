"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, Upload, Save, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { CourseGrade } from "./types"
import { getGradeColor } from "./utils"

interface GradeAppealFormProps {
  course: CourseGrade
  onSubmit: (data: any) => void
  onSaveDraft: (data: any) => void
  onCancel: () => void
}

export function GradeAppealForm({ course, onSubmit, onSaveDraft, onCancel }: GradeAppealFormProps) {
  const [formData, setFormData] = useState({
    courseId: course.id,
    reason: '',
    specificComponent: '',
    expectedGrade: '',
    supportingEvidence: '',
    documents: [] as File[],
    agreeToFee: false,
    contactNumber: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {\
      const fileList = Array.from(e.target.files);  => 
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...fileList] }));
    };
  
  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for appeal is required';
    }
    
    if (!formData.specificComponent.trim()) {
      newErrors.specificComponent = 'Specific component is required';
    }
    
    if (!formData.supportingEvidence.trim()) {
      newErrors.supportingEvidence = 'Supporting evidence is required';
    }
    
    if (!formData.agreeToFee) {
      newErrors.agreeToFee = 'You must agree to the appeal fee';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const handleSaveDraft = () => {
    onSaveDraft(formData);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grade Appeal Request</CardTitle>
        <CardDescription>
          Submit a formal request to review your grade for {course.courseCode}: {course.courseName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-md">
            <div>
              <div className="text-sm text-muted-foreground">Current Grade</div>
              <div className={`text-xl font-bold ${getGradeColor(course.grade)}`}>
                {course.grade}
              </div>
              <div className="text-sm">{course.marks || '-'}/100</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Expected Grade</div>
              <Select 
                value={formData.expectedGrade} 
                onValueChange={(value) => handleChange('expectedGrade', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expected grade" />
                </SelectTrigger>
                <SelectContent>
                  {['A', 'B', 'C', 'D'].map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specificComponent">Specific Component Being Appealed</Label>
            <Select 
              value={formData.specificComponent} 
              onValueChange={(value) => handleChange('specificComponent', value)}
            >
              <SelectTrigger id="specificComponent" className={errors.specificComponent ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select component" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="finalExam">Final Examination</SelectItem>
                <SelectItem value="cat">Continuous Assessment Test</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="practical">Practical/Lab Work</SelectItem>
                <SelectItem value="calculation">Grade Calculation Error</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.specificComponent && <p className="text-xs text-red-500 mt-1">{errors.specificComponent}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Appeal</Label>
            <Textarea 
              id="reason" 
              placeholder="Provide a clear and concise reason for your appeal" 
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              className={errors.reason ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supportingEvidence">Supporting Evidence</Label>
            <Textarea 
              id="supportingEvidence" 
              placeholder="Describe the evidence that supports your appeal" 
              value={formData.supportingEvidence}
              onChange={(e) => handleChange('supportingEvidence', e.target.value)}
              className={errors.supportingEvidence ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.supportingEvidence && <p className="text-xs text-red-500 mt-1">{errors.supportingEvidence}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <div className="flex items-center gap-2">
              <Input
                id="documents"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <Label 
                htmlFor="documents" 
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
              >
                <Upload size={16} />
                <span>Upload Files</span>
              </Label>
              <div className="text-xs text-muted-foreground">
                Max 5MB per file (PDF, JPG, PNG)
              </div>
            </div>
            
            {formData.documents.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.documents.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="text-sm truncate">{file.name}</div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input 
              id="contactNumber" 
              placeholder="e.g., 07XX XXX XXX" 
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value)}
              className={errors.contactNumber ? 'border-red-500' : ''}
            />
            {errors.contactNumber && <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>}
          </div>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Appeal Fee</AlertTitle>
            <AlertDescription>
              A non-refundable fee of KES 1,000 applies per course appeal. This fee will be refunded only if the appeal is successful.
            </AlertDescription>
          </Alert>
          
          <div className="flex items-start space-x-2">
            <div className="pt-0.5">
              <Switch 
                id="agreeToFee" 
                checked={formData.agreeToFee}
                onCheckedChange={(checked) => handleChange('agreeToFee', checked)}
              />
            </div>
            <div>
              <Label htmlFor="agreeToFee" className="font-normal">
                I understand and agree to pay the non-refundable appeal fee of KES 1,000
              </Label>
              {errors.agreeToFee && <p className="text-xs text-red-500 mt-1">{errors.agreeToFee}</p>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="secondary" onClick={handleSaveDraft} className="gap-2">
            <Save size={16} />
            Save Draft
          </Button>
        </div>
        <Button onClick={handleSubmit} className="gap-2">
          <Send size={16} />
          Submit Appeal
        </Button>
      </CardFooter>
    </Card>
  );
}

