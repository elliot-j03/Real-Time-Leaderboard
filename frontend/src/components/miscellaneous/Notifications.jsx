// React
import { useEffect, useState } from "react";
// Firebase
import { auth } from "../../config/firebase"
// Components
import DropDown from "./DropDown";


function Notif({ userData, reqData }) {
    const [notifs, setNotifs] = useState(0);
    const [showNotifs, setShowNotifs] = useState(false);
    const [userList, setUserList] = useState([]);

    // Set notification number and userList
    useEffect(() => {
        if (reqData?.incoming) {
            const ids = Object.keys(reqData?.incoming)
            const len = ids.length;
            setNotifs(len);

            const users = [];
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] in userData) {
                    users.push(userData[ids[i]].username);
                }
            }
            setUserList(users);
        }

    }, [reqData]);

    function toggleNotifs() {
        if (showNotifs === false) {
            setShowNotifs(true);
        } else {
            setShowNotifs(false);
        }
    }

    return (
        <div style={{ position: "relative"}}>
            {auth?.currentUser ? 
            <button onClick={toggleNotifs} className="icon-button" width="10" data-count={notifs}>
                <img src="/src/assets/notification_bell.png" alt="profile_pic" />
            </button> : null}
            {showNotifs ? 
            <div style={{ position: "absolute", top: "45px", left: "25%", transform: "translateX(-50%)",
                    backgroundColor: "#131313ff", minWidth: "300px", borderRadius: "10px",
                    border: "1px, solid", borderColor: "#343434ff", zIndex: "999"}}>
                <DropDown userList={userList} dropDownType={"notif"}/>
            </div>
            : null}
        </div>
    )
}

export default Notif;