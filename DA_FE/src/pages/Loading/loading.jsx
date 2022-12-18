import { Spin } from "antd";

const Loading = () => {


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-design-charcoalblack opacity-70 backdrop-blur-sm z-50">
            <Spin tip="Vui lòng chờ trong giây lát!" size="large"></Spin>
        </div>
    )
}

export default Loading;