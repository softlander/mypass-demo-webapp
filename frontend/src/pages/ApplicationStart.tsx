import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { flattenObject } from '../utils/helper';
import { Layout, Loading, Form, PrefilledForm, WebSocket } from '../components';
import { useTranslation } from 'react-i18next';
import useStep from '../utils/useStep';

const prefilledFields = [
    'FirstName',
    'LastName',
    'Date',
    'Nationality',
    'Birthplace',
    'Country',
    'Phone'
];

/**
 * Component which will display a ApplicationData.
 */
const ApplicationData: React.FC = ({ history, match }: any) => {
    const [webSocket, setWebSocket] = useState(false);
    const [fields, setFields] = useState<object>();
    const [prefilledData, setPrefilledData] = useState({});

    const { t } = useTranslation();
    const { nextStep } = useStep(match);

    useEffect(() => {
        async function getData() {
            const credentials = {
                "status": 2,
                "message": "Credentials successfully verified",
                "type": "success",
                "data": {
                    "UserAddress": {
                        "City": "Mikkeli",
                        "Country": "Finland",
                        "House": "Hatanpään Valtatie",
                        "Postcode": "73447",
                        "State": "Ostrobothnia",
                        "Street": "4996"
                    },
                    "UserPersonalData": {
                        "Birthplace": "Mikkeli",
                        "IdentityCardNumber": "I4033VG3",
                        "Nationality": "Finland",
                        "PassportNumber": "E8UG3A",
                        "UserDOB": {
                            "Date": "Thu Sep 15 1955"
                        },
                        "UserName": {
                            "FirstName": "Anurag ",
                            "LastName": "Lauri"
                        }
                    },
                    "UserContacts": {
                        "Email": "ellen.lauri@example.com",
                        "Phone": "04-522-300"
                    }
                }
            }

            const applicationDetails = {
                    ApplicationNumber: "0439483",
                    CandidateName: "Anurag Lauri",
                    CompanyName: "AwesomeTech",
                    RoleApplyingFor: "",
                    ExpectedCTC: "",
                    DateOfApplication: Date.now(),
                    ApplicationStatus: "pending"
                
            };
            await localStorage.setItem('applicationDetails', JSON.stringify(applicationDetails))
            await localStorage.setItem('credentials', JSON.stringify(credentials));
            const flattenData = flattenObject(credentials?.data);
            const address = { Address: `${flattenData.Street} ${flattenData.House}, ${flattenData.City}, ${flattenData.Country}, ${flattenData.Postcode}` };
            const result = prefilledFields.reduce((acc: any, entry: string) =>
                ({ ...acc, [entry]: flattenData[entry] }), {});

            setPrefilledData({ ...result, ...address });
            
        }
        getData();
    }, []);

    async function processValues(fields: object) {
        setFields(fields);
        setWebSocket(true);
    }

    const prefilledFormData: any = { dataFields: prefilledData };

    return (
        <Layout match={match}>
            <div className='company-data-page-wrapper'>
                <h2>{t("pages.application.applicationStart.applyAtAwesomeTech")}</h2>
                <h3 className='section-header'>{t("pages.application.applicationStart.candidateDetails")}</h3>
                <PrefilledForm {...prefilledFormData} />
                <Button htmlType="button" href={nextStep} style={{marginTop: '10%', backgroundColor: 'darkblue', height: '35px', color: 'white'}} >{t("pages.application.applicationStart.continueButton")}</Button>
            </div>
        </Layout>
    );
};

export default ApplicationData;
