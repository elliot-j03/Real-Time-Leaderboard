// React
import { useNavigate } from "react-router-dom";

function DropDown({ userList, dropDownType }) {
    const navigate = useNavigate();

    function navUser(user) {
        const path = `/user/${user}`;
        navigate(path);
    }

    if (userList.length !== 0) {
        if (dropDownType === "search") {
            return (
                <div>
                    {userList.map((user, idx) => {
                        return (
                            <div key={idx}>
                                <div style={{ paddingLeft: "1rem", border: "1px, solid",
                                    borderColor: "#343434ff", 
                                    borderTopLeftRadius: (idx === 0 ? "10px" : null),
                                    borderTopRightRadius: (idx === 0 ? "10px" : null),
                                    borderBottomLeftRadius: (idx === userList.length - 1 ? "10px" : null),
                                    borderBottomRightRadius: (idx === userList.length - 1 ? "10px" : null),
                                }}>
                                    <button style={{ border: "transparent", backgroundColor: "transparent",
                                        padding: "1rem", outline: "none"
                                    }} onClick={() => navUser(user.item)}>{user.item}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else if (dropDownType === "notif") {
            return (
                <div>
                    {userList.map((user, idx) => {
                        return (
                            <div key={idx}>
                                <div style={{ paddingLeft: "1rem", border: "1px, solid",
                                    borderColor: "#343434ff", 
                                    borderTopLeftRadius: (idx === 0 ? "10px" : null),
                                    borderTopRightRadius: (idx === 0 ? "10px" : null),
                                    borderBottomLeftRadius: (idx === userList.length - 1 ? "10px" : null),
                                    borderBottomRightRadius: (idx === userList.length - 1 ? "10px" : null),
                                }}>
                                    <button style={{ border: "transparent", backgroundColor: "transparent",
                                        padding: "1rem", outline: "none"
                                    }} onClick={() => navUser(user)}>Friend request from {user}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    } else {
        return (
            <>
                <div style={{ paddingLeft: "1rem", border: "1px, solid",
                    borderColor: "#343434ff", borderRadius: "10px"
                }}>
                    {dropDownType === "search" ? <p>No users match your search...</p> : <p>No new notifications</p>}
                </div>
            </>
        )
    }
}

export default DropDown;