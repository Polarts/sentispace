import { ChildrenProps, ClassNameProps } from '@utils/types'
import classNames from 'classnames'
import { FC } from 'react'
import { createPortal } from 'react-dom'
import classes from './FullscreenModal.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

type FSModalComp = FC<ClassNameProps & ChildrenProps & { open: boolean }> & {
  ButtonsPanel: FC<ClassNameProps & ChildrenProps>
  Header: FC<ClassNameProps & ChildrenProps>
  Title: FC<ClassNameProps & ChildrenProps>
}

/**
 * This component has been written in React-Bootstrap style.
 * Each sub-component accepts a custom className to be added to the built-in one.
 *
 * Use FullscreenModal.Header for the styled header.
 *
 * Use FullscreenModal.Title inside the header for the styled title.
 *
 * Use FullscreenModal.ButtonsPanel for the bottom panel where you can stack buttons and other stuff.
 *
 * @param children React children
 */
const FullscreenModal: FSModalComp = ({ children, className, open }) => {
  return createPortal(
    <AnimatePresence mode='wait'>
      {open && (
        <motion.div
          key={'modal-wrapper'}
          className={classNames(classes.fullscreenModal, className)}
          onClick={(event) => event.stopPropagation()}
          transition={{ ease: 'linear' }}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
        >
          <div className={classes.container}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
    ,
    document.body,
  )
}

type FullscreenComponentsProps = {
  className?: string
  children: React.ReactNode
}

FullscreenModal.ButtonsPanel = ({
  className,
  children,
}: FullscreenComponentsProps) => (
  <div className={classNames(classes.buttonsPanel, className)}>{children}</div>
)
FullscreenModal.ButtonsPanel.displayName = 'FullscreenModal.ButtonsPanel'

FullscreenModal.Header = ({
  className,
  children,
}: FullscreenComponentsProps) => (
  <div className={classNames(classes.header, className)}>{children}</div>
)
FullscreenModal.Header.displayName = 'FullscreenModal.Header'

FullscreenModal.Title = ({
  className,
  children,
}: FullscreenComponentsProps) => (
  <h1 className={classNames(classes.title, className)}>{children}</h1>
)
FullscreenModal.Title.displayName = 'FullscreenModal.Title'

FullscreenModal.displayName = 'FullscreenModal'

export default FullscreenModal
