import NoMatch from './components/NoMatch';
import CreateAccount from './containers/admin/CreateAccount';
import Dashboard from './containers/Dashboard';
import ApdApplication from './containers/ApdApplication';
import ApdViewOnly from './containers/viewOnly/Apd';
import EditAccount from './containers/admin/EditAccount';
import MyAccount from './containers/admin/MyAccount';
import Login from './containers/Login';
import Logout from './containers/Logout';

const routes = [
  { path: '/', component: Dashboard, exact: true, isPublic: false },
  { path: '/apd', component: ApdApplication, exact: false, isPublic: false },
  { path: '/print', component: ApdViewOnly, exact: true, isPublic: false },

  {
    path: '/create-account',
    component: CreateAccount,
    isAdmin: true,
    isCard: true
  },
  {
    path: '/edit-account',
    component: EditAccount,
    isAdmin: true,
    isCard: true
  },

  { path: '/me', component: MyAccount, isPublic: false, isCard: true },
  { path: '/login', component: Login, isPublic: true, isCard: true },
  { path: '/logout', component: Logout, isPublic: false },
  { component: NoMatch, isPublic: true }
];

export default routes;
