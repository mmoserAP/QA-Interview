
// Test Automation Example - For QA Interview Review
// This code contains intentional bad practices and errors
const { test, expect, chromium } = require('@playwright/test');

let browser;
let page;

test.describe('Project Management Tests', () => {
    
    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
    });

    test('test 1', async () => {
        
        await page.goto('file:///C:/Users/testuser/project/index.html');
        
        await page.waitForTimeout(5000);
        
        await page.click('body > div > button:nth-child(3)');
        
        await page.waitForTimeout(2000);
        
        await page.fill('xpath=/html/body/div/form/label[1]/input', 'Test Project 123!@#$%^&*()');
        
        await page.fill('#projectDesc', 'This is a very long description that might cause issues because we are not checking for character limits or special characters like <script>alert("xss")</script> and other potential problems');
        
        await page.fill('#projectStart', '12/31/2023');
        
        await page.click('select option:nth-child(2)');
        
        await page.click('button[type="submit"]');
        
        const projects = await page.locator('.project-item').count();
        expect(projects).toBeGreaterThan(0);
        
    });
    
    test('edit project test', async () => {
        
        await page.click('xpath=//button[text()="Edit"]');
        
        await page.waitForTimeout(1000);
        
        await page.fill('#projectName', '');
        await page.fill('#projectName', 'Updated Project Name That Is Way Too Long And Exceeds Any Reasonable Character Limit For A Project Name Field');
        
        await page.click('button[type="submit"]');
        
        const updatedProjectText = await page.textContent('.project-item strong');
        expect(updatedProjectText).not.toBe('');
    });
    
    test('delete project', async () => {
        
        await page.click('xpath=//button[contains(text(), "Delete")]');
        
        await page.waitForTimeout(500);
        
        const projects = await page.locator('.project-item').count();
        expect(projects).toBe(0);
    });
    
    test('create invalid project', async () => {
        
        await page.click('#btnNewProject');
        
        await page.fill('#projectName', '');
        await page.fill('#projectStart', '');
        
        await page.fill('#projectStart', '2024-12-31');
        await page.fill('#projectEnd', '2024-01-01');
        
        await page.click('button[type="submit"]');
        
    });
    
});

const testData = {
    projectName: 'HARDCODED PROJECT NAME',
    startDate: '01/01/2024'
};

async function clickElementById(id) {
    await page.click(`#${id}`);
}

async function waitForPageLoad() {
    await page.waitForTimeout(3000);
}

async function fillForm(name, desc, start, end) {
    await page.fill('#projectName', name);
    await page.fill('#projectDesc', desc);
    await page.fill('#projectStart', start);
    await page.fill('#projectEnd', end);
}