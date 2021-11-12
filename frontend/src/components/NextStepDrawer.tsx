import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default ({ link }: { link: string }) => {
    const [nextStep, setNextStep] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        async function setInfo() {
            const highestDegree = localStorage.getItem('highestDegreeStatus');
            const previousEmployer = localStorage.getItem('previousEmployerStatus');
            const applicationStatus = localStorage.getItem('applicationStatus')
            
            if(previousEmployer && previousEmployer && applicationStatus){
                setNextStep('completed');
            }else if (previousEmployer && previousEmployer) {
                setNextStep('jobApplication');
            } else if (highestDegree && highestDegree === 'completed') {
                setNextStep('previousEmployer');
            }else{
                setNextStep('collegeDegree')
            }
            
        }
        setInfo();
    }, []);

    if (!link) {
        return <React.Fragment />;
    }

    switch (nextStep) {
        case 'completed':
            return(
                <div className='next-step-drawer completed'>
                    <h3>{t('components.nextStepDrawer.applicationReady')}</h3>
                    <p>
                        {t('components.nextStepDrawer.clickBelowToSubmit')}
                    </p>
                    <Link to={link}>
                        <Button className="nextStepBtn">
                            {t('components.nextStepDrawer.sendApplication')}
                        </Button>
                    </Link>
                </div>
            );
        case 'jobApplication':
            return (
                <div className='next-step-drawer completed'>
                    <h3>{t('components.nextStepDrawer.applicationNotComplete')}</h3>
                    <p>
                        {t('components.nextStepDrawer.oneStepAway')}
                    </p>
                    <Link to={link}>
                        <Button className="nextStepBtn">
                            {t('components.nextStepDrawer.addJobApplicationDetails')}
                        </Button>
                    </Link>
                </div>
            );
        case 'previousEmployer':
            return (
                <div className='next-step-drawer'>
                    <h3>{t('components.nextStepDrawer.applicationNotComplete')}</h3>
                    <p>
                        {t('components.nextStepDrawer.needPreviousEmployer')}
                    </p>
                    <Link to={link}>
                        <Button className="nextStepBtn">
                            {t('components.nextStepDrawer.addPreviousEmployer')}
                        </Button>
                    </Link>
                </div>
            );
        case 'collegeDegree':
            return (
                <div className='next-step-drawer'>
                    <h3>{t('components.nextStepDrawer.applicationNotComplete')}</h3>
                    <p>
                        {t('components.nextStepDrawer.needCollegeAndEmployer')}
                    </p>
                    <Link to={link}>
                        <Button className="nextStepBtn">
                           {t('components.nextStepDrawer.addCollegeDegree')}
                        </Button>
                    </Link>
                </div>
            );
        default:
            return <React.Fragment />;
    }
};
