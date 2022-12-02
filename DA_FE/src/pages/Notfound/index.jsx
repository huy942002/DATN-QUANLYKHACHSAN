import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = new useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang bạn truy cập không tồn tại!"
            extra={
                <Button
                    onClick={() => {
                        navigate('/admin');
                    }}
                    type="primary"
                >
                    Trở về trang chủ
                </Button>
            }
        />
    );
}

export default Home;
