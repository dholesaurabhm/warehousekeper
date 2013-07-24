var curr_box_items_count;

function max(shelf_no)
{
        var max = new Number;
        max = -99999;
        for (i = 0; i < wdata[shelf_no].arr.length; i++)
        {
                if (max < wdata[shelf_no].arr[i])
                        max = wdata[shelf_no].arr[i];
        }
        wdata[shelf_no].max = max;
        document.getElementById('max' + (shelf_no + 1)).innerHTML = max;
}

function allowDrop(ev)
{
        ev.preventDefault();

}

function setitems()
{
        var itembox = document.getElementById("items");
        if (!(isNumber(itembox.value)))
        {
                alert("Enter only Numeric Value");
                return;
        }
        curr_box_items_count = itembox.value;
        var box = document.getElementById("boxb");
        box.draggable = true;
        box.style.cursor = 'move';
        box.innerHTML = itembox.value;
        box.style.visibility = "visible";
}

function isNumber(n)
{
        return !isNaN(parseFloat(n)) && isFinite(n);
}

function drag(ev)
{

        ev.dataTransfer.setData("Text", ev.target.className);
        ev.dataTransfer.setData("id", ev.target.id);
}

function calc_max(shelf_no)
{
        if (curr_box_items_count > wdata[shelf_no].max)
        {
                wdata[shelf_no].max = curr_box_items_count;
                document.getElementById('max' + (shelf_no + 1)).innerHTML = curr_box_items_count;
        }
}

function calc_avg(shelf_no)
{
        var num = 0;
        for (var i = 0; i < wdata[shelf_no].arr.length; i++)
                num = num + parseInt(wdata[shelf_no].arr[i]);
        var avg = num / wdata[shelf_no].arr.length;
        avg = avg.toFixed(2);
        wdata[shelf_no].avg = avg;
        document.getElementById('avg' + (shelf_no + 1)).innerHTML = avg;
}

function push_data(shelf_no)
{
        wdata[shelf_no].arr.push(curr_box_items_count);
}

function push_obj(shelf_no)
{
        push_data(shelf_no); //push data to the datastructure
        calc_max(shelf_no); //calculate max 
        calc_avg(shelf_no); //calculate avg

        //console.log(wdata);
}

function pop_data(shelf_no)
{
        var tmp = wdata[shelf_no].arr.pop();
}

function pop_obj(shelf_no)
{
        pop_data(shelf_no); //pop data from the datastructure
        max(shelf_no); //calculate max after pop operation
        calc_avg(shelf_no); //calculate avg

        //console.log(wdata);
}

function drop(ev)
{
        ev.preventDefault();
        var data = ev.dataTransfer.getData("Text");
        if (data != 'boxb')
                return;
        var box = document.getElementById("boxb");
        box.draggable = false;
        box.style.cursor = 'default';
        box.style.visibility = "hidden";

        var shelf_no = ev.target.id - 1;
        if (wdata[shelf_no].arr.length <= 10)
        {
                push_obj(shelf_no); //push operation
                var shelf_top_id = "top" + (shelf_no + 1);

                var temp = document.getElementById(shelf_top_id);
                if (temp != null)
                {
                        temp.removeAttribute("id");
                        temp.draggable = false;
                }

                ev.target.innerHTML = ev.target.innerHTML + '<div class="boxi" ondragstart="drag(event)" draggable="true" id="' + shelf_top_id + '">' + curr_box_items_count + '</div>';

                document.getElementById("av" + (shelf_no + 1)).innerHTML = 10 - wdata[shelf_no].arr.length; //update status:total items


        }
        socket.emit('send', wdata); //emit the updated data to the server
}

function dropdelete(ev)
{
        ev.preventDefault();
        var str = ev.dataTransfer.getData("id");
        var shelf_no = str.slice(3, 4);
        shelf_no--;
        element = document.getElementById('top' + (shelf_no + 1));
        element.parentNode.removeChild(element);
        childDivs = document.getElementById(shelf_no + 1).getElementsByTagName('div');
        if (childDivs.length > 0)
        {
                var childDiv = childDivs[childDivs.length - 1];
                childDiv.setAttribute("id", "top" + (shelf_no + 1));
                childDiv.draggable = true;

        }
        pop_obj(shelf_no); //pop operation
        document.getElementById("av" + (shelf_no + 1)).innerHTML = 10 - wdata[shelf_no].arr.length; //update status:total items

        socket.emit('send', wdata); //emit the updated data to the server
}