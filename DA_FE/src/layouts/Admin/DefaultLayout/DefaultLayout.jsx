import Header from '~/layouts/Admin/Header/Header';
import SidebarAdmin from '~/layouts/Admin/Sidebar/SidebarAdmin';

function DefaultLayout({ children }) {
    return (
        <div className="grid grid-cols-6 h-screen">
            <div className="col-start-1 bg-white shadow shadow-slate-600">
                <SidebarAdmin />
            </div>
            <div className="col-start-2 col-end-7 text-white">
                {/* Header */}
                <Header />
                {/* Content layout */}
                <div>{children}</div>
                <div className="bg-slate-600 p-2 mt-8 text-center">Copyright©2022 by PolyTel</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
