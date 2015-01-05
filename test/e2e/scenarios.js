'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

  describe('PhoneCat App', function() {

    describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });

    var phoneList = element.all(by.repeater('phone in phones'));
    var query = element(by.model('query'));

    it('should filter the phone list as a user types into search box', function() {

      expect(phoneList.count()).toBe(3);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(2);
    });

    it('should display the current filter value in the title bar', function (){
      query.clear();
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/);
    });

    it('should be possible to control phone order via the drop down select menu', function (){
      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

        query.sendKeys('tablet');

        expect(getNames()).toContain([
          "Motorola XOOM\u2122 with Wi-Fi, 'The Next, Next Generation Experience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb).",
          "MOTOROLA XOOM\u2122"
          ]);

        element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

        expect(getNames()).toContain([
          "MOTOROLA XOOM\u2122, 'The Next, Next Generation Experience the future with MOTOROLA XOOM, the world's first tablet powered by Android 3.0 (Honeycomb).",
          "Motorola XOOM\u2122 with Wi-Fi"
          ]);
    });
  });
});