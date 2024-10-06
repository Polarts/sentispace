import Button from '@input/button/Button';
import TextField from '@input/text-field/TextField';
import FullscreenModal from '@modals/FullscreenModal';
import { ArrowLeft } from '@phosphor-icons/react';
import { IndexableType } from 'dexie';
import { useContext, useMemo, useState } from 'react';
import { CategoriesContext, ICategoriesContext } from '../CategoriesContext';
import CategoryModal from '../category-edit-modal/CategoryModal';
import CategoryBadge from './category-badge/CategoryBadge';
import CategoryItem from './CategoryItem';
import { CategorySelectionFunction } from './CategorySelect';
import classes from './CategorySelect.module.scss';

type CategorySelectionModalProps = {
  onClose: () => void;
  categoryIds: IndexableType[];
  onCategoriesChange: (categories: IndexableType[]) => void;
};

const CategorySelectionModal = ({
  onClose,
  categoryIds,
  onCategoriesChange,
}: CategorySelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { categories } = useContext<ICategoriesContext>(CategoriesContext);

  const filteredCategories = useMemo(
    () =>
      categories?.filter((c) =>
        c.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase() ?? '')
      ),
    [searchQuery, categories]
  );

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsNewCategoryModalOpen(true);
  };

  const handleCategorySelection: CategorySelectionFunction = (categoryId, operation) => {
    switch (operation) {
      case 'add':
        onCategoriesChange([...categoryIds, categoryId]);
        break;
      case 'remove':
        onCategoriesChange(categoryIds.filter((id) => id !== categoryId));
        break;
    }
  };

  return (
    <FullscreenModal>
      <FullscreenModal.Header>
        <ArrowLeft size={24} onClick={onClose} />
        <div className={classes.headerContainer}>
          <FullscreenModal.Title className={classes.modalTitle}>Labels</FullscreenModal.Title>
          <Button onClick={handleOnClick} className={classes.saveButton}>
            Save
          </Button>

          {isNewCategoryModalOpen && (
            <CategoryModal onClose={() => setIsNewCategoryModalOpen(false)} />
          )}
        </div>
      </FullscreenModal.Header>

      <div className={classes.modalContent}>
        <div className={classes.border}>
          <TextField
            placeholder="Search"
            iconKey={'MagnifyingGlass'}
            value={searchQuery}
            size={32}
            onChange={(event) => setSearchQuery(event.target.value)}
            className={`${classes.textFieldOverride} ${classes.textFieldWhite}`}
          />
        </div>
        
        <div className={classes.selectionList}>
        <div className={classes.border}>

          {/* Selected Category Badges Section */}
          <div className={classes.categoryBadges}>
            <div className={classes.fixedLabel}>Selected</div>
            {categories
              ?.filter(({ id }) => categoryIds.includes(id))
              .map((cat) => (
                <CategoryBadge
                  {...cat}
                  onClick={() => handleCategorySelection(cat.id, 'remove')}
                  onDelete={() => handleCategorySelection(cat.id, 'remove')}
                  deletable
                  key={cat.id.toString()}
                />
              ))}
                </div>
          </div>
          <div className={classes.border}>
            {/* Selectable Categories Section */}
            {filteredCategories
              ?.filter(({ id }) => !categoryIds.includes(id))
              .map(({ id, name, color }) => (
                <CategoryItem
                  name={name}
                  color={color}
                  id={id}
                  key={id.toString()}
                  onChange={handleCategorySelection}
                />
              ))}
          </div>
        </div>
      </div>
      {/* <FullscreenModal.ButtonsPanel className={classes.buttons}>
        <Button variant="secondary" onClick={onClose} underline>
          Go Back
        </Button>
      </FullscreenModal.ButtonsPanel> */}
    </FullscreenModal>
  );
};

export default CategorySelectionModal;
