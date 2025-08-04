import * as React from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const DeleteConfirmDialog = ({ 
  children, // El botón trigger
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer. Esto eliminará permanentemente el registro.",
  itemName = null,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  variant = "destructive", // "destructive" | "warning"
  isLoading = false, // Estado de loading
  ...props 
}) => {
  const IconComponent = variant === "warning" ? AlertTriangle : Trash2;
  const iconColor = variant === "warning" ? "text-yellow-500" : "text-red-500";

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20">
              <IconComponent className={`size-5 ${iconColor}`} />
            </div>
            <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
          </div>
          
          <AlertDialogDescription className="text-left">
            {description}
            {itemName && (
              <span className="block mt-2 font-medium text-foreground">
                "{itemName}"
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
          >
            {isLoading ? (
              <>
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="size-4 mr-2" />
                {confirmText}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteConfirmDialog };
