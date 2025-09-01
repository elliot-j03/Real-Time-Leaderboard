// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth } from "../../config/firebase";
// Fuse
import Fuse from "fuse.js";
// Images
import searchMG from "../../assets/search_mg.png";


const searchBarWidth = "400px";

function getUserNames(users) {
    const userNames = []
    for (let i = 0; i < Object.keys(users).length; i++) {
        userNames.push(Object.entries(users)[i][1].username);
    }
    return userNames;
}


function DropDown({ searchResult }) {
    const navigate = useNavigate();

    function navUser(user) {
        const path = `/user/${user}`;
        navigate(path);
    }

    if (searchResult.length !== 0) {
        return (
            <div>
                {searchResult.map((result, idx) => {
                    return (
                        <div key={idx}>
                            <div style={{ paddingLeft: "1rem", border: "1px, solid",
                                borderColor: "#343434ff", 
                                borderTopLeftRadius: (idx === 0 ? "10px" : null),
                                borderTopRightRadius: (idx === 0 ? "10px" : null),
                                borderBottomLeftRadius: (idx === searchResult.length - 1 ? "10px" : null),
                                borderBottomRightRadius: (idx === searchResult.length - 1 ? "10px" : null),
                            }}>
                                <button style={{ border: "transparent", backgroundColor: "transparent",
                                    padding: "1rem", outline: "none"
                                }} onClick={() => navUser(result.item)}>{result.item}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <>
                <div style={{ paddingLeft: "1rem", border: "1px, solid",
                    borderColor: "#343434ff", borderRadius: "10px"
                }}>
                    <p>No users match your search...</p>
                </div>
            </>
        )
    }
}


function SearchBar({ userData }) {
    const [searchedName, setSearchedName] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    // Uses fuzzy search for best match of search
    useEffect(() => {
        if (searchedName !== "") {
            const options = {
                threshold: 0.3,
                location: 0,
                distance: 100,
                includeMatches: true,
                includeScore: true,
                useExtendedSearch: true
            };

            const userList = getUserNames(userData);

            const fuse = new Fuse(userList, options);
            const result = fuse.search(searchedName);

            setSearchResult(result);
        } else {
            setSearchResult([]);
        }
    }, [searchedName])

    return (
        <div style={{ position: "relative", paddingRight: "1rem"}}>
            <div style={{ display: "flex", flexDirection: "row",
                alignItems: "center", border: "1px solid", borderColor: "#343434ff",
                borderRadius: "10px", backgroundColor: "#131313ff",
                paddingRight: "0.5rem", minHeight: "40px"
            }}>
                <img src={searchMG} alt="search_mg" className="search-img"/>
                <input type="text" onChange={(e) => {setSearchedName(e.target.value)}}
                    placeholder="search for players" style={{ maxHeight: "20px", minWidth: searchBarWidth}}/>
            </div>
            {searchedName !== "" ? (
                <div style={{ position: "absolute", top: "45px", left: "50%", transform: "translateX(-50%)",
                    backgroundColor: "#131313ff", minWidth: "300px", borderRadius: "10px",
                    border: "1px, solid", borderColor: "#343434ff", zIndex: "999"}}>
                    <DropDown searchResult={searchResult}/>
                </div>
            ) : null}
        </div>
    )
}

export default SearchBar;