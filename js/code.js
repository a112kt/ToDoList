var todoInput = document.getElementById("todoInput")
var btn = document.getElementById("btn")
var taskes = document.getElementById("taskes")
var loading = document.getElementById("loading")
var errorMess = document.getElementById("errorMess")

btn.addEventListener("click",function(){
    var task = {
        title : todoInput.value,
        apiKey :"66e3aa6560a208ee1fdd5494",

    }
        console.log(todoInput.value);
        addToDo(task)

})

async function addToDo(task){
      loading.style.display='block'
    var data = await fetch("https://todos.routemisr.com/api/v1/todos",{
        body:JSON.stringify(
           task
        ),
        method:"post",
        headers: {'content-type' : 'application/json'}
    })
    var result = await data.json()
    if(result.message=="success"){
        loading.style.display='none'
        getToDo()
        clear()

    }
   
}
async function deleteToDo(id){
    loading.style.display='block'
    var data = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method :"delete",
        body :JSON.stringify({
            todoId:id
        }),
        headers:{'content-type' : 'application/json'}
    })
    var result = await data.json()
    if(result.message=="success"){
        console.log(result);
         loading.style.display='none'
        getToDo()
        
    }
}
  
async function getToDo(){
    var data = await fetch("https://todos.routemisr.com/api/v1/todos/66e3aa6560a208ee1fdd5494")
    var result = await data.json()
    console.log(result)
    if(result.message=="success"){
        displayData(result.todos)
    

    }

}
getToDo()
function displayData(data){
   var box = "";
    for(var i=0 ; i < data.length ; i++){
        box+=`
         <div class="task  ${data[i].completed ? 'bg-danger' :'bg-white'} d-flex justify-content-between w-50 mx-auto  p-2 mt-5 border-1 rounded-2 ">
                <h3 class="m-0 p-0 ms-1 ${data[i].completed ? 'text-decoration-line-through' :""} " >${data[i].title}</h3>
                <div class="task-icon">
                    <i onclick="deleteToDo('${data[i]._id}')" class="fa-solid fa-trash p-2 fs-4 "></i>
                    <i onclick="completeToDo('${data[i]._id}')"  class=" ${data[i].completed ? 'd-none' :"fa-solid fa-check p-2 fs-4"} "></i>
                </div>

            </div>
        `
    }
    taskes.innerHTML = box;

}
function clear(){
    todoInput.value = ""

}

async function completeToDo(id){
    var data = await fetch("https://todos.routemisr.com/api/v1/todos",{
        method :"put",
        body :JSON.stringify({
            todoId:id
        }),
        headers:{'content-type' : 'application/json'}
    })
    var result = await data.json()
    if(result.message=="success"){
        console.log(result);
        getToDo()
        
    }
}
