import { Activity } from '@activities/Activity.interface'
import { Category } from '@categories/Category.interface'
import classNames from 'classnames'
import { useContext } from 'react'
import { InsightsContext } from '../../../data/contexts/InsightsContext'
import classes from './DistributionChart.module.scss'

const UNCATEGORIZED = 'Uncategorized'

type SummarizedCategoriesWithCount = {
  [id: string]: { name: string; color: number; count: number }
}

const summarizedCategories = (
  categories: Category[],
): SummarizedCategoriesWithCount => {
  return categories.reduce((acc, { id, name, color }) => {
    acc[`${id}`] = { name, color, count: 0 }
    return acc
  }, {} as SummarizedCategoriesWithCount)
}

function groupByCategory(activities: Activity[], categories: Category[]) {
  const group: SummarizedCategoriesWithCount = {
    [UNCATEGORIZED]: { name: UNCATEGORIZED, color: 0, count: 0 },
    ...summarizedCategories(categories),
  }

  activities.forEach((activity) => {
    const isUncategorized = activity.categoryIds.length === 0

    if (isUncategorized) {
      group[UNCATEGORIZED].count++
      return
    }

    activity.categoryIds.forEach(
      (categoryId) => group[String(categoryId)].count++,
    )
  })

  return group
}

export default function DistributionChart() {
  const { activities, categories } = useContext(InsightsContext)

  const groupedByCategory = groupByCategory(activities, categories)

  const highestCount = Object.values(groupedByCategory).reduce((prev, curr) => {
    return curr.count > prev.count ? curr : prev
  }).count

  return (
    <div className={classNames('card', classes.card)}>
      <div className={classes.cardContainer}>
        <h2 className={classes.heading}>Activity Distribution</h2>
        <div className={classes.chart}>
          {Object.values(groupedByCategory)
            .sort((a, b) => b.count - a.count)
            .map(({ count, name, color }) => {
              const pct = Math.round((count / highestCount) * 100)

              return (
                <div key={name} className={classes.barWrapper}>
                  <label className={classes.barLabel}>
                    {name} <span>{count}</span>
                  </label>
                  <div className={classes.barShadow}>
                    <div
                      className={classes.bar}
                      style={{
                        width: `${pct}%`,
                        backgroundColor: `var(--color-category-${color})`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
