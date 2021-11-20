import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import useStep from '../utils/useStep';
import { useTranslation } from 'react-i18next';
import "../styles/pages/apply.scss"
import mypass_logo from '../assets/mypass_logo.svg';

const AppSteps: React.FC = ({ history, match, ...props }: any) => {
    const { nextStep } = useStep(match);
    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                <div>
                    <Link to={nextStep}>
                        <div style={{ textAlign: 'center' }}>
                            <img src={mypass_logo} alt="myPass logo" className="logo_myass" />
                            <h3 className="universityText">{t('general.universityText')}</h3>
                            <button className="universityBtn">
                                {t('actions.loginToUniversityPortal')}
                            </button>
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        </Layout>
    );
};

export default AppSteps;
