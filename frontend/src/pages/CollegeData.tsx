import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { flattenObject } from '../utils/helper';
import { Layout, PrefilledForm, WebSocket, Form } from '../components';
import { useTranslation } from 'react-i18next';
import useStep from '../utils/useStep';

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
];

const labels = {
    CollegeName: 'College Name', 
    RegistrationNumber: 'Registration Number',
};

const CollegeData: React.FC = ({ history, match }: any) => {
    const [webSocket, setWebSocket] = useState(false);
    const [fields, setFields] = useState<object>();
    const [status, setStatus] = useState('');
    const [prefilledPersonalData, setPrefilledPersonalData] = useState({});
    const { nextStep } = useStep(match);

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

    const prefilledPersonalFormData: any = { dataFields: prefilledPersonalData };
    const emptyFormData: any = { dataFields: emptyFields, labels, processValues, status, messages, nextStep: nextStep};

    return (
        <Layout match={match}>
            <div className='company-data-page-wrapper'>
                <h3 className='section-header'>{t('pages.college.candidateDetails')}</h3>
                <PrefilledForm {...prefilledPersonalFormData} />

                <h3 className='section-header'>{t('pages.college.degreeDetails')}</h3>
                <Form {...emptyFormData} />
            </div>
        </Layout>
    );
};

export default CollegeData;
