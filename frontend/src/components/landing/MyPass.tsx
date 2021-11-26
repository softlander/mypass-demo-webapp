import React from 'react';
import logo from '../../assets/mypass.svg';
import { Translation, Trans } from 'react-i18next';


//TODO: https://react.i18next.com/latest/trans-component ->Alternative usage (v11.6.0)
export default () => (
    <Translation>
        {
            (t) =>
                <div className='mypass-section'>
                    <img data-aos='fade-up' data-aos-duration='1000' src={logo} alt='myPass logo' className="logo" />
                    <p data-aos='fade-up' data-aos-duration='1000'>
                        <Trans i18nKey="landing.mypass.mypassText">
                            Your data shouldn’t be public, but it shouldn’t be locked up either.<br />We promise a solution that <strong>enables data flow</strong>, completely in your <strong>control</strong>.
                        </Trans>
                    </p>
                </div>
        }
    </Translation>
);
