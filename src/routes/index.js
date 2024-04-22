//*Layout
import HeaderOnly from '~/components/layouts/HeaderOnly/HeaderOnly';
//*Page
import Admin from '~/pages/Admin';
import Home from '~/pages/Home';
import Payment from '~/pages/Payment';
import Account from '~/pages/Account';
import Cart from '~/pages/Cart';
import DetailWithLoading from '~/pages/Detail';

//*Public Route
const publicRoute = [
    { path: '/', component: Home },
    { path: '/admin/*', component: Admin, layout: null },
    { path: '/detail/:name', component: DetailWithLoading },
    { path: '/cart/*', component: Payment, layout: HeaderOnly },
    { path: '/account/*', component: Account, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: HeaderOnly },
];

//*Private Route (redirect Login Page)
const privateRoute = [];

export { publicRoute, privateRoute };
