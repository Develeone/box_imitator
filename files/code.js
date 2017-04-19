var ROWS_COUNT = 4;

var rows_sockets = [];

for (var i = 0; i < ROWS_COUNT; i++) {
	rows_sockets.push(new WebSocket("ws://192.168.100.172:1447/device/" + i));

	rows_sockets[i].row_id = i; // Устанавливаем в параметр - id стойки, чтоб в асинхронных функциях использовать

	rows_sockets[i].onopen = function() { console.log("Соединение стойки "+this.row_id+" установлено."); };
	rows_sockets[i].onclose = function(event) {
        alert((event.wasClean ? 'Соединение стойки '+this.row_id+' закрыто корректно'
                : 'Обрыв соединения стойки '+this.row_id)+'\n'+
                'Код: ' + event.code + ' причина: ' + event.reason );
	};
	rows_sockets[i].onmessage = function(event) { processMessage(event.data, this.row_id); };
	rows_sockets[i].onerror = function(error) { alert("Ошибка стойки " + this.row_id +": "+ error.message); };
}

function processMessage (data, row_id) {
	data = JSON.parse(data);

	if (data.action == 1)
	    if (data.numbers_arr.length == 24) {
            for (var i = 0; i < data.numbers_arr.length; i++)
                document.getElementById("cell-" + row_id + "-" + i).innerHTML = data.numbers_arr[i];
            console.log("На стойку "+row_id+" установлены данные " + data.numbers_arr);
        } else
	        console.error("Для стойки "+row_id+" получено неверное количество значений: "+data.numbers_arr.length);
    else
        console.log(event.data);
}