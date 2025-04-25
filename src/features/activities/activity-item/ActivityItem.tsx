import { fadeAnimationProps } from '@/utils/constants/motion-animations'
import { getIconComponent } from '@assets/icons'
import { Category } from '@categories/Category.interface'
import { Heart, IconProps } from '@phosphor-icons/react'
import { formatTimeRange } from '@utils/functions'
import { useOutsideClick } from '@utils/hooks'
import classNames from 'classnames/bind'
import { IndexableType } from 'dexie'
import { motion } from 'framer-motion'
import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { db } from '../../../data/Database'
import { CategoriesContext } from '../../categories/CategoriesContext'
import CategoryBadge from '../../categories/category-selection/category-badge/CategoryBadge'
import ActivityEditForm from '../activity-form/ActivityEditForm'
import { Activity } from '../Activity.interface'
import ActivityOption, {
  ActivityOptionProps
} from './activity-option/ActivityOption'
import classes from './ActivityItem.module.scss'

const cx = classNames.bind(classes)

const RATING_ICON_PROPS: IconProps = {
  weight: 'fill',
  size: 20,
  color: 'var(--color-heart)',
}

interface ActivityComponentProps extends Activity {
  isSelected: boolean
  onSelectedActivityChange: (id: IndexableType) => void
  templateView?: boolean
  onCloseTemplateModal?: () => void
}

const ActivityItem = ({
  id,
  iconKey,
  title,
  description,
  rating,
  startTime,
  endTime,
  categoryIds,
  isTemplate,
  isSelected,
  onSelectedActivityChange,
  templateView,
  onCloseTemplateModal,
}: ActivityComponentProps) => {
  const { categories } = useContext(CategoriesContext)
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false)
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false)

  const activityRef = useRef<HTMLElement>(null)

  useOutsideClick(activityRef, () => onSelectedActivityChange(0))

  useEffect(() => {
    setIsDuplicate((prev) => {
      if (isEditFormOpen && prev) return prev
      return false
    })
  }, [isEditFormOpen])

  const associatedCategories: Category[] | undefined = categories?.filter(
    (category) =>
      category && category.id ? categoryIds.includes(category.id) : false,
  )

  const handleOnClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation()
    onSelectedActivityChange(isSelected ? 0 : id)
  }

  const handleOnFormOpen = useCallback(() => {
    setIsEditFormOpen(true)
    onSelectedActivityChange(0)
  }, [onSelectedActivityChange])

  const handleOnTemplateChange = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.stopPropagation()
      db.activities.update(id, { isTemplate: isTemplate === 1 ? 0 : 1 })
    },
    [id, isTemplate],
  )

  const handleOnDuplicateActivity = useCallback(() => {
    setIsDuplicate(true)
    handleOnFormOpen()
  }, [handleOnFormOpen])

  const activityOptions: ActivityOptionProps[] = useMemo(
    () => [
      {
        onClick: handleOnFormOpen,
        label: 'Edit',
        iconKey: 'NotePencil',
      },
      {
        onClick: handleOnDuplicateActivity,
        label: 'Duplicate',
        iconKey: 'Copy',
      },
      {
        onClick: handleOnTemplateChange,
        label: 'Template',
        iconKey: isTemplate ? 'File' : 'FileDashed',
        iconWeight: isTemplate ? 'fill' : 'light',
      },
    ],
    [
      handleOnDuplicateActivity,
      handleOnFormOpen,
      handleOnTemplateChange,
      isTemplate,
    ],
  )

  const templateOptions: ActivityOptionProps[] = useMemo(
    () => [
      {
        onClick: handleOnDuplicateActivity,
        label: 'Create Activity',
        iconKey: 'FilePlus',
      },
      {
        onClick: handleOnTemplateChange,
        label: 'Remove',
        iconKey: isTemplate ? 'File' : 'FileDashed',
        iconWeight: isTemplate ? 'fill' : 'light',
      },
    ],
    [handleOnDuplicateActivity, handleOnTemplateChange, isTemplate],
  )

  const IconComponent = getIconComponent(iconKey)

  return (
    <article
      className={cx(classes.activity, {
        options: isSelected,
      })}
      onClick={handleOnClick}
      ref={activityRef}
    >
      {isSelected && (
        <motion.div
          key={'selection-pane'}
          className={classes.blurred}
          {...fadeAnimationProps}
        >
          {(templateView ? templateOptions : activityOptions).map((option, i) => (
            <motion.div
              key={`option_${option.label}_${option.iconKey}`}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: '0%', transition: { delay: i * 0.1 } }}
              exit={{ opacity: 0, y: '-100%' }}
            >
              <ActivityOption {...option} />
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className={classes.content}>
        <div className={classes.icon}>
          <IconComponent />
        </div>
        <h3 className={classes.title}>{title}</h3>
        {!templateView && (
          <time className={classes.time}>
            {formatTimeRange(startTime, endTime)}
          </time>
        )}
        <span className={classes.description}>{description}</span>
      </div>
      <div className={classes.footer}>
        <span className={classes.rating}>
          <Heart {...RATING_ICON_PROPS} />
          {rating}
        </span>
        <div className={classes.categories}>
          {associatedCategories?.map(({ id, name, color }) => (
            <CategoryBadge
              key={id.toString()}
              id={id}
              name={name}
              color={color}
            />
          ))}
        </div>
      </div>
      <ActivityEditForm
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onCloseTemplateSelection={
          onCloseTemplateModal ? onCloseTemplateModal : undefined
        }
        activity={{
          iconKey,
          title,
          description,
          rating,
          categoryIds,
          ...(templateView || isDuplicate ? {} : { id, startTime, endTime }),
        }}
      />

    </article>
  )
}

export default ActivityItem
