import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import { flattenObject } from '../utils/helper';
import { Layout, PrefilledForm, WebSocket, Form, Loading } from '../components';
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
    'CompanyName',
    'Designation',
    'JobID',
    'ExpectedCTC',
    'StartDate',
];

const labels = {
    CompanyName: 'Company Name',
    Designation: 'Designation',
    JobID: 'Job ID',
    ExpectedCTC: 'Expected CTC',
    StartDate: 'Start Date'
};

const JobApplicationData: React.FC = ({ history, match }: any) => {
    const [webSocket, setWebSocket] = useState(false);
    const [fields, setFields] = useState<object>();
    const [status, setStatus] = useState('');
    const [prefilledPersonalData, setPrefilledPersonalData] = useState({});
    const [prefilledCollegeData, setPrefilledCollegeData] = useState({});
    const [prefilledEmployerData, setPrefilledEmployerData] = useState({});
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

            
            const collegeDegreeString: string | null = await localStorage.getItem('collegeDegreeDetails');
            const collegeDegree = collegeDegreeString && await JSON.parse(collegeDegreeString);
            const flattenCollegeDetails = flattenObject(collegeDegree?.data);

            setPrefilledCollegeData(flattenCollegeDetails);

            const employerString: string | null = await localStorage.getItem('employmentHistoryDetails');
            const employerData = employerString && await JSON.parse(employerString);
            const flattenEmployerData = flattenObject(employerData?.data);

            setPrefilledEmployerData(flattenEmployerData);

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

    const prefilledPersonalFormData: any = { dataFields: prefilledPersonalData };
    const prefilledCollegeFormData: any = { dataFields: prefilledCollegeData };
    const prefilledEmployerFormData: any = { dataFields: prefilledEmployerData };
    const emptyFormData: any = { dataFields: emptyFields, labels, processValues, status, messages, nextStep: nextStep};

    return (
        <Layout match={match}>
            <div className='company-data-page-wrapper'>
                <h2>{t('pages.employerData.previousEmployerWebsite')}</h2>
                <h3 className='section-header'>{t('pages.employerData.candidateDetails')}</h3>
                <PrefilledForm {...prefilledPersonalFormData} />

                <h3 className='section-header'>{t('pages.employerData.highestDegreeDetails')}</h3>
                <PrefilledForm {...prefilledCollegeFormData} />

                <h3 className='section-header'>{t('pages.employerData.employmentHistory')}</h3>
                <PrefilledForm {...prefilledEmployerFormData} />

                <h3 className='section-header'>{t('pages.employerData.employerDetails')}</h3>
                <Form {...emptyFormData} />
                {
                    status && (
                        <div className='loading'>
                            <p className='bold'>{t(status)}</p>
                            {
                                status === messages.waiting && <Loading />
                            }
                        </div>
                    )
                }
                {
                    webSocket && <WebSocket
                        history={history}
                        match={match}
                        schemaName='JobOffer'
                        setStatus={setStatusMessage}
                        fields={fields}
                        messages={messages}
                    />
                }
            </div>
        </Layout>
    );
};

export default JobApplicationData;

