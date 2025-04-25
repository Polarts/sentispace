import classes from './Categories.module.scss'

import { Category } from '@categories/Category.interface'
import classNames from 'classnames/bind'
import { ForwardedRef, forwardRef, useState } from 'react'
import CategoryModal from '../category-edit-modal/CategoryModal'

const cx = classNames.bind(classes)

interface CategoryRowProps extends Category {
  className?: string
}

const CategoryRow = (
  { id, name, color, className }: CategoryRowProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div
      className={cx(className, { category: true })}
      onClick={() => setIsModalOpen(true)}
      ref={ref}
    >
      {name}
      <div
        className={cx({
          activities: true,
          [`color${color}`]: color,
        })}
      />
      <CategoryModal
        open={isModalOpen}
        category={{ id, name, color }}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default forwardRef(CategoryRow)
