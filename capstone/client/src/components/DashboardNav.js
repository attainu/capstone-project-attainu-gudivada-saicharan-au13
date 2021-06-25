import {Link} from 'react-router-dom'


const DashboardNav = () => {
    const active=window.location.pathname;
    // console.log(active);
    return (
        <ul className="list-unstyled text-center">
            <li className="nav-item">
                <div className="d-inline-block">To view your hotels </div>
                &nbsp; &nbsp;
                <Link  className={`btn btn-primary ${active ==="/dashboard/seller  " && 'active'}`} 
                
                 to="/dashboard/seller">
                click here</Link>
            </li>
        </ul>
    );
};

export default DashboardNav;