let accountLogined = {};

export const userRoles = {
    isAdmin: false,
    isLoggedIn: false,
};

if (localStorage && localStorage.getItem('AccountId')) {
    accountLogined = JSON.parse(localStorage.getItem('AccountId'));
    userRoles.isAdmin = accountLogined === 1 || accountLogined === 2 || accountLogined === 3;
    userRoles.isLoggedIn = accountLogined !== '';
}

// console.log(userRoles);
