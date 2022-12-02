import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './admin-layout.css';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {

    const [collapsed, setCollapsed] = useState(true);
    const navigate = new useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo bg-white h-8 m-4 min" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            // icon: <UserOutlined />,
                            label: 'Sơ đồ phòng',
                            onClick: () => navigate("/admin/room-plan"),
                        },
                        {
                            key: '2',
                            // icon: <VideoCameraOutlined />,
                            label: 'Quản lý tầng',
                            // onClick: () => navigate("/"),
                        },
                        {
                            key: '3',
                            // icon: <UploadOutlined />,
                            label: 'Quản lý phòng',
                            onClick: () => setCollapsed(!collapsed),
                        },
                        {
                            key: '4',
                            // icon: <UploadOutlined />,
                            label: 'Quản lý nhân viên',
                            onClick: () => navigate("/admin/personnel-manage"),
                        },
                        {
                            key: '5',
                            // icon: <UploadOutlined />,
                            label: 'Quản lý khách hàng',
                            onClick: () => navigate("/admin/customer-manage"),
                        },
                        {
                            key: '6',
                            // icon: <UploadOutlined />,
                            label: 'Quản lý dịch vụ',
                            onClick: () => navigate("/admin/service-manage"),
                        },
                        {
                            key: '7',
                            // icon: <UploadOutlined />,
                            label: 'Giao ca',
                            onClick: () => navigate("/admin/hand-over"),
                        },
                        {
                            key: '8',
                            // icon: <UploadOutlined />,
                            label: 'Lịch sử giao ca',
                            onClick: () => navigate("/admin/hand-over-manage"),
                        },
                        {
                            key: '9',
                            // icon: <UploadOutlined />,
                            label: 'Lịch sử',
                            onClick: () => navigate("/admin/history"),
                        },
                        {
                            key: '10',
                            // icon: <UploadOutlined />,
                            label: 'Hóa đơn',
                            onClick: () => setCollapsed(!collapsed),
                        },
                        {
                            key: '11',
                            // icon: <UploadOutlined />,
                            label: 'Thống kê',
                            onClick: () => setCollapsed(!collapsed),
                        },
                        {
                            key: '12',
                            // icon: <UploadOutlined />,
                            label: 'Đăng xuất',
                            onClick: () => setCollapsed(!collapsed),
                        },
                    ]}
                ></Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {collapsed && (
                        <MenuUnfoldOutlined
                            className="trigger text-lg m-4"
                            onClick={() => {
                                setCollapsed(!collapsed);
                            }}
                        ></MenuUnfoldOutlined>
                    )}
                    {!collapsed && (
                        <MenuFoldOutlined
                            className="trigger text-lg m-4"
                            onClick={() => {
                                setCollapsed(!collapsed);
                            }}
                        ></MenuFoldOutlined>
                    )}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                    {/* <FloatButton.BackTop /> */}
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
