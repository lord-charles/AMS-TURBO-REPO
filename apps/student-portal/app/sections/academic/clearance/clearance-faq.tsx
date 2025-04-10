import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ClearanceFAQ() {
  const faqs = [
    {
      question: "What is the student clearance process?",
      answer:
        "The student clearance process is a procedure that ensures students have fulfilled all their obligations to the university before graduation, transfer, or withdrawal. This includes clearing any outstanding fees, returning borrowed items, and obtaining approvals from various departments.",
    },
    {
      question: "When should I apply for clearance?",
      answer:
        "You should apply for clearance at least 4-6 weeks before your intended graduation date, transfer, or withdrawal. This allows sufficient time for all departments to process your clearance application.",
    },
    {
      question: "What forms do I need for clearance?",
      answer:
        "You'll need department-specific clearance forms which can be downloaded from the 'Forms' section after submitting your application. These typically include forms for Library, Finance, Accommodation, Academic Department, Sports & Recreation, and Security.",
    },
    {
      question: "How does the physical clearance process work?",
      answer:
        "After submitting your application online, you'll download the necessary forms, visit each department physically with these forms, get them signed by authorized personnel, and finally submit the completed forms to the Registrar's office.",
    },
    {
      question: "How long does the clearance process take?",
      answer:
        "The clearance process typically takes 2-3 weeks, depending on how quickly you can visit each department and get your forms signed. It's recommended to start early to avoid delays.",
    },
    {
      question: "What happens if a department rejects my clearance?",
      answer:
        "If a department rejects your clearance, they will indicate the reason on your form. You'll need to address the specific issue (such as returning borrowed items, paying outstanding fees, etc.) and then revisit the department for approval.",
    },
    {
      question: "Can I track the status of my clearance application?",
      answer:
        "Yes, you can track the status of your clearance application in real-time through the 'Overview' section of the clearance portal. This shows which departments have approved your clearance and which are still pending.",
    },
    {
      question: "What if I have outstanding fees?",
      answer:
        "If you have outstanding fees, you'll need to clear them with the Finance Department before they can sign your clearance form. You can pay outstanding fees at the university finance office or through the approved payment methods.",
    },
    {
      question: "How do I get my clearance certificate?",
      answer:
        "Once all departments have approved your clearance and you've submitted the signed forms to the Registrar's office, your clearance certificate will be generated and available for download from the 'Certificate' section of the clearance portal.",
    },
    {
      question: "Is the clearance certificate valid indefinitely?",
      answer:
        "No, clearance certificates typically have a validity period of one year from the date of issue. The expiration date will be clearly indicated on your certificate.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Common questions about the student clearance process</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
