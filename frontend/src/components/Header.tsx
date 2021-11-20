import React from 'react';
import university from '../assets/university.svg'
import previousEmployer from '../assets/previousEmployer.svg'
import newEmployer from '../assets/newEmployer.svg'

const Header = ({ children, theme }: {
    children?: JSX.Element | null | undefined;
    theme: string | undefined;
}) => {
    return (
        <div className='header-wrapper'>
            <div className='logo'>
                {/* {theme === 'university' && <img src={university} alt='University Logo' />} */}
                {theme === 'university' && <h3 style={{color: 'white'}}>Delhi University</h3>}
                {theme === 'previousEmployer' && <img src={previousEmployer} alt='Previous Employer Logo' />}
                {theme === 'newEmployer' && <img src={newEmployer} alt='New Employer Logo' />}
            </div>
            {children}
        </div>
    );
};

export default Header;
