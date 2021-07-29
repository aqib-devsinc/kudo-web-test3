/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive, getCurrentUrl } from "../../../../_helpers";
import SVG from 'react-inlinesvg';
import { ROLES } from 'constants/roles';
import urls from 'constants/urls';

export function HeaderMenu({ layoutProps }) {
    const { isAdmin } = useSelector(({ auth }) => ({ isAdmin: auth.user?.roles?.includes(ROLES.admin) }));
    const [isAdminView, setIsAdminView] = useState(false);
    const location = useLocation();
    const currentLocation = getCurrentUrl(location);

    useEffect(() => {
        if (isAdmin && [urls.admin, urls.interpreter].includes(currentLocation)) setIsAdminView(true);
    } ,[currentLocation])

    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {
                (!isAdminView && urls.home !== currentLocation) &&
                    <li className={`menu-item menu-item-rel ${getMenuItemActive('/home')}`}>
                        <NavLink className="menu-link" to="/home">
                            <SVG src='/media/svg/icons/Navigation/arrow-back-white.svg' className='mr-2 mt-1' height={14} width={14} />
                            <span className="menu-text">Glossaries</span>
                            {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                        </NavLink>
                    </li>
            }
            {
                isAdminView && (
                    <>
                        <li className={`menu-item menu-item-rel ${getMenuItemActive('/admin/dashboard')}`}>
                            <NavLink className="menu-link" to="/admin/dashboard">
                                <span className="menu-text">Dashboard</span>
                                {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                            </NavLink>
                        </li>
                        <li className={`menu-item menu-item-rel ${getMenuItemActive('/admin/interpreters')}`}>
                            <NavLink className="menu-link" to="/admin/interpreters">
                                <span className="menu-text">Interpreters</span>
                                {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                            </NavLink>
                        </li>
                    </>
                )
            }
        </ul>
    </div>;
}
