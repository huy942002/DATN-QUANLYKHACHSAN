import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const KindOfRoomManage = () => {

    const navigate = new useNavigate();
    
    return (
        <>
            <Button
                onClick={
                    () => navigate('/admin/create-kind-of-room')
                }
            >Thêm mới</Button>
        </>
    )
}

export default KindOfRoomManage;