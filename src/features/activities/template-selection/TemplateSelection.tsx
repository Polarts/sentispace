import FullscreenModal from '@modals/FullscreenModal'
import { ArrowLeft } from '@phosphor-icons/react'
import { IndexableType } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import Button from '../../../components/input/button/Button'
import { db } from '../../../data/Database'
import ActivityItem from '../activity-item/ActivityItem'
import { Activity } from '../Activity.interface'
import classes from './TemplateSelection.module.scss'

interface TemplateSelectionProps {
  open: boolean
  onClose: () => void
}

const TemplateSelection = ({ open, onClose }: TemplateSelectionProps) => {
  const activities =
    useLiveQuery<Activity[]>(() =>
      db.activities.where('isTemplate').equals(1).toArray(),
    ) ?? []

  const [selectedActivity, setSelectedActivity] = useState<IndexableType>(0)

  return (
    <FullscreenModal open={open} className={classes.modal}>
      <FullscreenModal.Header>
        <ArrowLeft size={24} onClick={onClose} />
        <FullscreenModal.Title className={classes.modalTitle}>
          Template Selection
        </FullscreenModal.Title>
      </FullscreenModal.Header>
      <div className={classes.activitiesWrapper}>
        <div className={classes.activitiesContainer}>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id.toString()}
              {...activity}
              isSelected={activity.id === selectedActivity}
              onSelectedActivityChange={setSelectedActivity}
              templateView
              onCloseTemplateModal={onClose}
            />
          ))}
        </div>
      </div>
      <FullscreenModal.ButtonsPanel>
        <Button variant="secondary" onClick={onClose} underline>
          Go Back
        </Button>
      </FullscreenModal.ButtonsPanel>
    </FullscreenModal>
  )
}

export default TemplateSelection
