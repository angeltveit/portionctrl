import calculateDailyXp from './calculate-daily-xp.js'
import { CronJob } from 'cron'


var job = new CronJob('0 * * * *', calculateDailyXp, null, true, 'Europe/Oslo');


job.start();
