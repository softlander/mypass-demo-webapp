import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { getCompanyId } from '../utils/helper';
import useStep from '../utils/useStep';
import { Layout, RandomGraphicElement } from '../components';
import selv from '../assets/selvSuccessBordered.svg';
import { useTranslation } from 'react-i18next';

/**
 * Component which will display a Confirmation.
 */
const Confirmation: React.FC = ({ match }: any) => {
    const { nextStep, theme } = useStep(match);
    const [companyId, setCompanyId] = useState('');
    const [title, setTitle] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        async function determineCompanyId () {
            setCompanyId(await getCompanyId());
            const currentStep = localStorage.getItem('currentStep');
            switch (currentStep) {
            case '2':
                setTitle("pages.general.confirmation.titleCollegeDegree");
                break;
            case '3':
                setTitle("pages.general.confirmation.titlePreviousEmployer");
                break;
            case '4':
                setTitle("pages.general.confirmation.titleFinalApplication");
                break;
            default:
                setTitle("pages.general.confirmation.titleJobApplication");
                break;
            }
        }
        determineCompanyId();
    }, [companyId, theme]);

    return (
        <Layout match={match}>
            <RandomGraphicElement elements={5}>
                <div className='confirmation-page'>
                    <div className='selv-wrapper'>
                        <img src={selv} alt='Selv app logo' />
                        <h4>{t('pages.general.confirmation.myPass')}</h4>
                    </div>
                    <h2>{t(title)}</h2>
                    <Link to={nextStep}>
                        <Button className="continueBtn">
                            {t("actions.continue")}
                        </Button>
                    </Link>
                </div>
            </RandomGraphicElement>
        </Layout>
    );
};

export default Confirmation;
