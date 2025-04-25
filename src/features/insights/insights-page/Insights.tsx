import classes from './Insights.module.scss'
import DistributionChart from '../distribution-chart/DistributionChart'
import InsightsContextProvider from '../../../data/contexts/InsightsContext'
import OverviewStats from '../overview-stats/OverviewStats'
import { motion } from 'framer-motion'
import { fadeAnimationProps } from '@/utils/constants/motion-animations'

const Insights = () => {
  return (
    <motion.div 
      className={classes.insights}
      {...fadeAnimationProps}
    >
      <h1 className={classes.header}>Insights</h1>
      <InsightsContextProvider>
        <div className={classes.content}>
          <OverviewStats />
          <DistributionChart />
        </div>
      </InsightsContextProvider>
    </motion.div>
  )
}

export default Insights
