import {
    Landing,
    IntroShowTodos,
    IntroShowMobile,
    IntroDemoSelection,
    AppDownloadQR,
    ProveIdentity,
    ApplicationStart,
    ApplicationDetails,
    Confirmation,
    CollegeData,
    EmployerData,
    Apply,
    GreatSuccess,
    ThankYou,
    JobApplicationData
} from './pages';

export const routes = [
    { path: '/:lng?', page: Landing },
    { path: '/:lng?/demo/select', page: IntroDemoSelection },
    { path: '/:lng?/demo/todos', page: IntroShowTodos },
    { path: '/:lng?/demo/app', page: IntroShowMobile },
    { path: '/:lng?/application/apply/0', page: Apply },
    { path: '/:lng?/demo/app/0', page: AppDownloadQR },
    { path: '/:lng?/application/prove/0', page: ProveIdentity },
    { path: '/:lng?/application/data/0', page: ApplicationStart },
    { path: '/:lng?/application/confirm/1', page: Confirmation },
    { path: '/:lng?/demo/success/1', page: GreatSuccess },
    { path: '/:lng?/application/details/1/', page: ApplicationDetails },
    { path: '/:lng?/college/prove/1', page: ProveIdentity },
    { path: '/:lng?/college/data/1', page: CollegeData },
    { path: '/:lng?/college/confirm/2', page: Confirmation },
    { path: '/:lng?/application/details/2/', page: ApplicationDetails },
    { path: '/:lng?/employer/prove/2', page: ProveIdentity },
    { path: '/:lng?/employer/data/2', page: EmployerData },
    { path: '/:lng?/employer/confirm/3', page: Confirmation },
    { path: '/:lng?/application/details/3/', page: ApplicationDetails },
    { path: '/:lng?/job/prove/3', page: ProveIdentity },
    { path: '/:lng?/job/data/3', page: JobApplicationData },
    { path: '/:lng?/job/confirm/4', page: Confirmation },
    { path: '/:lng?/application/details/4/', page: ApplicationDetails },
    { path: '/:lng?/demo/thankyou', page: ThankYou }
];

//These are now just the keys for the translation that get dynamically loaded
export const mainSteps = [
    { title: "actions.startJobApp" },
    { title: "actions.provideCollegeDegree" },
    { title: "actions.addEmploymentDetails" },
    { title: "actions.readyForJobApp" },
];
