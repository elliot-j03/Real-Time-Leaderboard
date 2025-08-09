export function posCalc(userData) {
    const semidUD = Object.entries(userData).map(([ uid, details ]) => {
            return details;
        })
    const finalUD = semidUD.map(({ email, score, username }) => {
            return [username, score];
        })
    const udArr = finalUD.sort((a , b) => b[1] - a[1]);
            
    // 1: Make an array of number group arrays
    // e.g. 20, 13, 12, 12, 9 => [[20], [13], [12, 12], [9]]
    let littleArr = [];
    let bigArr = [];
    for (let i = 0; i < udArr.length; i++) {
        if (i === 0) {
            littleArr.push(udArr[i][1]);
        }
        else if (udArr[i][1] !== udArr[i-1][1] && i !== udArr.length - 1) {
            bigArr.push(littleArr);
            littleArr = [udArr[i][1]];
        } else if (udArr[i][1] !== udArr[i-1][1] && i === udArr.length - 1) {
            bigArr.push(littleArr);
            littleArr = [udArr[i][1]];
            bigArr.push(littleArr);
        } else if (udArr[i][1] === udArr[i-1][1] && i !== udArr.length - 1) {
            littleArr.push(udArr[i][1]);
        } else if (udArr[i][1] === udArr[i-1][1] && i === udArr.length - 1) {
            littleArr.push(udArr[i][1]);
            bigArr.push(littleArr);
        }
    }
            
    // 2: Finds the leaderboard position, and amount of times the position is taken
    // e.g. [[20], [13], [12, 12], [9]] => [[1, 1], [2, 1], [3, 2], [5, 1]]
    let pos = 1;
    let posArr = [];
    let miniArr = [];
    for (let i = 0; i < bigArr.length; i++) {
        if (i === 0) {
            miniArr.push([pos, bigArr[i].length]);
            posArr.push(miniArr);
            miniArr = [];
        } else {
            pos = bigArr[i-1].length + pos;
            miniArr.push([pos, bigArr[i].length]);
            posArr.push(miniArr);
            miniArr = [];
        }
    }

    // 3: Makes an array of the ranks
    // e.g. [[1, 1], [2, 1], [3, 2], [5, 1]] => [1, 2, 3, 3, 5]
    // for some reason they are nested arrays, i don't know why
    let ranksArr = [];
    for (let i = 0; i < posArr.length; i++) {
        let currentItem = posArr[i];
        let rank = currentItem[0][0];
        let count = currentItem[0][1];

        for (let j = 0; j < count; j++) {
            ranksArr.push(rank);
        }
    }
            
    // 4. Append the ranks to the original user data and its done :)
    for (let i = 0; i < udArr.length; i++) {
        udArr[i].push(ranksArr[i]);
    }

    return udArr
}