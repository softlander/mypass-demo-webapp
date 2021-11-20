import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components';
import useStep from '../utils/useStep';
import { useTranslation } from 'react-i18next';
import "../styles/pages/apply.scss"

const AppSteps: React.FC = ({ history, match, ...props }: any) => {
    const { nextStep } = useStep(match);
    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                <div>
                    <Link to={nextStep}>
                        <button className="applyJobBtn">
                            {t('actions.applyAtNewCompany')}
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        </Layout>
    );
};

export default AppSteps;
