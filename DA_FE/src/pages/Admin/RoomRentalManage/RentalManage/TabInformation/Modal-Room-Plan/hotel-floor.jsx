import Room from './room';

function HotelFloor({ theRoomsOfTheFloor, roomPlan, setRoomPlan, roomChoose, setRoomChoose }) {

    //Data
    //End Data

    //Created
    //End Created

    //Gen Data
    //End Gen Data

    //Function
    //End Function

    //Util
    //End Util

    return (
        <div className={`${theRoomsOfTheFloor.listRoom.length === 0 && 'hidden'}`}>
            <div className="w-full rounded-[2px] text-base font-semibold mb-4">
                Tầng {theRoomsOfTheFloor.numberOfFloors}
            </div>
            {theRoomsOfTheFloor.listRoom.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {theRoomsOfTheFloor.listRoom.map((element, index) => {
                        return (
                            <Room
                                key={index}
                                room={element}
                                roomPlan={roomPlan}
                                setRoomPlan={setRoomPlan}
                                roomChoose={roomChoose}
                                setRoomChoose={setRoomChoose}
                            ></Room>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default HotelFloor;
