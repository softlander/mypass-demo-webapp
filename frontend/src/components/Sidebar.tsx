import React from 'react';
import { Sidenav } from 'rsuite';
import { Link } from 'react-router-dom';
import logo from '../assets/mypass.svg';
import frame from '../assets/backgrounds/circleFrame5.svg';
import DropSelector from '../components/DropSelector';
import { useTranslation } from 'react-i18next';

// https://rsuitejs.com/en/components/sidenav

const SidebarInstance = ({ children }: {
    children?: JSX.Element | null | undefined;
}) => {
    const { t } = useTranslation();

    return (
        <div className='sidebar-wrapper'>
            <Link to='/app/intro'>
                <img src={logo} alt='myPass logo' className='sidebar-logo' />
            </Link>
            <div className="sidebar-drop-selector">
                <DropSelector />
            </div>

            <Sidenav activeKey='0'>
                <Sidenav.Body>
                    <h2 className='todo-list'>
                        {t("components.sideBar.yourTodoList")}
                    </h2>
                    {children}
                </Sidenav.Body>
            </Sidenav>
            <img src={frame} alt='' className='frame' />
        </div>
    );
};

export default SidebarInstance;
