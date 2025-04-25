import classes from './Categories.module.scss'

import { Category } from '@categories/Category.interface'
import { SmileyXEyes } from '@phosphor-icons/react'
import { sortObjectByKeyFactory } from '@utils/functions'
import classNames from 'classnames/bind'
import { IndexableType } from 'dexie'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import SortingIcon from '../../../components/generic/SortIcon'
import Button from '../../../components/input/button/Button'
import { CategoriesContext } from '../CategoriesContext'
import CategoryModal from '../category-edit-modal/CategoryModal'
import CategoryRow from './CategoryRow'
import { motion } from 'framer-motion'
import { fadeAnimationProps } from '@/utils/constants/motion-animations'

const cx = classNames.bind(classes)

const SORT_BY = {
  NAME: 'name',
  COLOR: 'color',
} as const

export type SortType = (typeof SORT_BY)[keyof typeof SORT_BY]

const Categories = () => {
  const { categories } = useContext(CategoriesContext)

  const [sortBy, setSortBy] = useState<SortType>(SORT_BY.NAME)
  const [isAscending, setIsAscending] = useState<boolean>(false)

  const comparator = useMemo(
    () => sortObjectByKeyFactory<Category>(sortBy, isAscending),
    [sortBy, isAscending],
  )

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false)

  const [newCategoryId, setNewCategoryId] = useState<IndexableType>()

  const prevCategoriesIdsRef = useRef<IndexableType[]>()
  const newCategoryRef = useRef<HTMLDivElement>(null)

  const prevCategoriesIds = prevCategoriesIdsRef.current

  useEffect(() => {
    if (newCategoryRef.current) {
      newCategoryRef.current.scrollIntoView({ behavior: 'smooth' })

      return () => {
        setNewCategoryId(undefined)
      }
    }
  }, [newCategoryId])

  useEffect(() => {
    if (typeof categories === 'undefined') return

    const categoriesIds = categories.map((category) => category.id)

    if (
      prevCategoriesIds &&
      prevCategoriesIds.length !== categoriesIds.length
    ) {
      const newCategory = categories.find(
        (category) => !prevCategoriesIds.includes(category.id),
      )

      if (newCategory) setNewCategoryId(newCategory.id)
    }

    prevCategoriesIdsRef.current = categoriesIds
  }, [categories, prevCategoriesIds])

  const sortedCategories = categories?.sort(comparator) || []

  const handleSortClick = (newSortType: SortType) => {
    setSortBy(newSortType)
    if (sortBy !== newSortType) return
    setIsAscending((prev) => !prev)
  }

  return (
    <motion.div
      className={classes.categories}
      {...fadeAnimationProps}
    >
      <h1 className={classes.header}>Categories</h1>
      <div className={classes.sortingRow}>
        <span
          className={classes.columnName}
          onClick={() => handleSortClick(SORT_BY.NAME)}
        >
          name
        </span>
        <span className={classes.sortingIcon}>
          <span
            className={cx({
              iconPusher: true,
              isPushed: sortBy === SORT_BY.COLOR,
            })}
          />
          <SortingIcon isAscending={isAscending} />
        </span>
        <span
          className={classes.columnName}
          onClick={() => handleSortClick(SORT_BY.COLOR)}
        >
          color
        </span>
      </div>
      <div className={classes.wrapper}>
        <div
          className={cx({
            container: true,
            noCategories: sortedCategories.length === 0,
          })}
        >
          {sortedCategories.length > 0 ? (
            sortedCategories.map((category) => {
              const isNew = category.id === newCategoryId

              return (
                <CategoryRow
                  key={category.name}
                  {...category}
                  className={cx({
                    newCategory: isNew,
                  })}
                  ref={isNew ? newCategoryRef : undefined}
                />
              )
            })
          ) : (
            <>
              <SmileyXEyes size={48} />
              No Categories
            </>
          )}
        </div>
      </div>
      <div className={classes.createButton}>
        <Button
          variant="primary"
          onClick={() => setIsCreateCategoryModalOpen(true)}
        >
          Create Category
        </Button>
        <CategoryModal
          open={isCreateCategoryModalOpen}
          onClose={() => setIsCreateCategoryModalOpen(false)}
        />
      </div>
    </motion.div>
  )
}

export default Categories
