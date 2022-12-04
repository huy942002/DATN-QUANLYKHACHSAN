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
            <div className="w-full rounded-[2px] text-base font-semibold mb-4">
                Tầng {theRoomsOfTheFloor.numberOfFloors}
            </div>
            {theRoomsOfTheFloor.listRoom.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {theRoomsOfTheFloor.listRoom.map((element, index) => {
                        return <Room key={index} room={element} roomPlan={roomPlan} setRoomPlan={setRoomPlan}></Room>;
                    })}
                </div>
            )}
        </div>
    );
}

export default Floor;
