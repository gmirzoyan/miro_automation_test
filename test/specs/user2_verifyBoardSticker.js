import { expect } from "chai";
import expected from './../../data/expected.json';
import { userSignIn } from "../../helper/methods";
import testData from "../../data/testData.json";
import selectors from "../../data/selectors.json";

describe('STICKER VERIFICATION FUNCTIONALITY', () => {
    before(() => {
        browser.maximizeWindow();
        browser.url('https://miro.com/login/');
        console.log('>>>> 2 - Signing in as User2');
    });

    it('01/FH Verify the SignIn page has the correct title',  () => {
        expect(browser.getTitle()).to.equal(expected.userSignIn.titleName);
    });

    it('02/FH Verify the user can successfully sign in as User2', () => {
        expect($(selectors.signIn.emailIF).isExisting()).to.equal(true);
        expect($(selectors.signIn.passwordIF).isExisting()).to.equal(true);
        userSignIn(testData.user2.email, testData.user2.password);
    });

    it('03/FH Verify the shared board is displayed',  async () => {
        await $(selectors.user2.board).waitForExist({timeout: 9000});
        expect(await $(selectors.user2.board).isDisplayed()).true;
        //console.log('Hello', await $(selectors.user2.board).getText());
        expect(await $(selectors.user2.board).getText() === 'Board').true;
    });

    it('04/FH Verify the sticker is displayed on the shared board', async () => {
        await $(selectors.user2.board).click();
        const boardModal = await $(selectors.createNewBoard.boardModal);
        await boardModal.waitForExist({timeout: 5000});
        await browser.keys(['Escape']);
        await $(selectors.user2.historyIcon).waitForEnabled({ timeout: 8000 });
        if ($(selectors.user2.historyIcon).isEnabled())
            await $(selectors.user2.historyIcon).click();
        await $(selectors.user2.historyNote).waitForExist({timeout: 5000});
        expect(await $(selectors.user2.historyNote).getText() === 'added sticky note').true;
        await browser.pause(4000);
    });


});