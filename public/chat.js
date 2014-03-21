/*
A sample project on Node.js for learning the framework.
*/
var wdata = [
        {
                arr: [],
                max: 0,
                avg: 0
},
        {
                arr: [],
                max: 0,
                avg: 0
},
        {
                arr: [],
                max: 0,
                avg: 0
},
        {
                arr: [],
                max: 0,
                avg: 0
},
        {
                arr: [],
                max: 0,
                avg: 0
}];

var socket;

window.onload = function ()
{

        socket = io.connect(
                'http://localhost:3700'); //connect to node.js server

        socket.on('message', function (data)
        {
                //node.js callback function.
                //i.e On data update,emits the data to all connected clients
                wdata = data; //copy the received data to the local datastructure

                for (i = 0; i < 5; i++) //function which updates the shelf according to the received data
                {
                        var shelf = document.getElementById(
                                i + 1);
                        shelf.innerHTML = "";
                        var n = wdata[i].arr.length;
                        var shelf_top_id =
                                "top" + (i + 1);
                        for (j = 0; j < n; j++)
                        {
                                if (j == (n - 1))
                                {
                                        shelf.innerHTML =
                                                shelf.innerHTML +
                                                '<div class="boxi" ondragstart="drag(event)" draggable="true" id="' +
                                                shelf_top_id +
                                                '">' +
                                                wdata[i].arr[
                                                        j] +
                                                '</div>';
                                }
                                else
                                {
                                        shelf.innerHTML =
                                                shelf.innerHTML +
                                                '<div class="boxi" ondragstart="drag(event)" draggable="true">' +
                                                wdata[i].arr[
                                                        j] +
                                                '</div>';
                                }

                        }
                        document.getElementById(
                                'max' + (i + 1))
                                .innerHTML = wdata[
                                        i].max; //update status:max items 
                        document.getElementById(
                                'avg' + (i + 1))
                                .innerHTML = wdata[
                                        i].avg; //update status:Avg items 
                        document.getElementById(
                                'av' + (i + 1))
                                .innerHTML = 10 -
                                wdata[i].arr.length; //update status: total items 
                }

        });


}