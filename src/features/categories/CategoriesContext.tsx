import { IndexableType } from 'dexie'
import {
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
} from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../data/Database'
import { Category } from './Category.interface'

export interface ICategoriesContext {
  categories: Category[]
  selectedCategories: IndexableType[]
  setSelectedCategories: Dispatch<SetStateAction<IndexableType[]>>
}

interface ContextProviderProps {
  children: ReactNode
}

export const CategoriesContext = createContext<ICategoriesContext>({
  categories: [],
  selectedCategories: [],
  setSelectedCategories: () => {},
})

export default function CategoryContextProvider({
  children,
}: ContextProviderProps) {
  const categories = useLiveQuery<Category[]>(() => db.categories.toArray())
  const [selectedCategories, setSelectedCategories] = useState<IndexableType[]>(
    [],
  )

  if (!categories) return null

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        selectedCategories,
        setSelectedCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  )
}
