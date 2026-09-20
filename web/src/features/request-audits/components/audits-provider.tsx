import React, { useState } from 'react'

import { type RequestAudit } from '../types'

type RequestAuditsContextType = {
  detailRow: RequestAudit | null
  setDetailRow: React.Dispatch<React.SetStateAction<RequestAudit | null>>
}

const RequestAuditsContext =
  React.createContext<RequestAuditsContextType | null>(null)

export function RequestAuditsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [detailRow, setDetailRow] = useState<RequestAudit | null>(null)

  return (
    <RequestAuditsContext value={{ detailRow, setDetailRow }}>
      {children}
    </RequestAuditsContext>
  )
}

export function useRequestAudits() {
  const context = React.useContext(RequestAuditsContext)
  if (!context) {
    throw new Error(
      'useRequestAudits must be used within a RequestAuditsProvider'
    )
  }
  return context
}
