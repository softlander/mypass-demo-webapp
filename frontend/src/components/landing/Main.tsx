import React from 'react';
import { RandomGraphicElement } from '../';
import main from '../../assets/landing/main.png';
import googlePlay from '../../assets/googlePlay.svg';
import dots from '../../assets/backgrounds/dots.png';
import ellipse from '../../assets/backgrounds/ellipse1.svg';
import { Translation } from 'react-i18next';
import Config from "../../config";

export default () => {
    return (
        <Translation>
            { //need translation tag so that suspense-promise-resolve reaches this component 
                (t) =>
                    <RandomGraphicElement elements={5}>
                        <div className='heading-section'>
                            <div className='desktop'>
                                <div className='content-wrapper'>
                                    <div className='content'>
                                        <Content />
                                        <Buttons />
                                    </div>
                                </div>
                                <div className='image-wrapper'>
                                    <img src={main} alt='Portrait' className='portrait' />
                                </div>
                                <img src={dots} alt='' className='dots' />
                                <img src={ellipse} alt='' className='ellipse' />
                            </div>
                            <div className='mobile'>
                                <div className='content'>
                                    <Content />
                                </div>
                                <img src={main} alt='Portrait' className='portrait' />
                                <Buttons />
                            </div>
                        </div>
                    </RandomGraphicElement>
            }
        </Translation>
    );
};

const Content = () => (
    <Translation>
        {
            (t) =>
                <>
                    <h1>{t("landing.main.claimControl")} <br />{t("landing.main.reuseYourNew")}</h1>
                    <p>{t("landing.main.mainText")}</p>
                </>
        }
    </Translation>
);

const Buttons = () => (
    <div className=''>
        <a
            href='https://testflight.apple.com/'
            target='_blank'
            rel='noopener noreferrer'
        >
        </a>
        <a
            href={Config.app_link_android_playstore}
            target='_blank'
            rel='noopener noreferrer'
        >
            <img src={googlePlay} alt='Google Play Market' />
        </a>
    </div>
);
