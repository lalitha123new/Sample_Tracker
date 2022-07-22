app.factory('myService', function() {
    var npBase = '';
    function setNp(data) {
        npBase = data;
    }
    function getNp() {
        return savedData;
    }

    return {
        set: setNp,
        get: getNp
    }

});