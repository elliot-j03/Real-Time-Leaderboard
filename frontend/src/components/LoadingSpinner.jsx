import spinner from "../assets/loading_spinner.png";

function LoadingSpinner() {
    return (
        <div>
            <img className="spinner" src={spinner} alt="Loading..." />
        </div>
    )
}

export default LoadingSpinner;