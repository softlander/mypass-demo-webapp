import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import useStep from '../utils/useStep';
import { useTranslation } from 'react-i18next';
import "../styles/pages/apply.scss"
import logo from '../assets/mypass_logo.svg';

const AppSteps: React.FC = ({ history, match, ...props }: any) => {
    const { nextStep } = useStep(match);
    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                <div>
                    <Link to={nextStep}>
                        <div style={{textAlign: 'center'}}>
                            <img src={logo} alt="myPass logo" className="logo_selv"/>
                            <h3 className="universityText">{t('general.universityText')}</h3>
                            <button className="universityBtn">
                                {t('actions.goToUniversityPage')}
                            </button>
                        </div>
                    </Link>
                </div>
            </React.Fragment>
        </Layout>
    );
};

export default AppSteps;
