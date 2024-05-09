import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';
import { publicRoute } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { userRoles } from './utils/helpers/userRoles';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDYDMSs8z5KKFIG8-EO1aJdEe_RxfIAhD4',
    authDomain: 'cellphonex-1.firebaseapp.com',
    projectId: 'cellphonex-1',
    storageBucket: 'cellphonex-1.appspot.com',
    messagingSenderId: '624709578202',
    appId: '1:624709578202:web:66557b22548d3621e3e4e3',
    measurementId: 'G-4MHR7SMWFE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
