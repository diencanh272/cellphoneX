function ShortNameUser() {
    const getAccount = JSON.parse(localStorage.getItem('Account'));
    // console.log(getAccount);

    const splittedStr = [];

    let text = '';
    if (getAccount !== -1) {
        text = getAccount.fullname;
    }

    // console.log(text);
    const myArray = text.split(' ');
    splittedStr.push(myArray);

    const firstCharacters = splittedStr.map((arr) => {
        const myCharacter = arr.map((word) => word[0]);
        return myCharacter;
    });

    // console.log(firstCharacters);

    let shortName = '';

    if (firstCharacters.length > 2) {
        shortName = `${firstCharacters[0][0]}${firstCharacters[firstCharacters[0].length - 1]}`;
    } else if (firstCharacters.length === 2) {
        shortName = `${firstCharacters[0]}${firstCharacters[1]}`;
    } else if (firstCharacters.length === 1) {
        shortName = firstCharacters[0];
    }

    // console.log(shortName);

    return <p>{shortName}</p>;
}

export default ShortNameUser;
