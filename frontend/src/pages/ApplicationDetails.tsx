import React from 'react';
import { Link } from 'react-router-dom';
import useStep from '../utils/useStep';
import useFetch from '../utils/useFetch';
import { Layout, Loading, NextStepDrawer } from '../components';
import back from '../assets/back.svg';
import { serverAPI } from '../config.json';
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

/**
 * Component which will display a ApplicationData.
 */
const ApplicationData: React.FC = ({ match }: any) => {
    const companyId = match?.params?.companyId;
    const { nextStep } = useStep(match);
    const { response, loading } = useFetch(`${serverAPI}/company?company=${companyId}`);

    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                <div className='company-details-wrapper'>
                    {
                        loading ? <Loading /> : (
                            <React.Fragment>
                                <Link
                                    to={{
                                        pathname: `${match.url.replace(companyId, '').replace('details', 'list')}`,
                                        state: { nextStep }
                                    }}
                                    className='company-details-back bold'
                                >
                                    <img src={back} alt='' />&nbsp;&nbsp;&nbsp;{t("actions.back")} 
                                </Link>
                                <h2>{response?.data?.CompanyName}</h2>
                                <p className='company-number-wrapper'>
                                    {t("pages.general.applicationDetails.applicationNumber")} <span className='company-number'>{response?.data?.ApplicationNumber}</span>
                                </p>
                                <div className='company-details'>
                                    <ApplicationDetails details={response?.data} />
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
                <NextStepDrawer link={nextStep} />
            </React.Fragment>
        </Layout>
    );
};

const ApplicationDetails = ({ details }: { details: ApplicationData | undefined }) => {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.candidateName")}</p>
                <p className='bold'>{details?.CandidateName}</p>
            </div>
            <div className='company-details-item'>
                <p>{t("pages.general.applicationDetails.companyName")}</p>
                <p className='bold'>AwesomeTech</p>
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
