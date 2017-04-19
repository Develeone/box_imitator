var ROWS_COUNT = 5;

var rows_sockets = [];

for (var i = 0; i < ROWS_COUNT; i++) {
	rows_sockets.push(new WebSocket("ws://192.168.100.172:1447/device/" + i));

	rows_sockets[i].row_id = i; // Устанавливаем в параметр - id стойки, чтоб в асинхронных функциях использовать

	rows_sockets[i].onopen = function() {
	    console.log("Соединение установлено.");
	};

	rows_sockets[i].onclose = function(event) {
	    if (event.wasClean) {
		    alert('Соединение закрыто корректно');
	    } else {
		    alert('Обрыв соединения');
	    }

	    alert('Код: ' + event.code + ' причина: ' + event.reason);
	};

	rows_sockets[i].onmessage = function(event) {
	    console.log(event.data);
	    processMessage(event.data, this.row_id);
	};

	rows_sockets[i].onerror = function(error) {
	    alert("Ошибка " + error.message);
	};
}


function processMessage (data, row_id) {
	data = JSON.parse(data);

	for(var i = 0; i < data.numbers_arr.length; i++) {
	    //console.log("cell-"+row_id+"-"+i);
		document.getElementById("cell-"+row_id+"-"+i).innerHTML = data.numbers_arr[i];
	}
}
