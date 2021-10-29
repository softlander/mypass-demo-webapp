import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { Layout } from '../components';
import { useTranslation } from 'react-i18next';

/**
 * Component which will display a IncorporatedCompanies.
 */
const IncorporatedCompanies: React.FC = ({ history, match, ...props }: any) => {

    const { t } = useTranslation();

    return (
        <Layout match={match}>
            <React.Fragment>
                    <div>
                        <Link to="/demo/download">
                            <Button style={{marginTop: '17rem', color: 'black', backgroundColor: 'darkblue', height: '15%'}}>
                                Apply at AwesomeTech
                            </Button>
                        </Link>
                    </div>
            </React.Fragment>
        </Layout>
    );
};

export default IncorporatedCompanies;
