import { Plus } from '@phosphor-icons/react'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ActivityEditForm from '../../activities/activity-form/ActivityEditForm'
import Button from '../../../components/input/button/Button'
import TemplateSelection from '../../activities/template-selection/TemplateSelection'
import { Paths } from '../Paths.enum'
import classes from './NavBar.module.scss'
import NavItem from './NavItem'

const cx = classNames.bind(classes)

const NavBar = () => {
  const [isPopup, setIsPopup] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState<boolean>(false)
  const [isTemplateSelectionModalOpen, setIsTemplateSelectionModalOpen] =
    useState<boolean>(false)

  const { pathname } = useLocation()

  const handleCreateActivity = (): void => {
    setIsActivityModalOpen(true)
    setIsPopup(false)
  }

  const handleCreateActivityFromTemplate = (): void => {
    setIsTemplateSelectionModalOpen(true)
    setIsPopup(false)
  }

  useEffect(() => {
    setIsPopup((prev) => (prev ? false : prev))
  }, [pathname])

  return (
    <nav className={classes.navBar}>
      <div className={cx(classes.createButtonsWrapper, { open: isPopup })}>
        <div className={classes.createButtonsContainer}>
          <Button variant="primary" onClick={handleCreateActivity}>
            Create Activity
          </Button>
          <ActivityEditForm
            open={isActivityModalOpen}
            onClose={() => setIsActivityModalOpen(false)}
          />
          <Button
            variant="secondary"
            onClick={handleCreateActivityFromTemplate}
          >
            Create from Template
          </Button>
          <TemplateSelection
            open={isTemplateSelectionModalOpen}
            onClose={() => setIsTemplateSelectionModalOpen(false)}
          />
        </div>
      </div>
      <div className={classes.navButtons}>
        <NavItem label="Home" iconKey="HouseSimple" path={Paths.HOME} />
        <NavItem
          label="Categories"
          iconKey="SquaresFour"
          path={Paths.CATEGORIES}
        />
        <div>
          <Plus
            className={cx(classes.addButton, { active: isPopup })}
            onClick={() => setIsPopup((prev) => !prev)}
          />
        </div>
        <NavItem label="Insights" iconKey="Sunglasses" path={Paths.INSIGHTS} />
        <NavItem label="Settings" iconKey="GearSix" path={Paths.SETTINGS} />
      </div>
    </nav>
  )
}

export default NavBar
