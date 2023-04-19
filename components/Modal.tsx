import * as Dialog from '@radix-ui/react-dialog'
import React, { ReactNode } from 'react'
import { MdCancel } from 'react-icons/md'

export const Modal = ({
  triggerElement,
  title,
  description,
  children,
  actionButton
}: {
  triggerElement: ReactNode
  title: string
  description: string
  children: ReactNode
  actionButton?: ReactNode
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-hsl-5 bg-opacity-40 backdrop-blur-lg fixed inset-0" />
        <Dialog.Content className="bg-hsl-15 rounded-md shadow shadow-hsl-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md max-h-[85vh] p-6 focus:outline-none">
          <Dialog.Title className="m-0 font-medium text-sm">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 mb-5 text-hsl-90 text-sm">
            {description}
          </Dialog.Description>
          {children}
          {actionButton && (
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'flex-end'
              }}
            >
              <Dialog.Close asChild>{actionButton}</Dialog.Close>
            </div>
          )}
          <Dialog.Close asChild>
            <button
              style={{
                fontFamily: 'inherit',
                borderRadius: '100%',
                height: '25px',
                width: '25px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'black',
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
              aria-label="Close"
            >
              <MdCancel />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
