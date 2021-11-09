import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default ({ link }: { link: string }) => {
    const [nextStep, setNextStep] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        async function setInfo() {
            const highestDegree = await localStorage.getItem('highestDegreeStatus');
            const previousEmployer = await localStorage.getItem('previousEmployerStatus');
            // const insurance = await localStorage.getItem('insurance');
            if (previousEmployer && previousEmployer === 'completed') {
                setNextStep('jobApplication');
            } else if (highestDegree && highestDegree === 'completed') {
                setNextStep('previousEmployer');
            }else{
                setNextStep('collegeDegree')
            }
            
        }
        setInfo();
    }, []);

    switch (nextStep) {
        case 'jobApplication':
            return (
                <div className='next-step-drawer completed'>
                    <h3>Your Application is Not Ready Yet</h3>
                    <p>
                        Just One Step Away! Enter Your Job Application Details!
                    </p>
                    <Link to={link}>
                        <Button>
                            Add Your Application Details
                        </Button>
                    </Link>
                </div>
            );
        case 'previousEmployer':
            return (
                <div className='next-step-drawer'>
                    <h3>Your Application is Not Ready Yet</h3>
                    <p>
                        {/* {t("components.nextStepDrawer.needLiabilityInsurance")} */}
                        You need to add your Previous Employer Details to finish this application process.
                    </p>
                    <Link to={link}>
                        <Button>
                            Add Previous Employer
                        </Button>
                    </Link>
                </div>
            );
        case 'collegeDegree':
            return (
                <div className='next-step-drawer'>
                    <h3>Your Application is Not Ready Yet</h3>
                    <p>
                        You need to add your College Degree and First Employer Details to finish this application process.
                    </p>
                    <Link to={link}>
                        <Button style={{backgroundColor: '#f17105', height: '30%'}}>
                            Add College Degree
                        </Button>
                    </Link>
                </div>
            );
        default:
            return <React.Fragment />;
    }
};
