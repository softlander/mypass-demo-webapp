import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import icon from '../assets/selv.svg';
import { useTranslation } from 'react-i18next';

const shortFields: string[] = ['Date', 'Nationality'];

const Icon = () => <img src={icon} alt='' width={18} />;

const PrefilledForm = ({ form, dataFields }: {
    form: any;
    dataFields: any;
}) => {
    useEffect(() => {
        form.setFieldsValue(dataFields);
    }, []);
    
    const { t } = useTranslation();
    
    return (
        <div className='prefilled-form'>
            <Form layout='vertical'>
                {
                    Object.keys(dataFields).map((field: string) => (
                        <Form.Item
                            label={t("components.prefilledForm."+field)}
                            key={field}
                            className={shortFields.includes(field) ? 'short-field' : ''}
                        >
                            <Input disabled suffix={<Icon />} value={dataFields[field]}/>
                        </Form.Item>
                    ))
                }
            </Form>
            <p className='notice bold small'>{t("components.prefilledForm.credentialsByMyPassID")}</p>
        </div>
    );
};

const WrappedPrefilledForm = Form.create()(PrefilledForm);

export default WrappedPrefilledForm;
