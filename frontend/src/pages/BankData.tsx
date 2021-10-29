import React, { useState, useEffect } from 'react';
import { Button, Collapse, notification } from 'antd';
import { flattenObject } from '../utils/helper';
import { Layout, Loading, AccountType, PrefilledForm, Checkbox, WebSocket, Form } from '../components';
import { useTranslation } from 'react-i18next';

const personalDataFields = [
    'FirstName',
    'LastName',
    'Date',
    'Nationality',
    'Birthplace',
    'Country',
    'Phone'
];

const messages = {
    waiting: 'general.messages.waiting',
    connectionError: 'general.messages.connectionError',
    missing: 'general.messages.missing',
    verifying: 'general.messages.verifying'
};

const notify = (type: string, message: string, description: string) => {
    return type === 'error'
        ? notification.error({ message, description })
        : notification.warning({ message, description });
};

const emptyFields = [
    'CollegeName',
    'RegistrationNumber',
    'ProgramEnrolled',
    'EnrollingYear',
    'GradutionYear',
    'Branch'
];

const labels = {
    CollegeName: 'College Name', 
    RegistrationNumber: 'Registration Number',
    ProgramEnrolled: 'Program Enrolled',
    EnrollingYear: 'Enrolling Year',
    GradutionYear: 'Graduation Year',
    Branch: 'Branch'
};

/**
 * Component which will display a BankData.
 */
const BankData: React.FC = ({ history, match }: any) => {
    const [webSocket, setWebSocket] = useState(false);
    const [fields, setFields] = useState<object>();
    const [accountType, setAccountType] = useState();
    const [status, setStatus] = useState('');
    const [accountStep, setAccountStep] = useState(1);
    const [prefilledPersonalData, setPrefilledPersonalData] = useState({});

    const { t } = useTranslation();

    useEffect(() => {
        async function getData() {
            const credentialsString: string | null = await localStorage.getItem('credentials');
            const credentials = credentialsString && await JSON.parse(credentialsString);
            const status = credentials?.status;
            if (!status || Number(status) !== 2) {
                notify('error', 'Error', t(messages.connectionError));
                history.goBack();
            }
            const flattenData = flattenObject(credentials?.data);
            const address = { Address: `${flattenData.Street} ${flattenData.House}, ${flattenData.City}, ${flattenData.Country}, ${flattenData.Postcode}` };
            const personalData = personalDataFields.reduce((acc: any, entry: string) =>
                ({ ...acc, [entry]: flattenData[entry] }), {});
            setPrefilledPersonalData({ ...personalData, ...address });
        }
        getData();
    }, []);

    async function processValues(fields: object) {
        setFields(fields);
        setWebSocket(true);
    }

    function setStatusMessage(message: string) {
        setStatus(message);
    }

    async function continueNextStep(params: any) {
        if (accountStep < 4) {
            setAccountStep((accountStep: number) => accountStep + 1);
            if (params.accountType) {
                setAccountType(params.accountType);
            }
        } else {
            const fields = {
                AccountType: accountType,
                BankName: 'SNS Bank'
            };
            await processValues(fields);
        }
    }

    function onChange(step: any) {
        accountStep > step && setAccountStep(Number(step));
    }

    const prefilledPersonalFormData: any = { dataFields: prefilledPersonalData };
    const emptyFormData: any = { dataFields: emptyFields, labels, processValues, status, messages };

    return (
        <Layout match={match}>
            <div className='company-data-page-wrapper'>
                <h2>Delhi University Official Website</h2>
                <h3 className='section-header'>Candidate Details</h3>
                <PrefilledForm {...prefilledPersonalFormData} />


                <h3 className='section-header'>Degree Details</h3>
                {console.log(emptyFormData)}
                <Form {...emptyFormData} />
            </div>
            
        </Layout>
    );
};

export default BankData;
