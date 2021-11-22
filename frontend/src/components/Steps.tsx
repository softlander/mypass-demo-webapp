import React, { useState, useEffect} from 'react';
import { Steps } from 'rsuite';
import i18n from 'i18next';

const styles = {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top'
};

// https://rsuitejs.com/en/components/sidenav

const StepsInstance = ({ steps, stepId }: {
    steps: any;
    stepId: any;
}) => {
    const [currentStep, setCurrentStep] = useState<Number>();

    useEffect(() => {
        const getCurrentStep = async () => {
            const employmentHistoryStatus = await localStorage.getItem('employmentHistory');
            const jobOfferStatus = await localStorage.getItem('jobOffer');
            const universityStatus = await localStorage.getItem('collegeDegree');

            if(jobOfferStatus && jobOfferStatus === 'completed'){
                setCurrentStep(4)
            }
            else if(employmentHistoryStatus && employmentHistoryStatus === 'completed'){
                setCurrentStep(3)
            }else if(universityStatus && universityStatus === 'completed'){
                setCurrentStep(2)
            }else{
                setCurrentStep(1)
            }
        }

        getCurrentStep();
    }, []);

    return (
        <div className='steps-wrapper'>
            <Steps current={Number(currentStep)} vertical style={styles}>
                {
                    steps.map((step: any) =>
                        <Steps.Item
                            key={step.title}
                            title={i18n.t(step.title)}
                        />
                    )
                }
            </Steps>
        </div>
    );
};

export default StepsInstance;
