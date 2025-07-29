function AuthInputBox({ buttonFunction, buttonText, cardType }) {
    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {cardType.map(({ ph, func }) => {
                return (<input placeholder={ph} 
                onChange={func} 
                style={{margin: "10px"}}
                />)
            })}
            <button onClick={buttonFunction}>{buttonText}</button>
        </div>
    )
}

export default AuthInputBox