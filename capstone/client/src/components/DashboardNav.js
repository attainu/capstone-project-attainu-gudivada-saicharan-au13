import {Link} from 'react-router-dom'


const DashboardNav = () => {
    const active=window.location.pathname;
    // console.log(active);
    return (
        <ul>
            <li className="nav-item">
                <Link  className={`nav-link ${active ==="/dashboard/seller  " && 'active'}`} 
                
                 to="/dashboard/seller">
                Your Hotels</Link>
            </li>
        </ul>
    );
};

export default DashboardNav;