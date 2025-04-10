"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Download, Printer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Student {
  id: string
  name: string
  course: string
  year: string
  registrationNumber: string
  faculty: string
}

interface Department {
  name: string
  approvedBy: string
  approvedAt: string
}

interface Certificate {
  certificateNumber: string
  issueDate: string
  validUntil: string
  departments: Department[]
  registrarSignature: boolean
  registrarName: string
  registrarTitle: string
}

interface ClearanceCertificateProps {
  student: Student
  certificate: Certificate
}

export function ClearanceCertificate({ student, certificate }: ClearanceCertificateProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 1000)
  }

  const handleDownload = () => {
    // In a real app, you would generate a PDF and download it
    alert("In a production environment, this would download a PDF of the certificate")
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" onClick={handlePrint} disabled={isPrinting} className="gap-2">
          <Printer className="h-4 w-4" />
          Print Certificate
        </Button>
        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="border-2 border-slate-200 shadow-md print:border-0 print:shadow-none">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">Certificate of Clearance</h2>
              <p className="text-slate-500">Certificate No: {certificate.certificateNumber}</p>
            </div>

            <div className="my-8 space-y-2">
              <p className="text-lg text-slate-700">This is to certify that</p>
              <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
              <p className="text-slate-700">
                Registration Number: <span className="font-medium">{student.registrationNumber}</span>
              </p>
              <p className="text-slate-700">
                Course: <span className="font-medium">{student.course}</span>
              </p>
              <p className="text-slate-700">
                Faculty: <span className="font-medium">{student.faculty}</span>
              </p>
              <p className="mt-4 text-slate-700">
                Has been cleared by all departments of the university and has no outstanding obligations.
              </p>
            </div>

            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-sm font-medium text-slate-600">Issue Date:</p>
                <p className="text-slate-900">{format(new Date(certificate.issueDate), "PPP")}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-600">Valid Until:</p>
                <p className="text-slate-900">{format(new Date(certificate.validUntil), "PPP")}</p>
              </div>
            </div>

            <div className="my-8">
              <h4 className="text-lg font-medium mb-4 text-slate-800">Department Approvals</h4>
              <div className="grid grid-cols-2 gap-4">
                {certificate.departments.map((dept) => (
                  <div key={dept.name} className="text-left border-b pb-2 border-slate-200">
                    <p className="font-medium text-slate-800">{dept.name}</p>
                    <p className="text-sm text-slate-500">Approved by: {dept.approvedBy}</p>
                    <p className="text-sm text-slate-500">Date: {format(new Date(dept.approvedAt), "PP")}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex justify-center mb-4">
                {certificate.registrarSignature && (
                  <div className="text-center">
                    <div className="h-16 mx-auto mb-2 w-40 italic text-3xl text-blue-600 font-signature">
                      {certificate.registrarName}
                    </div>
                    <p className="font-medium text-slate-800">{certificate.registrarName}</p>
                    <p className="text-sm text-slate-500">{certificate.registrarTitle}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  This certificate is not valid without the official university seal.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
