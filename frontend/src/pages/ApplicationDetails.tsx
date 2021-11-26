import React from 'react';
import useStep from '../utils/useStep';
import { Layout, NextStepDrawer } from '../components';
import { useTranslation } from 'react-i18next';

interface ApplicationData {
    'ApplicationNumber': string;
    'CandidateName': string;
    'CompanyName': string;
    'RoleApplyingFor': string;
    'ExpectedCTC': string;
    'DateOfApplication': string;
    'ApplicationStatus': string;
}

const res = localStorage.getItem('applicationDetails');
const details = res && JSON.parse(res);

const ApplicationData: React.FC = ({ match }: any) => {
    const { nextStep } = useStep(match);
    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                <div className='company-details-wrapper'>
                    <React.Fragment>
                        <h2>{details.CompanyName}</h2>
                        <p className='company-number-wrapper'>
                            {t("pages.general.applicationDetails.applicationNumber")} <span className='company-number'>{details.ApplicationNumber}</span>
                        </p>
                        <div className='company-details'>
                            <ApplicationDetails />
                        </div>
                    </React.Fragment>
                </div>
                <NextStepDrawer link={nextStep} />
            </React.Fragment>
        </Layout>
    );
};

const ApplicationDetails = () => {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.candidateName")}</p>
                <p className='bold'>{details?.CandidateName}</p>
            </div>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.companyName")}</p>
                <p className='bold'>{details?.CompanyName}</p>
            </div>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.roleApplyingFor")}</p>
                <p className='bold'>{details?.RoleApplyingFor}</p>
            </div>

            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.expectedCTC")}</p>
                <p className='bold'>{details?.ExpectedCTC}</p>
            </div>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.dateOfApplication")}</p>
                <p className='bold'>{details?.DateOfApplication}</p>
            </div>

            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.applicationStatus")}</p>
                <p className={`status ${details?.ApplicationStatus.toLowerCase()}`}>{t("general." + details?.ApplicationStatus.toLocaleLowerCase())}</p>
            </div>
        </React.Fragment>
    );
};

export default ApplicationData;
