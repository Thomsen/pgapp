exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  specs: [
    'e2e/becomeDemo.spec.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true
  },
  allScriptsTimeout: 20000,
  onPrepare: function() {
    browser.driver.get('http://192.168.1.130:8100'); // need ionic serve
    // browser.driver.manage().window().maximize();
    // browser.driver.get('http://localhost:4400/?enableripple=cordova-3.0.0-iPhone5');
    // browser.sleep(3000);
    // browser.driver.switchTo().frame(0);
  }
};
