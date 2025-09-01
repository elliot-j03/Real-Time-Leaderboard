// Firebase
import { auth } from "../config/firebase";
// API
import { sendFriendRequest, removeFriendRequest, acceptFriendRequest, removeFriend } from "../scripts/api";

// Request friend
export async function reqFriend(pageUID, navLogIn, setRequested) {
    if (auth.currentUser === null || auth.currentUser === undefined) {
        navLogIn();
    } else {
        const loggedUID = auth.currentUser.uid;
        const token = await auth.currentUser.getIdToken();
        const response = await sendFriendRequest(token, loggedUID, pageUID);
        if (response.status === "true") {
            setRequested(true);
        } else {
            console.log("failure");
        }
    }
}

// Remove Request
export async function removeReqFriend(pageUID, setRequested) {
    const loggedUID = auth.currentUser.uid;
    const token = await auth.currentUser.getIdToken();
    const response = await removeFriendRequest(token, loggedUID, pageUID);
    if (response.status === "true") {
        setRequested(false);
    } else {
        console.log("failure");
    }
}

// Accept request
export async function acceptReqFriend(pageUID, setIncoming) {
    const loggedUID = auth.currentUser.uid;
    const token = await auth.currentUser.getIdToken();
    const response = await acceptFriendRequest(token, loggedUID, pageUID);
    if (response.status === "true") {
        setIncoming(false);
    } else {
        console.log("failure");
    }
}

// Remove existing friend
export async function removeExistingFriend(pageUID, setFriended) {
    const loggedUID = auth.currentUser.uid;
    const token = await auth.currentUser.getIdToken();
    const response = await removeFriend(token, loggedUID, pageUID);
    if (response.status === "true") {
        setFriended(false);
    } else {
        console.log("failure");
    }
}