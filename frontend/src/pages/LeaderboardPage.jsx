// React
import { useNavigate } from "react-router-dom";

function LBPage() {
    const navigate = useNavigate();


    function navHome() {
        navigate("/");
    }

    return (
        <div className="home-page">
            <button onClick={navHome} >Home</button>
            <h1>Leaderboard</h1>
        </div>
    )
}

export default LBPage