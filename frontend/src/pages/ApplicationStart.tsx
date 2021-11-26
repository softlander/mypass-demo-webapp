import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { flattenObject } from '../utils/helper';
import { Layout, PrefilledForm } from '../components';
import { useTranslation } from 'react-i18next';
import useStep from '../utils/useStep';
import "../styles/pages/applicationStart.scss"

const prefilledFields = [
    'FirstName',
    'LastName',
    'Date',
    'Nationality',
    'Birthplace',
    'Country',
    'Phone'
];

const ApplicationData: React.FC = ({ history, match }: any) => {

    const [prefilledData, setPrefilledData] = useState({});

    const { t } = useTranslation();
    const { nextStep } = useStep(match);

    useEffect(() => {
        async function getData() {
            const credentials = localStorage.getItem('credentials')
            const credentialsData = credentials && JSON.parse(credentials)
            const flattenData = flattenObject(credentialsData?.data);
            const address = { Address: `${flattenData.Street} ${flattenData.House}, ${flattenData.City}, ${flattenData.Country}, ${flattenData.Postcode}` };
            const result = prefilledFields.reduce((acc: any, entry: string) =>
                ({ ...acc, [entry]: flattenData[entry] }), {});

            setPrefilledData({ ...result, ...address });

        }
        getData();
    }, []);


    const prefilledFormData: any = { dataFields: prefilledData };

    const onBtnClick = () => {
        const applicationDetails = {
            ApplicationNumber: "0439483",
            CandidateName: "Anurag Lauri",
            CompanyName: "AwesomeTech",
            RoleApplyingFor: "",
            ExpectedCTC: "",
            DateOfApplication: Date.now(),
            ApplicationStatus: "pending"

        };
        localStorage.setItem('applicationDetails', JSON.stringify(applicationDetails))
        localStorage.setItem('currentStep', '1');
    }

    return (
        <Layout match={match}>
            <div className='form-data-page-wrapper'>
                <h2>{t("pages.application.applicationStart.applyAtNewCompany")}</h2>
                <h3 className='section-header'>{t("pages.application.applicationStart.candidateDetails")}</h3>
                <PrefilledForm {...prefilledFormData} />
                <Button htmlType="button" href={nextStep} className="startApplicationBtn" onClick={onBtnClick}>{t("pages.application.applicationStart.continueButton")}</Button>
            </div>
        </Layout>
    );
};

export default ApplicationData;
