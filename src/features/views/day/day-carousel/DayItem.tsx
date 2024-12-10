import classes from './DayItem.module.scss'

import classNames from 'classnames/bind'
import { isAfter, isToday } from 'date-fns'
import { HTMLAttributes, useMemo } from 'react'
import { useFilteredActivities } from '@activities/useFilteredActivities'
import Badge from '@generic/Badge'

const cx = classNames.bind(classes)

interface DayItemProps extends HTMLAttributes<HTMLDivElement> {
  date: Date
  active?: boolean
}

const DayItem = ({ date, active, onClick }: DayItemProps) => {
  const [activities] = useFilteredActivities(date)

  const memoizedValues = useMemo(() => {
    const dayLetter = date.toLocaleString('default', {
      weekday: 'long',
    })[0]
    const dayNumber = date.getDate()
    const count = activities.length
    const rating =
      activities.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0,
      ) / activities.length
    const invalid = isAfter(date, new Date())
    const mappedRating = rating && Math.round((rating / 5) * 6 + 1)

    // DorHakim
    const today = isToday(date)

    // Or implementing ourselves
    // const today =
    //   date.toLocaleDateString('he') === new Date().toLocaleDateString('he')
    //     ? true
    //     : false

    return { dayLetter, dayNumber, count, invalid, mappedRating, today }
  }, [date, activities])

  const { dayLetter, dayNumber, count, invalid, mappedRating, today } =
    memoizedValues

  return (
    <div className={classes.dayItem}>
      {count > 0 && (
        <Badge
          className={cx({
            dayActivityCount: true,
            active,
          })}
          value={count}
          color="var(--color-count)"
        />
      )}
      <div
        className={cx({
          dayCard: true,
          active,
          noCount: !count,
          activeNoCount: active && !count,
          invalid,
          [`ratingColor${mappedRating}`]: !active && mappedRating,
          // DorHakim
          today,
        })}
        onClick={invalid ? undefined : onClick}
      >
        <span className={classes.dayLetter}>{dayLetter}</span>
        <span className={classes.dayNumber}>{dayNumber}</span>
      </div>
    </div>
  )
}

export default DayItem
