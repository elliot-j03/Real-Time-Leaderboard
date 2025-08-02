// Animations
import { AnimatePresence , motion } from "framer-motion";
// Components
import AuthInputBox from "./AuthInputBox";

const ABContainer = ({ authType, buttonFunction, buttonText, cardType }) => {
    return (
        <div style={{
            height: "13rem",
            width: "10rem",
            padding: "2rem",
            backgroundColor: "#1e1e1e",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden"
        }}>
            <AnimatePresence mode="wait">
                {authType === "login" ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 1, x: -250 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 1, x: -250 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: "absolute", width: "100%" }}
                    >
                        <AuthInputBox
                            buttonFunction={buttonFunction}
                            buttonText={buttonText}
                            cardType={cardType}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="create"
                        initial={{ opacity: 1, x: 250 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 1, x: 250 }}
                        transition={{ duration: 0.2 }}
                        style={{ position: "absolute", width: "100%" }}
                    >
                        <AuthInputBox
                            buttonFunction={buttonFunction}
                            buttonText={buttonText}
                            cardType={cardType}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ABContainer;