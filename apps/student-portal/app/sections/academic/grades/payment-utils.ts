export interface PaymentMethod {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  processingTime: string
  fees: {
    fixed: number
    percentage: number
  }
}

export const getKenyanPaymentMethods = (): PaymentMethod[] => {
  return [
    {
      id: "mpesa",
      name: "M-PESA",
      description: "Pay directly using M-PESA mobile money",
      minAmount: 10,
      maxAmount: 150000,
      processingTime: "instant",
      fees: {
        fixed: 0,
        percentage: 0
      }
    },
    {
      id: "equity",
      name: "Equity Bank",
      description: "Pay through Equity Bank branch or EazzyPay",
      minAmount: 100,
      maxAmount: 1000000,
      processingTime: "1-2 business days",
      fees: {
        fixed: 50,
        percentage: 0.5
      }
    },
    {
      id: "kcb",
      name: "KCB Bank",
      description: "Pay through KCB branch or mobile banking",
      minAmount: 100,
      maxAmount: 1000000,
      processingTime: "1-2 business days",
      fees: {
        fixed: 50,
        percentage: 0.5
      }
    },
    {
      id: "cooperative",
      name: "Co-operative Bank",
      description: "Pay through Co-op branch or MCo-op Cash",
      minAmount: 100,
      maxAmount: 1000000,
      processingTime: "1-2 business days",
      fees: {
        fixed: 50,
        percentage: 0.5
      }
    }
  ]
}
