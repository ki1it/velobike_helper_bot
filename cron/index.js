const { CronJob } = require('cron');

const {getActualInfo} = require("./getActualInfo");
const {sendInfo} = require("./sendInfo");


const jobs = [
    ['Get actual info', '*/30 * * * * *', getActualInfo],
    ['Send to users', '*/35 * * * * *', sendInfo],
];

function wrapJobHandler(name, handler) {
    return () => {
        console.log(`Job "${name}" started`);

        handler()
            .then(() => {
                console.log(`Job "${name}" finished`);
            })
            .catch((error) => {
                console.error(error, `Job "${name}" failed`);
            });
    };
}

async function initializeJobs() {
    jobs.forEach(([name, schedule, handler]) => {
        const job = new CronJob(schedule, wrapJobHandler(name, handler));

        console.log(`Job "${name}" planned to "${schedule}". Next run at ${job.nextDate()}`);

        job.start();
    });
}


initializeJobs()
    .then(() => console.log('⏰ Cron jobs configured'))
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
