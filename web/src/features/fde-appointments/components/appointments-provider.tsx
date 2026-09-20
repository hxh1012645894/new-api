import React, { useState } from 'react'

import useDialogState from '@/hooks/use-dialog'

import { type FdeAppointment, type FdeAppointmentsDialogType } from '../types'

type FdeAppointmentsContextType = {
  open: FdeAppointmentsDialogType | null
  setOpen: (str: FdeAppointmentsDialogType | null) => void
  currentRow: FdeAppointment | null
  setCurrentRow: React.Dispatch<React.SetStateAction<FdeAppointment | null>>
  refreshTrigger: number
  triggerRefresh: () => void
}

const FdeAppointmentsContext =
  React.createContext<FdeAppointmentsContextType | null>(null)

export function FdeAppointmentsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useDialogState<FdeAppointmentsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<FdeAppointment | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1)

  return (
    <FdeAppointmentsContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        refreshTrigger,
        triggerRefresh,
      }}
    >
      {children}
    </FdeAppointmentsContext>
  )
}

export function useFdeAppointments() {
  const context = React.useContext(FdeAppointmentsContext)
  if (!context) {
    throw new Error(
      'useFdeAppointments must be used within a FdeAppointmentsProvider'
    )
  }
  return context
}
