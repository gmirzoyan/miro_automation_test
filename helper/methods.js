import selectors from "./../data/selectors.json";


export function userSignIn(userEmail, password) {
    $(selectors.signIn.emailIF).setValue(userEmail);
    $(selectors.signIn.passwordIF).setValue(password);
    $(selectors.signIn.signInButton).click();
}


