import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Paid from './BookingByStatus/paid';
import UnPaid from "./BookingByStatus/unpaid";

function ManageBooking() {
    return (
        <>
            <div className="text-lg font-semibold">Quản lý Booking</div>
            <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="Đã thanh toán" key="1" className="text-base">
                        <Paid></Paid>
                    </TabPane>
                    <TabPane tab="Chưa thanh toán" key="2" className="text-base">
                        <UnPaid></UnPaid>
                    </TabPane>
                    <TabPane tab="Đã hủy" key="3" className="text-base"></TabPane>
            </Tabs>
        </>
    );
}

export default ManageBooking;