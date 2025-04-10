import type { Metadata } from "next"
import PaymentsPageClient from "./PaymentsPageClient"

export const metadata: Metadata = {
  title: "Payments - Student Portal",
  description: "Make payments and view transaction history",
}

export default function PaymentsPage() {
  return <PaymentsPageClient />
}
