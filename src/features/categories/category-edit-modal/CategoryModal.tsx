import classes from './CategoryModal.module.scss'

import classNames from 'classnames/bind'
import { useContext, useEffect, useState } from 'react'
import Alert, { SeverityType } from '../../../components/generic/Alert'
import ModalPopup, { ButtonType } from '../../../components/generic/modals/ModalPopup'
import TextField from '../../../components/input/text-field/TextField'
import { CategoriesContext } from '../CategoriesContext'
import { db } from '../../../data/Database'
import { Category } from '../Category.interface'

const cx = classNames.bind(classes)

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  category?: Category
}

type AlertType = {
  severity: SeverityType
  title: string
  description: string
}

const CategoryModal = ({ open, onClose, category }: CategoryModalProps) => {
  const { categories } = useContext(CategoriesContext)
  const [name, setName] = useState<string>(category?.name || '')
  const [color, setColor] = useState<number>(category?.color || 0)
  const [deleteGuard, setDeleteGuard] = useState<boolean>(true)
  const [alert, setAlert] = useState<AlertType | null>()

  useEffect(() => {
    setAlert((prev) => {
      if (!prev) return prev
      setDeleteGuard((prev) => (!prev ? true : prev))
      return null
    })
  }, [name, color])

  const title = category ? 'Edit Category' : 'Create Category'
  const primaryButtonText = category ? 'Save' : 'Create Category'
  const secondaryButtonText = category ? 'Delete Category' : 'Cancel'

  const disabledPrimaryButton =
    (category?.name === name && category.color === color) ||
    (!category && (!name.length || !color))

  const onButtonClick = async (button: ButtonType) => {
    switch (button) {
      case 'primary':
        // eslint-disable-next-line no-case-declarations
        const categoryNames: string[] | undefined = categories?.map(
          (category) => category.name,
        )

        if (categoryNames?.includes(name) && category?.name !== name) {
          setAlert({
            severity: 'error',
            title: 'Category already exists',
            description: 'Try something else.',
          })
          return
        }

        if (!category) {
          db.categories.add({ name, color } as Category)
        } else {
          if (category.name !== name || category.color !== color)
            db.categories.update(category.id, { name, color })
        }

        onClose()
        break
      case 'secondary':
        if (category && deleteGuard) {
          setAlert({
            severity: 'warning',
            title: 'Are you sure about this?',
            description: 'Click "Delete Category" again to proceed.',
          })
          setDeleteGuard(false)
          return
        }
        if (category) {
          db.transaction('rw', db.categories, db.activities, () => {
            db.categories.delete(category.id)

            db.activities.toCollection().modify((activity) => {
              const index = activity.categoryIds.indexOf(category.id)
              if (index > -1) {
                activity.categoryIds.splice(index, 1)
              }
            })
          })
        }
        onClose()
        break
      case 'close':
        onClose()
        break
    }
  }

  return (
    <ModalPopup
      open={open}
      title={title}
      primaryButtonText={primaryButtonText}
      disabledPrimaryButton={disabledPrimaryButton}
      secondaryButtonText={secondaryButtonText}
      dangerousSecondaryButton={!!category}
      onButtonClick={onButtonClick}
    >
      <TextField
        placeholder="Name your category"
        iconKey={'BookmarkSimple'}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div className={classes.heading}>Select a color for your category</div>
      <div className={classes.colorsContainer}>
        {Array.from({ length: 16 }, (_, index) => {
          const colorIndex = index + 1
          return (
            <CategoryColor
              key={index}
              colorIndex={colorIndex}
              isSelected={colorIndex === color}
              onColorChange={setColor}
            />
          )
        })}
      </div>
      {alert && (
        <Alert
          className={classes.alert}
          severity={alert.severity}
          title={alert.title}
          description={alert.description}
        />
      )}
    </ModalPopup>
  )
}

interface CategoryColorProps {
  onColorChange: (color: number) => void
  colorIndex: number
  isSelected: boolean
}

const CategoryColor = ({
  colorIndex,
  isSelected,
  onColorChange,
}: CategoryColorProps) => {
  return (
    <div
      onClick={() => onColorChange(colorIndex)}
      className={cx({
        colorSquare: true,
        currentColor: isSelected,
        [`color${colorIndex}`]: true,
      })}
    ></div>
  )
}

export default CategoryModal
