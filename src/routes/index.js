//*Layout
import HeaderOnly from '~/components/layouts/HeaderOnly/HeaderOnly';
//*Page
import Admin from '~/pages/Admin';
import Detail from '~/pages/Detail';
import Home from '~/pages/Home';
import Payment from '~/pages/Payment';
import Account from '~/pages/Account';
import Cart from '~/pages/Cart';
//* Admin
// import ProductAdmin from '~/pages/Admin/components/Content/ProductsAdmin/ProductsAdmin';
// import AccountAdmin from '~/pages/Admin/components/Content/AccountAdmin';
// import CategoryAdmin from '~/pages/Admin/components/Content/CategoryAdmin';
// import ManufacturerAdmin from '~/pages/Admin/components/Content/ManufacturerAdmin';
// import DashboardAdmin from '~/pages/Admin/components/Content/DashboardAdmin';

//*Public Route
const publicRoute = [
    { path: '/', component: Home },
    { path: '/admin/*', component: Admin, layout: null },
    { path: '/detail', component: Detail },
    { path: '/cart/payment', component: Payment, layout: HeaderOnly },
    { path: '/account/*', component: Account, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: HeaderOnly },
];

//*Private Route (redirect Login Page)
const privateRoute = [];

export { publicRoute, privateRoute };
