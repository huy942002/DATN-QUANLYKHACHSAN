import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Paid from './BookingByStatus/paid';

function ManageBooking() {
    return (
        <>
            <div className="text-lg font-semibold">Quản lý Booking</div>
            <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Đã thanh toán" key="1" className="text-base">
                        <Paid></Paid>
                    </TabPane>
                    <TabPane tab="Chưa thanh toán" key="2" className="grid grid-cols-12 gap-12 text-base"></TabPane>
                    <TabPane tab="Đã hủy" key="3" className="grid grid-cols-12 gap-12 text-base"></TabPane>
            </Tabs>
        </>
    );
}

export default ManageBooking;