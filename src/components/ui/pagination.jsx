"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage = 10, 
  totalItems = 0 
}) {
  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Lógica para páginas con puntos suspensivos
      if (currentPage <= 3) {
        // Mostrar primeras páginas
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Mostrar últimas páginas
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Mostrar páginas alrededor de la actual
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-gray-600">
        Mostrando {startItem} - {endItem} de {totalItems} reportes
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        
        <div className="flex items-center space-x-1">
          {generatePageNumbers().map((page, index) => (
            page === '...' ? (
              <div key={`ellipsis-${index}`} className="px-2">
                <MoreHorizontal className="h-4 w-4" />
              </div>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-[32px] h-8"
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
