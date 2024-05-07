import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchListAccountApi } from '~/actions/AccountAction';

function ShortNameUser() {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    useEffect(() => {
        dispatch(actionFetchListAccountApi());
    }, [dispatch]);
    let getAccount = { fullname: '' };
    let getAccountId;

    if (localStorage && localStorage.getItem('AccountId')) {
        getAccountId = JSON.parse(localStorage.getItem('AccountId'));
    }
    getAccount = accounts.find((acc) => acc.id === getAccountId);

    const splittedStr = [];

    let text = '';
    if (getAccount && getAccount.fullname) {
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
