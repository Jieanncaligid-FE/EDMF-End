"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const closeDialog = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`uc-modal${className ? ` ${className}` : ""}`}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <div className="uc-modal__surface">
        <header className="uc-modal__header">
          <h2 className="uc-modal__title" id={titleId}>
            {title}
          </h2>
          <button
            className="uc-modal__close"
            type="button"
            aria-label="Close dialog"
            onClick={closeDialog}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="uc-modal__body">{children}</div>
        {footer && <footer className="uc-modal__footer">{footer}</footer>}
      </div>
    </dialog>
  );
}
