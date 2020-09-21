import Form from 'pages/Form/Form';
import Customer from 'pages/Customer/Customer';
// import DashboardPage from 'views/Dashboard/Dashboard.js';
// import UserProfile from 'views/CustomerProfile/Profile';
// import Certificate from './views/Certificate/Certificate';

// @material-ui/icons
import Spa from '@material-ui/icons/Spa';
// import Book from '@material-ui/icons/Book';
import Person from '@material-ui/icons/Person';
// import Dashboard from '@material-ui/icons/Dashboard';

const dashboardRoutes = [
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: '',
  // },
  {
    path: '/customer',
    name: 'Customer',
    icon: Person,
    component: Customer,
    layout: '/admin',
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/customer'
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: '/admin'
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: '/admin'
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: '/admin'
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: '/admin'
  // }
];
const customerRoutes = [
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: '',
  // },
  {
    path: '/form',
    name: 'Form',
    icon: Spa,
    component: Form,
    layout: '/customer',
  },
  // {
  //   path: '/certificate',
  //   name: 'Certificate',
  //   icon: Book,
  //   component: Certificate,
  //   layout: '/customer',
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '',
  // },
];
const systemRoutes = [dashboardRoutes, customerRoutes];

export default systemRoutes;
