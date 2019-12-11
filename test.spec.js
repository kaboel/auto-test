import "core-js/stable"
import "regenerator-runtime"
import puppeteer from "puppeteer"

const timeout = process.env.SLOWMO || 30000

let browser
let page

beforeAll(async () => {
  jest.setTimeout(60000)

  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${1280}, ${800}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width: 1366, height: 768 })
  await page.goto('http://seleniumeasy.com/test')
})

describe('PPL@SELENIUMEASY', function () {
  test('1. Check Site Title', async () => {
    const title = await page.title()
    await expect(title).toBe('Selenium Easy - Best Demo website to practice Selenium Webdriver Online')
  }, timeout)

  test('2. Go to Simple From Demo', async () => {
    let navigator = await page.$('div.container-fluid:nth-child(1) div.row:nth-child(2) nav.navbar.navbar-default div.container div.collapse.navbar-collapse ul.nav.navbar-nav:nth-child(1) li.dropdown:nth-child(1) > a.dropdown-toggle');
    await navigator.click();
    await page.waitForSelector("div.container-fluid:nth-child(1) div.row:nth-child(2) nav.navbar.navbar-default div.container div.collapse.navbar-collapse ul.nav.navbar-nav:nth-child(1) > li.dropdown.open:nth-child(1)");
    navigator = await page.$('div.container-fluid:nth-child(1) div.row:nth-child(2) nav.navbar.navbar-default div.container div.collapse.navbar-collapse ul.nav.navbar-nav:nth-child(1) li.dropdown.open:nth-child(1) ul.dropdown-menu li:nth-child(1) > a:nth-child(1)');
    await navigator.click();
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    const title = await page.title();
    await expect(title).toBe('Selenium Easy Demo - Simple Form to Automate using Selenium');
  })

  test('2.1 Single Input Field', async () => {
    await page.waitForSelector("#get-input");
    await page.type('#user-message', "Test This Input")
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body form:nth-child(3) > button.btn.btn-default');
    await button.click();
    const result = await page.$eval('#display', el => el.innerHTML);
    await expect(result).toBe("Test This Input");
  }, timeout)

  test('2.2.1 Two Input Fields (NaN Result)', async () => {
    const char = 'a';
    const string = 'abc'
    await page.type('#sum1', char);
    await page.type('#sum2', string);
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(5) div.panel-body form:nth-child(3) > button.btn.btn-default:nth-child(3)');
    await button.click();
    const expected = "NaN";
    const result = await page.$eval('#displayvalue', el => el.innerHTML);
    await expect(result).toBe(expected);
  }, timeout)

  test('2.2.2 Two Input Fields (SUM Result)', async () => {
    await page.reload({waitUntil: "domcontentloaded"});
    const a = "2";
    const b = "5";
    await page.type('#sum1', a);
    await page.type('#sum2', b);
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(5) div.panel-body form:nth-child(3) > button.btn.btn-default:nth-child(3)');
    await button.click();
    const expected = "7";
    const result = await page.$eval('#displayvalue', el => el.innerHTML);
    await expect(result).toBe(expected);
  }, timeout)

  test('3. Go to Range Slider', async () => {
    let navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) > li.tree-branch:nth-child(4)');
    await navigator.click();
    navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(4) ul:nth-child(3) li:nth-child(3) > a:nth-child(1)');
    await navigator.click();
    await page.waitForNavigation({waitUntil: "domcontentloaded"});
    const title = await page.title()
    await expect(title).toBe('Selenium Easy - Drag and Drop Range Sliders')
  }, timeout)

  test('3.1 Range Slider', async () => {
    let slider = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) section.content:nth-child(2) div.row.sliders:nth-child(2) div.col-md-6:nth-child(1) div.range:nth-child(2) > input:nth-child(1)');
    let sliderBoundaryBox = await slider.boundingBox();
    await page.mouse.move(sliderBoundaryBox.x + sliderBoundaryBox.width / 2, sliderBoundaryBox.y + sliderBoundaryBox.height / 4);
    await page.mouse.down();
    await page.mouse.move(sliderBoundaryBox.x + sliderBoundaryBox.width / 5 ,sliderBoundaryBox.y+sliderBoundaryBox.height / 3,{ steps: 15 });
    await page.mouse.up();
    const result = await page.$eval('#range', el => el.innerHTML);
    await expect(result).toBe('20' || '19');
  }, timeout)

  test('4. Go to Input Form Submit', async () => {
    let navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(1) > a:nth-child(2)');
    await navigator.click();
    navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(1) ul:nth-child(3) li:nth-child(5) > a:nth-child(1)');
    await navigator.click();
    await page.waitForNavigation({waitUntil : 'domcontentloaded'});
    const title = await page.title()
    await expect(title).toBe('Selenium Easy - Input Form Demo with Validations')
  })

  test('4.1 Input Form Submit', async () => {
    await page.$eval('input[name=first_name]', el => el.value = "Faiq");
    await page.$eval('input[name=last_name]', el => el.value = "Allam");
    await page.$eval('input[name=email]', el => el.value = "faiq.kaboel@gmail.com");
    await page.$eval('input[name=phone]', el => el.value = "081234567890");
    await page.$eval('input[name=address]', el => el.value = "Gak dibawa");
    await page.$eval('input[name=city]', el => el.value = "Malang");
    await page.$eval('select[name=state]', el => el.value = "Budapest");
    await page.$eval('input[name=zip]', el => el.value = "65122");
    await page.$eval('input[name=website]', el => el.value = "test.com");
    const rad = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left section.content:nth-child(2) form.well.form-horizontal div.form-group:nth-child(11) div.col-md-4:nth-child(2) div.radio:nth-child(1) label:nth-child(1) > input:nth-child(1)');
    await rad.click();
    await page.$eval('textarea[name=comment]', el => el.value = "Lorem ipsum ojan");
    await page.waitFor(2000);
    await page.keyboard.press("Tab");
    await page.keyboard.press('Enter');
    await page.reload();
  }, timeout)

  test('5. Go to Radio Button', async () => {
    let navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) > li.tree-branch:nth-child(1)');
    await navigator.click();
    navigator = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(1) ul:nth-child(3) li:nth-child(3) > a:nth-child(1)');
    await navigator.click();
    await page.waitForNavigation({waitUntil: "domcontentloaded"});
    const title = await page.title();
    await expect(title).toBe('Selenium Easy Demo - Radio buttons demo for Automation');
  })

  test('5.1 Test Radio Male', async () => {
    const node = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body label.radio-inline:nth-child(2) > input:nth-child(1)');
    await node.click();
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body p:nth-child(6)> button.btn.btn-default');
    await button.click();
    const result = await page.$eval('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body > p.radiobutton:nth-child(7)', el => el.innerHTML);
    await expect(result).toBe("Radio button 'Male' is checked");
  })

  test('5.2 Test Radio Female', async () => {
    await page.reload({waitUntil: "domcontentloaded"});
    const node = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body label:nth-child(3)> input');
    await node.click();
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body p:nth-child(6)> button.btn.btn-default');
    await button.click();
    const result = await page.$eval('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body > p.radiobutton:nth-child(7)', el => el.innerHTML);
    await expect(result).toBe("Radio button 'Female' is checked");
  })

  test('5.3 Test Radio None', async () => {
    await page.reload({waitUntil: "domcontentloaded"});
    const button = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body p:nth-child(6)> button.btn.btn-default');
    await button.click();
    const result = await page.$eval('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(4) div.panel-body > p.radiobutton:nth-child(7)', el => el.innerHTML);
    await expect(result).toBe("Radio button is Not checked");
  })

  test('6. Go to Drag and Drop', async () => {
    const nextTest = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(7) > a:nth-child(2)');
    await nextTest.click();
    const target = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-3.sidenav:nth-child(1) div.panel.panel-default div.panel-body ul.treeview.treeview-tree li.tree-branch ul:nth-child(3) li.tree-branch:nth-child(7) ul:nth-child(3) li:nth-child(1) > a:nth-child(1)');
    await target.click();
    await page.waitForNavigation({waitUntil: "domcontentloaded"});
    const title = await page.title()
    await expect(title).toBe('Selenium Easy Demo - Drag and Drop Demo')
  })

  test('6.1 Drag and drop test', async () => {
    await page.waitForSelector('#mydropzone');
    const dragBox = await page.$('div.container-fluid.text-center:nth-child(2) div.row div.col-md-6.text-left:nth-child(2) div.panel.panel-default:nth-child(2) div.panel-body div.w25.moveleft:nth-child(1) > span:nth-child(2)');
    const position = await dragBox.boundingBox();
    const dropBox = await page.$('#mydropzone');
    const endPoint = await dropBox.boundingBox();
    await page.mouse.move(position.x + position.width / 2, position.y + position.height / 2);
    await page.mouse.down();
    await page.waitFor(3000);
    await page.mouse.move(0,0);
    await page.mouse.move(endPoint.x + endPoint.width / 2, endPoint.y + endPoint.height / 2);
    // await page.waitFor(1000);
    await page.mouse.up();
    const result = page.$eval('#droppedlist', el => el.innerHTML);
    await expect(result).toMatch('Draggable');
  }, timeout);
});

afterAll( async () => {
  await browser.close()
})
