import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const EmptyForm = ({ form, dataFields, labels, processValues, status, messages, nextStep }: {
    form: any;
    dataFields: string[];
    labels: { [key: string]: string; };
    processValues: (values: object) => void;
    status: string;
    messages: { [key: string]: string; };
    nextStep: any;
}) => {
    const { getFieldDecorator, getFieldsError, validateFields } = form;
    const [jobOfferForm, setJobOfferForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>();
    const { t } = useTranslation();

    useEffect(() => {
        const checkJobOffer = () => {
            const jobOfferStatus = localStorage.getItem('jobOffer');

            if(jobOfferStatus && jobOfferStatus === "pending"){
                setJobOfferForm(true);
                const selectedJobString = localStorage.getItem('selectedJob');
                const selectedJobData = selectedJobString && JSON.parse(selectedJobString);
                setSelectedJob(selectedJobData);
            }
        }

        checkJobOffer();
    }, [])

    function handleSubmit(e: any) {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                const universityStatus = localStorage.getItem('collegeDegree')
                const employmentHistoryStatus = localStorage.getItem('employmentHistory');
                
                if(universityStatus && universityStatus === "pending"){
                    values['Program'] = "BTech";
                    values['Branch'] = "Computer Science";
                    values['EnrollingYear'] = "2014";
                    values['GraduationYear'] = "2018";
                }else if(employmentHistoryStatus && employmentHistoryStatus === "pending"){
                    values['CompanyAddress'] = "327 Timber Oak Drive, Amherst, TX, Texas";
                    values['LastDesignation'] = "Software Engineer 1";
                    values['StartDate'] = "21st October 2018";
                    values['EndDate'] = "16st December 2020";
                }else{
                    values['CompanyName'] = selectedJob['CompanyName'];
                    values['Designation'] = selectedJob['Designation'];
                    values['CompanyAddress'] = "3206 Buck Drive, Roy, UT, Utah";
                    delete values['JobID'];
                }
                
                processValues(values)
            }
        });
    }

    function hasErrors(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    return (
        <div className='empty-form'>
            <Form layout='vertical' onSubmit={handleSubmit}>
                {
                    dataFields.map((field: string) => (
                        <Form.Item label={t(labels[field])} key={field} >
                            {
                            jobOfferForm? 
                                selectedJob[field]? 
                                <Input placeholder={selectedJob[field]} value={selectedJob[field]} disabled/>
                                :
                                getFieldDecorator(field, {
                                    rules: [{ required: true, message: t("components.form.error") }]
                                })(<Input />)
                            :
                            getFieldDecorator(field, {
                                rules: [{ required: true, message: t("components.form.error") }]
                            })(<Input/>)
                            }
                        </Form.Item>
                    ))
                }
                <Form.Item>
                    <Button
                        htmlType='submit'
                        style={{ backgroundColor: '#EA4335', height: '30%' }}
                        disabled={hasErrors(getFieldsError()) || status === messages.waiting}
                    >
                        {t('components.form.submit')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedForm = Form.create({ name: 'form' })(EmptyForm);

export default WrappedForm;
