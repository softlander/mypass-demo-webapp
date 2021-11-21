import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import useStep from '../utils/useStep';
import { useTranslation } from 'react-i18next';
import "../styles/pages/apply.scss"
import mypass_logo from '../assets/mypass_logo.svg';

const AppSteps: React.FC = ({ history, match, ...props }: any) => {
    const { nextStep } = useStep(match);
    const { t } = useTranslation();
    const [steptext, setStepText] = useState('');
    const [btnText, setBtnText] = useState('');

    useEffect(() => {
        async function getInfo() {
            const collegeDegreeStatus = await localStorage.getItem('collegeDegree');
            const employmentHistoryStatus = await localStorage.getItem('employmentHistory');

            if (collegeDegreeStatus && collegeDegreeStatus === 'completed') {
                if (employmentHistoryStatus && employmentHistoryStatus === 'completed') {
                    setStepText('general.jobOfferText');
                    setBtnText('actions.loginToJobPortal');
                } else {
                    setStepText('general.employmentText');
                    setBtnText('actions.loginToPreviousEmployerPortal');
                }
            } else {
                setStepText('general.universityText');
                setBtnText('actions.loginToUniversityPortal');
            }
        }

        getInfo();
    }, [])

    return (
        <Layout match={match}>
            <React.Fragment>
                <div>
                    <Link to={nextStep}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={mypass_logo} alt="myPass logo" className="logo_mypass" />
                            <h3 className="stepText">{t(steptext)}</h3>
                            <button className="stepBtn">
                                {t(btnText)}
                            </button>
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        </Layout>
    );
};

export default AppSteps;
