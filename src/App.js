import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoute } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { userRoles } from './utils/helpers/userRoles';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoute.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    // Kiểm tra xem route có đường dẫn admin không và người dùng có phải là admin không
                    if (route.path.startsWith('/admin') && !userRoles.isAdmin) {
                        return <Route key={index} path={route.path} element={<Navigate to="/" replace />} />;
                    }

                    // Kiểm tra xem route có đường dẫn private không và người dùng có đăng nhập không
                    if (route.path.startsWith('/order') && !userRoles.isLoggedIn) {
                        return (
                            <Route key={index} path={route.path} element={<Navigate to="/account/login" replace />} />
                        );
                    }

                    // Kiểm tra xem route có đường dẫn private không và người dùng có đăng nhập không
                    if (route.path.startsWith('/cart') && !userRoles.isLoggedIn) {
                        return (
                            <Route key={index} path={route.path} element={<Navigate to="/account/login" replace />} />
                        );
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
