import { PlusCircle, X } from '@phosphor-icons/react';
import { Category } from '../Category.interface';
import CategoryBadge from './category-badge/CategoryBadge';
import { CategorySelectionFunction } from './CategorySelect';
import classes from './CategorySelect.module.scss';

interface CategoryItemProps extends Category {
  onChange: CategorySelectionFunction;
  isSelected?: boolean;
}

const CategoryItem = ({
  name,
  color,
  id,
  onChange,
  isSelected,
}: CategoryItemProps) => (
  <div className={classes.selectItem} key={id.toString()} tabIndex={0}>
    <div className={classes.selectItemContent}>
      <CategoryBadge id={id} name={name} color={color} />
    </div>
    <div className={classes.sideButton}> 
      {isSelected ? (
        <X onClick={() => onChange(id, 'remove')} />
      ) : (
        <div className={classes.plusButton}>
          <div className={classes.circle}>
            <PlusCircle 
            onClick={() => onChange(id, 'add')} />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CategoryItem;
