var listOfResidents = [];

let dom = {
    addBoard: function () {
         dataHanlder.loadData(dom.showBoard, 'https://swapi.co/api/planets/');
    },
    showBoard: function (datas) {
        let table = document.getElementById('table');
        table.innerHTML = '';
        let useableData = datas['results'];
        for (data of useableData) {
            if (data['diameter'] !== 'unknown'){
                var diameter = data['diameter'] + 'km'
            } else {
                var diameter = 'unknown'
            }
            if (data['surface_water'] !== 'unknown'){
                var suface_water = data['surface_water'] + '%'
            } else {
                var suface_water = 'unknown'
            }
            if (data['population'] !== 'unknown'){
                var population = Number(data['population']).toLocaleString()
            } else {
                 var population = 'unknown'
            }
            listOfResidents.push({Name:'modal_button'+data['name'],Residents:data['residents']});
            table.innerHTML += `<tr>
                        <td>${data['name']}</td>
                        <td>${diameter} </td>
                        <td>${data['climate']}</td>
                        <td>${data['terrain']}</td>
                        <td>${suface_water}</td>
                        <td>${population}</td>
                        <td><button type="button" data-toggle="modal" data-target="#asd"  id="modal_button${data['name']}" onclick="dom.loadResidents(this)">Residents </button></td>
                        </tr>`;
        }
        dom.addButton(datas);
        let next =document.getElementById('next');
        let previous = document.getElementById('previous');
        next.addEventListener('click', function () {
           dataHanlder.loadData(dom.showBoard, datas['next'])
        });
        previous.addEventListener('click', function () {
            dataHanlder.loadData(dom.showBoard, datas['previous'])
        })
    },
    addButton: function (datas) {
        if (datas['previous']) {
            document.getElementById('pageButton').innerHTML = `
                                                            <button id="previous">Previous</button>
                                                            `;
        } else {
            document.getElementById('pageButton').innerHTML = `
                                                            <button id="previous" disabled >Previous</button>
                                                            `;
        }
        if (datas['next']) {
            document.getElementById('pageButton').innerHTML += `
                                                            <button id="next" >Next</button>
                                                            `;
        }else {
            document.getElementById('pageButton').innerHTML += `
                                                            <button id="next" disabled>Next</button>
                                                            `;
        }
    },
    loadResidents (event) {
        for (let row of listOfResidents) {
            if (event.id == row.Name) {
                var planetName = row.Name
                var dataOfRedidents = row.Residents;
                break;
            }
        }
        console.log(dataOfRedidents);

        document.getElementById('modal-title').innerHTML = planetName.replace('modal_button', '');
            if (dataOfRedidents.length > 0 ) {
                document.getElementById('modal_table_body').innerHTML = '';
                for (let api of dataOfRedidents) {
                    dataHanlder.loadResidents(dom.modifyModal, api);
                }
            }else{
                document.getElementById('modal_table').innerHTML = 'No resident'
            }

        },
    modifyModal (resident){
        let modalTable =document.getElementById('modal_table_body');
        modalTable.innerHTML += `<tr>
                                                                <td>${resident['name']}</td>
                                                                <td>${resident['height']}</td>
                                                                <td>${resident['mass']}</td>
                                                            </tr>`
    }
};