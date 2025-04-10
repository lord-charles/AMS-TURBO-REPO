"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function ClearanceRequirements() {
  const requirements = [
    {
      department: "Library",
      items: ["Return all borrowed books", "Clear any outstanding fines", "Return library card"],
    },
    {
      department: "Finance",
      items: [
        "Clear all tuition fee balances",
        "Pay graduation fee (if applicable)",
        "Clear any other financial obligations",
      ],
    },
    {
      department: "Accommodation",
      items: ["Vacate room and return keys", "Room inspection clearance", "Clear any damages or outstanding bills"],
    },
    {
      department: "Academic Department",
      items: [
        "Complete all required coursework",
        "Submit final year project/thesis",
        "Return any department equipment",
      ],
    },
    {
      department: "Sports & Recreation",
      items: ["Return any sports equipment", "Clear gym membership", "Return sports uniform (if applicable)"],
    },
    {
      department: "Security",
      items: ["Return student ID card", "Return parking permit (if applicable)", "Clear any security violations"],
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full">
      {requirements.map((req, index) => (
        <motion.div
          key={req.department}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <AccordionItem value={req.department} className="border-b border-slate-200">
            <AccordionTrigger className="text-foreground hover:text-foreground hover:bg-muted px-3 py-4 rounded-md transition-colors">
              {req.department}
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-4">
              <ul className="space-y-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  )
}
