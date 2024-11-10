import classes from './CategoryBadge.module.scss'; 
import { XCircle } from '@phosphor-icons/react';
import classNames from 'classnames/bind';
import { MouseEvent, TouchEvent, useState } from 'react';
import CategoryModal from '../../category-edit-modal/CategoryModal';
import { Category } from '@categories/Category.interface';

const cx = classNames.bind(classes);

export interface CategoryBadgeProps extends Category {
  onClick?: () => void;
  onDelete?: () => void; 
  deletable?: boolean;
}

const CategoryBadge = ({
  id,
  name,
  color,
  onClick,
  onDelete,
  deletable,
}: CategoryBadgeProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOnClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();

    if (!deletable) {
      onClick && onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(); 
    }
  };

  return (
    <>
      <div className={classes.categoryBadgeContainer}>
        <div
          onClick={handleOnClick}
          className={cx({
            categoryBadge: true,
            [`categoryColor${color}`]: color,
          })}
        >
          <span className={classes.badgeText}>{name}</span>
        </div>
        {deletable && (
          <div className={classes.deleteIconContainer}>
            <XCircle
              className={classes.deleteIcon}
              weight="fill"
              size={44}
              onClick={handleDeleteClick}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <CategoryModal
          onClose={() => setIsModalOpen(false)}
          category={{ id, name, color }}
        />
      )}
    </>
  );
};

export default CategoryBadge;
