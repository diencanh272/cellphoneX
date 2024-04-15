import { userCurrentSignup } from './userCurrentSignup';

function ShortNameUser() {
    if (!userCurrentSignup.fullname) {
        return null; // hoặc return một thông báo nếu muốn
    }
    const arrStr = [];
    let text = userCurrentSignup.fullname;
    const myArray = text.split(' ');
    arrStr.push(myArray);

    const firstCharacters = arrStr.map((arr) => {
        const myCharacter = arr.map((word) => word[0]);
        return myCharacter;
    });

    // console.log(firstCharacters);

    let shortName = '';

    if (firstCharacters.length > 2) {
        shortName = `${firstCharacters[0]}${firstCharacters[firstCharacters.length - 1]}`;
    } else if (firstCharacters.length === 2) {
        shortName = `${firstCharacters[0]}${firstCharacters[1]}`;
    } else if (firstCharacters.length === 1) {
        shortName = firstCharacters[0];
    }

    return <p>{shortName}</p>;
}

export default ShortNameUser;
