let dataHanlder={
 loadData:function(callback, api) {
            fetch(api)  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                console.log(data);
                callback(data);
            }
)
},
loadResidents (callback, api) {
            fetch(api)  // set the path; the method is GET by default, but can be modified with a second parameter
            .then((response) => response.json())  // parse JSON format into JS object
            .then((data) => {
                callback(data);

            }
)
}
};