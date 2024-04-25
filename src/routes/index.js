//*Layout
import HeaderOnly from '~/components/layouts/HeaderOnly/HeaderOnly';
//*Page
import Admin from '~/pages/Admin';
import Home from '~/pages/Home';
import Payment from '~/pages/Payment';
import Account from '~/pages/Account';
import Cart from '~/pages/Cart';
import DetailWithLoading from '~/pages/Detail';
import Order from '~/pages/Order';

//*Public Route
const publicRoute = [
    { path: '/', component: Home },
    { path: '/admin/*', component: Admin, layout: null },
    { path: '/detail/:name', component: DetailWithLoading },
    { path: '/account/*', component: Account, layout: HeaderOnly },
    { path: '/cart/*', component: Payment, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: HeaderOnly },
    { path: '/order', component: Order, layout: HeaderOnly },
    { path: '/category/*', component: Order, layout: HeaderOnly },
];

//*Private Route (redirect Login Page)
const privateRoute = [];

export { publicRoute, privateRoute };
