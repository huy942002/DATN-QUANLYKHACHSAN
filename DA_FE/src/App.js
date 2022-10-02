import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { React } from 'react';

import '~/global/global.css';

import { publicRoutes } from '~/routes/routes';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
