import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { MdCancel } from 'react-icons/md'

export const Modal = ({
  children,
  triggerButton,
  title,
  description,
  actionButton
}: {
  children: ReactNode
  triggerButton: ReactNode
  title: string
  description: string
  actionButton: ReactNode
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-hsl-10 bg-opacity-40 fixed inset-0" />
        <Dialog.Content className="bg-hsl-15 rounded-md max-w-screen-md w-full shadow shadow-hsl-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[85vh] p-6 focus:outline-none">
          <Dialog.Title className="m-0 font-medium text-hsl-95 text-sm">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 mb-5 text-hsl-75 text-sm">
            {description}
          </Dialog.Description>
          <div className="min-w-fit">{children}</div>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end'
            }}
          >
            <Dialog.Close asChild>{actionButton}</Dialog.Close>
          </div>
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

export const ModalActions = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-4 justify-end">{children}</div>
}

export const ModalForm = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <form {...rest} className="flex flex-col gap-4">
      {children}
    </form>
  )
}
