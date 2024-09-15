import CurrentVersion from '../items/current-version/CurrentVersion'
import InstallApp from '../items/install-app/InstallApp'
import DeleteData from '../items/user-data/delete-data/DeleteData'
import ExportData from '../items/user-data/export-data/ExportData'
import ImportData from '../items/user-data/import-data/ImportData'
import TimeMode   from '../items/time-mode/TimeMode';
import SettingsItem from '../settings-item/SettingsItem'
import classes from './Settings.module.scss'

const Settings = () => (
  <div className={classes.container}>
    <h1 className={classes.header}>Settings</h1>
    <div className={classes.options}>
      <CurrentVersion />
      <SettingsItem
        iconKey="Bug"
        label="Bug report"
        to="https://github.com/Polarts/sentispace/issues/new"
      />
       <TimeMode />
      <InstallApp />
      <ImportData />
      <ExportData />
      <DeleteData />
    </div>
  </div>
)

export default Settings
