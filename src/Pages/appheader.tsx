import React, { useState, useEffect,memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './showproductlist.scss';

const Appheader = () => {
    const [displayEmail, displayEmailupdate] = useState<string>('');
    const [showmenu, showmenuupdateupdate] = useState<boolean>(false);
    const [UserList, setUserList] = useState<string>("");
    const [NavigateProductList, setNavigateProductList] = useState<JSX.Element | null>(null);
    const [role, setRole] = useState<string | null>("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {       
        if (location.pathname === '/' || location.pathname === '/signup') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let id = localStorage.getItem('id');
            const role = localStorage.getItem('role')
            setRole(role);
            if (id === '' || id === null) {
                navigate('/');     //developers admin , project superadmin , user specific task handle user 
            } else {
                displayEmailupdate(id);
            }

            if (location.pathname === '/user-list') {
                setUserList("User Management");
                setNavigateProductList(<Link to={'/showproductlist'} className="ml-2 text-primary">Product-list</Link>);
            } else {
                setUserList("Product Management");
                setNavigateProductList(null); 
            } 
        }
    }, [location, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('password');
        localStorage.removeItem('role');  
    };

    return (
        <>
            <div>
                {showmenu &&
                    <div className="header d-flex justify-content-between  p-3">
                        <h6>{UserList ? UserList : 'Product Management'}<br />
                            &nbsp; &nbsp;
                            {role === 'admin' || role === 'superadmin' ? NavigateProductList : ''}
                        </h6>
                        <div className="appheader-management">
                            <span className="span " >{role?<span>{displayEmail}</span>:''}</span>  &nbsp; &nbsp;

                            <Link to={'/'} className="ml-2 text-primary logout" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                }
            </div>

        </>
    );
}

export default memo(Appheader);
