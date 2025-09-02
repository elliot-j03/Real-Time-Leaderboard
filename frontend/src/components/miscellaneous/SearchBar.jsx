// React
import { useState, useEffect } from "react";
// Fuse
import Fuse from "fuse.js";
// Components
import DropDown from "./DropDown";
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
                    <DropDown userList={searchResult} dropDownType={"search"}/>
                </div>
            ) : null}
        </div>
    )
}

export default SearchBar;