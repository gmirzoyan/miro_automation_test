import { expect } from "chai";
import expected from './../../data/expected.json';
import { userSignIn } from "../../helper/methods";
import testData from "../../data/testData.json";
import selectors from "../../data/selectors.json";

describe('STICKER CREATION FUNCTIONALITY', () => {
    before(() => {
        browser.maximizeWindow();
        browser.url('https://miro.com/login/');
        console.log('>>>> 1 - Signing in as User1');
    });

    it('01/FH Verify the SignIn page has the correct title',  () => {
        expect(browser.getTitle()).to.equal(expected.userSignIn.titleName);
    });

    it('02/FH Verify the user can successfully sign in as User1', () => {
        expect($(selectors.signIn.emailIF).isExisting()).to.equal(true);
        expect($(selectors.signIn.passwordIF).isExisting()).to.equal(true);
        userSignIn(testData.user1.email, testData.user1.password);
        $(selectors.signIn.createBoardPage).waitForExist({timeout: 7000});
        expect($(selectors.signIn.createBoardPage).getText()).to.equal('Create a board');
    });

    it('03/FH Verify the user is able to create a board', async () => {
        const boardModal = await $(selectors.createNewBoard.boardModal);
        await boardModal.waitForExist({timeout: 5000});
        await browser.keys(['Escape']);
        // const topBanner = await $(selectors.createNewBoard.closeTopBanner);
        // await topBanner.waitForExist({timeout: 5000});
        // if (topBanner){
        //     await topBanner.click();
        // }
        const newBoardLink = await $(selectors.createNewBoard.newBoardLink);
        await browser.waitUntil(() => $(selectors.createNewBoard.newBoardLink).isDisplayed());
        await newBoardLink.click();
        await browser.waitUntil(() => $(selectors.createNewBoard.newBoardModal).isDisplayed());
        expect(await $(selectors.createNewBoard.newBoardModal).isDisplayed()).true;
        await browser.keys(['Escape']);
        const editBoardLink = await $(selectors.createNewBoard.editBoardLink);
        await editBoardLink.waitForExist({timeout: 5000});
        await editBoardLink.click();
    });

    it('04/FH Verify the user is able to change the input value', async () => {
        await $(selectors.createNewBoard.editInput).doubleClick();
        let input = await $(selectors.createNewBoard.editInput);
        await input.addValue('Board');
        await browser.keys(['Escape']);
        await browser.pause(3000);
        expect(await $(selectors.createNewBoard.newTitle).isDisplayed()).true;
        expect(await $(selectors.createNewBoard.newTitle).getText()).to.equal('Board');
    });

    it('05/FH Verify the user is able to create a sticky note to share the created board', async () => {
        await $(selectors.createSticker.stickerLink).click();
        const canvas = await $(selectors.createSticker.canvasLink);
        await canvas.click({ x: 50, y: 50 });
        await $(selectors.shareBoard.shareLink).click();
        await $(selectors.shareBoard.emailDiv).click();
        await browser.pause(3000);
        let checkbox = await $$(selectors.shareBoard.checkboxUser2);
        await checkbox[1].click();
        expect(await $(selectors.shareBoard.chooseButton).getText() === 'Choose').true;
        await $(selectors.shareBoard.chooseButton).click();
        const invitationBtn = $(selectors.shareBoard.invitationBtn);
        await invitationBtn.click();
    });
});