import {
    Landing,
    IntroShowTodos,
    IntroShowMobile,
    IntroDemoSelection,
    AppDownloadQR,
    ProveIdentity,
    SingInConfirmation,
    ApplicationStart,
    ApplicationDetails,
    Confirmation,
    CollegeData,
    InsuranceData,
    Apply,
    GreatSuccess,
    ThankYou
} from './pages';

export const routes = [
    { path: '/', page: Landing },
    { path: '/demo/select', page: IntroDemoSelection },
    { path: '/demo/todos', page: IntroShowTodos },
    { path: '/demo/app', page: IntroShowMobile },
    { path: '/application/apply/0', page: Apply },
    { path: '/demo/app/0', page: AppDownloadQR },
    { path: '/application/prove/0', page: ProveIdentity },
    { path: '/application/signin/0', page: SingInConfirmation },
    { path: '/application/data/0', page: ApplicationStart },
    { path: '/application/confirm/1', page: Confirmation },
    { path: '/demo/success/1', page: GreatSuccess },
    { path: '/application/details/1/:applicationId', page: ApplicationDetails },
    { path: '/college/prove/1', page: ProveIdentity },
    { path: '/college/data/1', page: CollegeData },
    { path: '/college/confirm/2', page: Confirmation },
    { path: '/application/details/2/:applicationId', page: ApplicationDetails },
    { path: '/employer/prove/2', page: ProveIdentity },
    { path: '/employer/data/2', page: InsuranceData },
    { path: '/employer/confirm/3', page: Confirmation },
    { path: '/application/details/3/:applicationId', page: ApplicationDetails },
    { path: '/demo/thankyou', page: ThankYou }
];

//These are now just the keys for the translation that get dynamically loaded
export const mainSteps = [
    { title: "Start your Application" },
    { title: "Add your College Degree" },
    { title: "Add your First Employer Details"},
    { title: "Ready to Apply"},
];