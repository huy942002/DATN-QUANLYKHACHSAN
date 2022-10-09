import Header from '~/layouts/Admin/Header/Header';
import Sidebar from '~/layouts/Admin/Sidebar/Sidebar';

import 'tippy.js/dist/tippy.css';

function DefaultLayout({ children }) {
    return (
        <div className="grid grid-cols-6 h-screen">
            <div className="col-start-1 bg-white shadow shadow-slate-600">
                <Sidebar />
            </div>
            <div className="col-start-2 col-end-7 text-white">
                {/* Header */}
                <Header />
                {/* Content layout */}
                <div>{children}</div>
                <div className="bg-slate-600 p-2 bottom-0 absolute w-5/6 text-center">Copyright©2022 by PolyTel</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
