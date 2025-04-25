import classes from './DayView.module.scss'

import { CalendarBlank, Sliders } from '@phosphor-icons/react'
import classNames from 'classnames/bind'
import { format, isWithinInterval } from 'date-fns'
import { IndexableType } from 'dexie'
import { useContext, useMemo, useState } from 'react'
import ActivityItem from '../../../activities/activity-item/ActivityItem'
import Badge from '../../../../components/generic/Badge'
import CategoryFilterModal from '../../../categories/category-filter-modal/CategoryFilterModal'
import { DayViewContext } from '../DayViewContext'
import { useFilteredActivities } from '../../../activities/useFilteredActivities'
import DayCarousel from '../day-carousel/DayCarousel'
import { motion } from 'framer-motion'
import { fadeAnimationProps } from '@/utils/constants/motion-animations'

const cx = classNames.bind(classes)

function getDisplayMonthYear(selectedDay: Date, displayedWeek: Date[]) {
  const startDateOfWeek = displayedWeek[0]
  const endDateOfWeek = displayedWeek[6]
  const isDateInWeek = isWithinInterval(selectedDay, {
    start: startDateOfWeek,
    end: endDateOfWeek,
  })

  const displayedMonthYear = isDateInWeek ? selectedDay : startDateOfWeek

  return format(displayedMonthYear, 'MMMM yyyy')
}

function DayView() {
  const { selectedDay, displayedWeek } = useContext(DayViewContext)
  const [activities, selectedCategories] = useFilteredActivities(selectedDay)

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<IndexableType>(0)

  const displayedMonthYear = useMemo(
    () => getDisplayMonthYear(selectedDay, displayedWeek),
    [selectedDay, displayedWeek],
  )

  return (
    <motion.div 
      className={classes.viewContainer}
      {...fadeAnimationProps}
    >
      <div className={classes.header}>
        <h1 className={classes.displayedMonth}>{displayedMonthYear}</h1>
        <div className={cx({ clickableText: true, invalid: true })}>
          Change View
          <CalendarBlank />
        </div>
      </div>
      <DayCarousel />
      <div className={classes.activitiesHeading}>
        <h2 className={classes.title}>Activities</h2>
        <div
          className={classes.clickableText}
          onClick={() => setIsFilterModalOpen(true)}
        >
          Filters
          <Sliders />
          {selectedCategories.length > 0 && (
            <Badge
              top
              right
              value={selectedCategories.length}
              color="var(--color-filter)"
            />
          )}
        </div>
      </div>
      <div className={classes.activitiesWrapper}>
        <div className={classes.activitiesContainer}>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id.toLocaleString()}
              {...activity}
              isSelected={activity.id === selectedActivity}
              onSelectedActivityChange={setSelectedActivity}
            />
          ))}
        </div>
      </div>
      {isFilterModalOpen && (
        <CategoryFilterModal onClose={() => setIsFilterModalOpen(false)} />
      )}
    </motion.div>
  )
}

export default DayView
