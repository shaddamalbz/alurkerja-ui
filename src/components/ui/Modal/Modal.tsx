import { Dialog, Transition } from '@headlessui/react'
import React, { FC, Fragment, useState } from 'react'

interface Modal extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  triggerButton: React.ReactNode
  title?: string
  children:
    | (({ closeModal, openModal }: { closeModal: () => void; openModal: () => void }) => JSX.Element)
    | JSX.Element
}

const Modal: FC<Modal> = ({ triggerButton, children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const renderTitle = () =>
    title && (
      <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900 mb-4">
        {title}
      </Dialog.Title>
    )

  return (
    <Fragment>
      <div onClick={openModal}>{triggerButton}</div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black opacity-20" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6  text-left align-middle shadow-xl transition-all overflow-y-auto">
                  {renderTitle()}
                  {typeof children === 'function' ? children({ closeModal, openModal }) : children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

export default Modal
