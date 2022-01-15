import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useStep from '../utils/useStep';
import { Layout, Table, NextStepDrawer } from '../components';
import { useTranslation } from 'react-i18next';

/**
 * Component which will display a JobListings.
 */
const JobListings: React.FC = ({ history, match, ...props }: any) => {
    const { nextStep } = useStep(match);
    const response = [
        {
            CompanyName: "AwesomeTech",
            Designation: "Project Manager",
            JobID: "882744"
        },
        {
            CompanyName: "CoolSoft",
            Designation: "Engineering Lead",
            JobID: "387823"
        },
        {
            CompanyName: "Amazing HRs",
            Designation: "Chief Financial Officer",
            JobID: "987874"
        }
    ]

    const { t } = useTranslation();

    function onRowClick(data: any) {
        const selectedJob = {
            CompanyName: data.CompanyName,
            Designation: data.Designation,
            JobID: data.JobID
        };

        localStorage.setItem('selectedJob', JSON.stringify(selectedJob));
        window.location.href = nextStep;
    }
    const drawer = props?.location?.state?.nextStep ? 'drawer' : '';

    return (
        <Layout match={match}>
            <React.Fragment>
                <div className={`companies-page-wrapper ${drawer}`}>
                    <div className='companies-cta-wrapper'>
                        <h2>{t("pages.application.jobListings.jobListings")}</h2>
                        {
                            props?.location?.state?.nextStep ? (
                                <Link to={props?.location?.state?.nextStep}>
                                    <Button>
                                        {t("actions.continueNextStep")}
                                    </Button>
                                </Link>
                            ) : (
                                <Link to={nextStep}>
                                    <Button>
                                        {t("actions.registerNewCompany")}
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                    <Table
                        data={response}
                        onRowClick={onRowClick}
                    />
                </div>
                <NextStepDrawer link={props?.location?.state?.nextStep} />
            </React.Fragment>
        </Layout>
    );
};

export default JobListings;

