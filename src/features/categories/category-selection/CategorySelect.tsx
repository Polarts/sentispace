import classes from './CategorySelect.module.scss';
import { IconKeyType } from '@assets/icons';
import { CaretRight, Hash } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { IndexableType } from 'dexie';
import { useContext, useState } from 'react';
import { CategoriesContext } from '../CategoriesContext';
import CategoryBadge from './category-badge/CategoryBadge';
import CategorySelectionModal from './CategorySelectionModal';

const cx = classNames.bind(classes);

interface SelectProps {
  label: string;
  placeholder: string;
  iconKey?: IconKeyType;
  categoryIds: IndexableType[];
  onCategoriesChange: (categories: IndexableType[]) => void;
   readOnly?: boolean;
}

const CategorySelect = ({
  label,
  placeholder,
  categoryIds,
  onCategoriesChange: setSelectedCategories,
  readOnly,
}: SelectProps) => {
  const { categories } = useContext(CategoriesContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectToggle = () => {
    setIsOpen((prev) => !prev);
  };

const handleCategorySelection = (categoryId: IndexableType, operation: 'add' | 'remove') => {
  if (readOnly && operation === 'remove') return;

  switch (operation) {
    case 'add':
      setSelectedCategories([...categoryIds, categoryId]);
      break;
    case 'remove':
      setSelectedCategories(categoryIds.filter((id) => id !== categoryId));
      break;
  }
};

  return (
    <>
   <div className={classes.categorySelect}>
  <span className={classes.label}>{label}</span>
  <div
    tabIndex={0}
    className={cx({ select: true, isOpen })}
    onClick={handleSelectToggle}
  >
    <div className={classes.selectIcon}>
      <Hash />
    </div>
    <div className={classes.selectedCategoriesWrapper}>
      {categoryIds.length === 0 ? (
        <span className={classes.placeholder}>{placeholder}</span>
      ) : (
        <div className={classes.flexContainer}>
          {categories
            ?.filter(({ id }) => categoryIds.includes(id))
            .map((cat) => (
              <div className={classes.flexContainerItem} key={cat.id.toString()}>
               <CategoryBadge
  {...cat}
  onClick={!readOnly ? () => handleCategorySelection(cat.id, 'remove') : undefined}
/>
              </div>
            ))}
        </div>
      )}
    </div>
    <div className={classes.toggleSelect}>
      <CaretRight />
    </div>
  </div>

  {isOpen && (
    <CategorySelectionModal
      onClose={handleSelectToggle}
      categoryIds={categoryIds}
      onCategoriesChange={setSelectedCategories}
    />
  )}
</div>
      {isOpen && (
        <CategorySelectionModal
          onClose={handleSelectToggle}
          categoryIds={categoryIds}
          onCategoriesChange={setSelectedCategories}
        />
      )}
    </>
  );
};

export default CategorySelect;
