module.exports = function() {
    return {
        restrict: 'E',
        template: require('./test.html'),
        replace: true,
        scope: false
    };
};
