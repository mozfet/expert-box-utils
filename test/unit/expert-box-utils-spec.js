'use strict';

describe('expert-box-utils', function() {
  
    beforeEach(angular.mock.module('underscore'));
    beforeEach(angular.mock.module('string'));
    beforeEach(angular.mock.module('expert-box-utils'));
    beforeEach(angular.mock.module(function ($provide) {
        //$provide.value('$log', console);
    }));
    
    it('should be defined', inject(function(ebUtils) {
        expect(ebUtils).toBeDefined();
    }));

    //it has been observed once before that this test failed... it is however not heavily used yet...
    it('should generate a random number', inject(function (ebUtils, $log) {
        $log.debug('test: should generate 100 x 4 digit random numbers in a row');
        for (var i = 100; i > 0; i--) {
            var rnd = ebUtils.random(4);
            var result = rnd>999 && rnd<10000;
            if (!result) {
                $log.error('Random number should be 4 digits! Found '+rnd);
            }
            expect(result).toBe(true);
        };
    }));

    it('should generate a random id', inject(function (ebUtils, $log, string) {
        $log.debug('test: should generate a random id');
        var result = ebUtils.randomId('    tré  324 %$#%$* --- ___ gfe   ');
        expect(string(result).startsWith('TR_324_GFE_')).toBe(true);
    }));

    it('should style html', inject(function (ebUtils, $log) {
        $log.debug('test: should generate a random id');
        var expectedResult = '<div>\n    <p>Hello World</p>\n</div>';
        var result = ebUtils.style_html('<div><p>Hello World</p></div>');
        expect(result).toEqual(expectedResult);
    }));

    it('should get object', inject(function (ebUtils, $log) {
        var nestedObject = {
            a: {
                b: {
                    c: 'd'
                }
            }
        };
        var result = ebUtils.get(nestedObject, 'a.b.c');
        expect(result).toEqual('d');
        var result = ebUtils.get(nestedObject, 'a.b.e');
        expect(result).toBeUndefined();
    }));

    it('should pretty filter html', inject(function (prettyFilter, $log, _, string) {
        var html = '<div><div>text</div></div>';
        var expectedResult = '<div>\n    <div>text</div>\n</div>';
        var result = prettyFilter(html);
        expect(result).toEqual(expectedResult);
    }));

    it('should pretty filter objects', inject(function (prettyFilter, $log, _, string) {
        var obj = {
            a: {
                b: {
                    c: 'd'
                }
            }
        };
        var expectedResult = '{<br>&nbsp;&nbsp;"a":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;"b":&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"c":&nbsp;"d"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}';
        var result = prettyFilter(obj);
        expect(result).toEqual(expectedResult);
    }));

    it('should pretty filter arrays', inject(function (prettyFilter, $log, _, string) {
        var obj = ['one', 'two'];
        var expectedResult = '[<br>&nbsp;&nbsp;"one",<br>&nbsp;&nbsp;"two"<br>]';
        var result = prettyFilter(obj);
        expect(result).toEqual(expectedResult);
    }));

    it('should pretty filter strings', inject(function (prettyFilter, $log, _, string) {
        var str = 'one';
        var expectedResult = 'one';
        var result = prettyFilter(str);
        expect(result).toEqual(expectedResult);
    }));

    it('should pretty filter numbers', inject(function (prettyFilter, $log, _, string) {
        var num = 123;
        var expectedResult = 123;
        var result = prettyFilter(num);
        expect(result).toEqual(expectedResult);
    }));

    it('should pretty filter boolean', inject(function (prettyFilter, $log, _, string) {
        var bool = true;
        var expectedResult = true;
        var result = prettyFilter(bool);
        expect(result).toEqual(expectedResult);
    }));
});
