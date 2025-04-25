import classes from './ModalPopup.module.scss'

import { KeyboardEvent, MouseEvent, ReactNode, TouchEvent } from 'react'
import { X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'
import Button from '../../input/button/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeAnimationProps } from '@/utils/constants/motion-animations'

export type ButtonType = 'primary' | 'secondary' | 'close'
export type onButtonClick = (button: ButtonType) => void

interface ModalPopupProps {
  title: string
  primaryButtonText: string
  secondaryButtonText: string
  disabledPrimaryButton?: boolean
  dangerousSecondaryButton?: boolean
  onButtonClick: onButtonClick
  open: boolean
  children: ReactNode
}

const CLOSE_ICON_PROPS = {
  size: 30,
}

const ModalPopup = ({
  title,
  primaryButtonText,
  secondaryButtonText,
  disabledPrimaryButton,
  dangerousSecondaryButton,
  onButtonClick,
  open,
  children,
}: ModalPopupProps) => {
  const handlePrimaryButtonClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()

    if (disabledPrimaryButton) return

    onButtonClick('primary')
  }

  const handleSecondaryButtonClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
    onButtonClick('secondary')
  }

  const handleClose = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
    event.stopPropagation()
    onButtonClick('close')
  }

  const handleModalClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={classes.modalOverlay}
          onClick={(event) => handleClose(event)}
          transition={{ ease: 'easeInOut' }}
          {...fadeAnimationProps}
        >
          <motion.div
            className={classes.modalWindow}
            onClick={handleModalClick}
            tabIndex={0}
            transition={{ ease: 'easeInOut' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <div className={classes.title}>{title}</div>
            <div className={classes.closeModal} onClick={handleClose} tabIndex={0}>
              <X {...CLOSE_ICON_PROPS} />
            </div>
            <div className={classes.content}>{children}</div>
            <div className={classes.buttons}>
              <Button
                variant="primary"
                onClick={handlePrimaryButtonClick}
                tabIndex={0}
                disabled={disabledPrimaryButton}
              >
                {primaryButtonText}
              </Button>
              <Button
                variant="secondary"
                onClick={handleSecondaryButtonClick}
                tabIndex={0}
                underline
                isDangerous={dangerousSecondaryButton}
              >
                {secondaryButtonText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ModalPopup
