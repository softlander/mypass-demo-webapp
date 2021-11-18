import React from 'react';
import university from '../assets/universityCrone.svg'
import previousEmployer from '../assets/previousEmployer.svg'
import newEmployer from '../assets/newEmployer.svg'

const Footer = ({ children, theme }: {
    children?: JSX.Element | null | undefined;
    theme: string | undefined;
}) => {
    return (
        <div className='footer-wrapper' id='footer'>
            {children}
            <div className='logo'>
                {theme === 'university' && <img src={university} alt='University Logo' />}
                {theme === 'previousEmployer' && <img src={previousEmployer} alt='Previous Employer Logo' />}
                {theme === 'newEmployer' && <img src={newEmployer} alt='New Employer Logo' />}
            </div>
        </div>
    );
};

export default Footer;
