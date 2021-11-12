import React from 'react';
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

    const { t } = useTranslation();

    function handleSubmit(e: any) {
        e.preventDefault();
        validateFields((err: any, values: any) => {
            if (!err) {
                const highestDegree = localStorage.getItem('highestDegree');
                const previousEmployer = localStorage.getItem('previousEmployer');

                if(highestDegree && previousEmployer){
                    const applicationDetails = localStorage.getItem('applicationDetails');
                    const applicationDetailsData = applicationDetails && JSON.parse(applicationDetails);
                    applicationDetailsData.ExpectedCTC = values.ExpectedCTC;
                    applicationDetailsData.RoleApplyingFor = values.RoleApplyingFor;
                    applicationDetailsData.ApplicationStatus = 'active'
                    localStorage.setItem('applicationStatus', "completed");
                    localStorage.setItem('applicationDetails', JSON.stringify(applicationDetailsData));
                    window.location.href = nextStep;
                }else if(highestDegree){
                    localStorage.setItem('previousEmployer', JSON.stringify(values));
                    localStorage.setItem('previousEmployerStatus', "completed");
                    window.location.href = nextStep;
                }else{
                    localStorage.setItem('highestDegree', JSON.stringify(values));
                    localStorage.setItem('highestDegreeStatus', "completed");
                    window.location.href = nextStep;
                }
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
                        <Form.Item label={t(labels[field])} key={field}>
                            { getFieldDecorator(field, {
                                rules: [{ required: true, message: t("components.form.error") }]
                            })(<Input />)}
                        </Form.Item>
                    ))
                }
                <Form.Item>
                    <Button
                        htmlType='submit'
                        style={{backgroundColor: 'darkblue', height: '30%'}}
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
