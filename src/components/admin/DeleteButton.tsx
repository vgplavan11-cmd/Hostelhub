"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
  id: string
  onDelete: (id: string) => Promise<void>
}

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          startTransition(async () => {
            await onDelete(id)
          })
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
