import {
    Landing,
    Intro,
    IntroShowTodos,
    IntroShowMobile,
    AppDownloadQR,
    ProveIdentity,
    AppSteps,
    Confirmation,
    CollegeData,
    EmploymentHistoryData,
    GreatSuccess,
    ThankYou,
    JobApplicationData
} from './pages';

export const routes = [
    { path: '/:lng?', page: Landing },
    { path: '/:lng?/app/intro', page: Intro },
    { path: '/:lng?/app/todos', page: IntroShowTodos },
    { path: '/:lng?/app/mobile', page: IntroShowMobile },
    { path: '/:lng?/app/download', page: AppDownloadQR },
    { path: '/:lng?/app/success', page: GreatSuccess },
    { path: '/:lng?/app/step/0/', page: AppSteps },
    { path: '/:lng?/university/prove/0', page: ProveIdentity },
    { path: '/:lng?/university/data/0', page: CollegeData },
    { path: '/:lng?/university/confirm/0', page: Confirmation },
    { path: '/:lng?/app/step/1/', page: AppSteps },
    { path: '/:lng?/prev-employer/prove/1', page: ProveIdentity },
    { path: '/:lng?/prev-employer/data/1', page: EmploymentHistoryData },
    { path: '/:lng?/prev-employer/confirm/1', page: Confirmation },
    { path: '/:lng?/app/step/2/', page: AppSteps },
    { path: '/:lng?/job/prove/2', page: ProveIdentity },
    { path: '/:lng?/job/data/2', page: JobApplicationData },
    { path: '/:lng?/job/confirm/2', page: Confirmation },
    { path: '/:lng?/app/thankyou', page: ThankYou }
];

//These are now just the keys for the translation that get dynamically loaded
export const mainSteps = [
    { title: "actions.startJobApp" },
    { title: "actions.getCollegeDegree" },
    { title: "actions.getPastEmploymentDetails" },
    { title: "actions.readyForJobApp" },
];
