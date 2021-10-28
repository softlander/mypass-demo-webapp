import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import useStep from '../utils/useStep';
import useFetch from '../utils/useFetch';
import { Layout, Table, NextStepDrawer } from '../components';
import { serverAPI } from '../config.json';
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
