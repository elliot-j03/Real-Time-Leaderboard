function AuthInputBox({ buttonFunction, buttonText, cardType }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            {cardType.map(({ ph, func }, idx) => {
                return (
                <input key={idx} placeholder={ph} 
                onChange={func} 
                style={{margin: "10px"}}
                />)
            })}
            <div style={{ padding: "0.5rem"}}>
                <button onClick={buttonFunction} style={{ maxWidth: "200px"}}>{buttonText}</button>
            </div>
        </div>
    )
}

export default AuthInputBox