"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PaymentInstruction {
  instructions: string[]
  accountInfo: string
}

export function PaymentInstructionsDisplay({ instructions }: { instructions: PaymentInstruction }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-4">
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Important: Follow these steps carefully</AlertTitle>
        <AlertDescription className="text-blue-800 mt-2">
          <ol className="list-decimal list-inside space-y-2 mt-2">
            {instructions.instructions.map((instruction, idx) => (
              <li key={idx} className="text-sm">
                {instruction}
              </li>
            ))}
          </ol>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <code className="text-sm font-mono text-gray-900 break-all">
                {instructions.accountInfo}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(instructions.accountInfo, 0)}
                className="ml-2 flex-shrink-0"
              >
                {copiedIndex === 0 ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-600">
              Save this information to complete your payment
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
