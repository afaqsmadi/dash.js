import BaseURLSelector from '../../src/streaming/utils/BaseURLSelector';

const expect = require('chai').expect;

const context = {};
const baseURLSelector = BaseURLSelector(context).create();

describe('BaseURLSelector', function () {
    it('should throw an error when chooseSelectorFromManifest is called and config object has not been set properly', function () {
        expect(baseURLSelector.chooseSelectorFromManifest.bind()).to.be.throw('Missing config parameter(s)');
    });

    it('should throw an error when select is called with no data parameter', function () {
        const selector = baseURLSelector.select();

        expect(selector).to.be.undefined; // jshint ignore:line
    });
});