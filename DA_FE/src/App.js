import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminVer2/admin-layout';

import authoService from '~/services/authoServices';

import '~/global/global.css';

import { privateRoutes, publicRoutes } from '~/routes/routes';
import LoginAdmin from './pages/Admin/LoginAdmin';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = AdminLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    authoService.username ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <LoginAdmin />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
