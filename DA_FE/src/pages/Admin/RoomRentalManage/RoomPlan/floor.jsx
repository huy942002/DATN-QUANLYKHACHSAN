import Room from './room';

function Floor({ theRoomsOfTheFloor, roomPlan, setRoomPlan }) {

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
            <div className="w-full rounded-[2px] text-lg font-semibold mb-3">
                Tầng {theRoomsOfTheFloor.numberOfFloors}
            </div>
            {theRoomsOfTheFloor.listRoom.length > 0 && (
                <div className="grid grid-cols-3">
                    {theRoomsOfTheFloor.listRoom.map((element, index) => {
                        return <Room key={index} room={element} roomPlan={roomPlan} setRoomPlan={setRoomPlan}></Room>;
                    })}
                </div>
            )}
        </div>
    );
}

export default Floor;
