function ErrorBox ({ errMessage }) {
    return (
        <div style={{ backgroundColor: "#ce5d5dff", borderRadius: "3px",
            padding: "0.2rem"
        }}>
            <div style={{ backgroundColor: "#912d2dff", borderRadius: "3px",
                paddingTop: "0.1rem", paddingBottom: "0.1rem", paddingRight: "0.5rem",
                paddingLeft: "0.5rem"
            }}>
                <p>{errMessage}</p>
            </div>
        </div>
    )
}

export default ErrorBox;