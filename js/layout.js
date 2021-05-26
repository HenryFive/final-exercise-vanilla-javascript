`use strict`;

window.onload = function(){
    createTxt.value = '';
}

const createBtn = document.getElementById("create-btn"),
    createTxt = document.getElementById('create-txt');

let todoList = document.querySelector('.todo__list ol'),
    todoLists = [];

if(JSON.parse(localStorage.getItem('todolist'))){
    todoLists = JSON.parse(localStorage.getItem('todolist'));

    todoLists.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = `
        <div class="round-checkbox">
            <input type="checkbox" id="checkbox" />
            <label for="checkbox"></label>
        </div>
        <input type="text" value="${element}" disabled>
        <button id="edit" class="todo__list__edit">Edit</button>
        <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
        todoList.appendChild(li);
    });

    document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
}

createBtn.addEventListener("mouseover", function(){
    this.textContent = "+"
});

createBtn.addEventListener("mouseout", function(){
    this.textContent = ""
});

createBtn.addEventListener('click', function(e){
    e.preventDefault();

    let li = document.createElement('li');
    li.innerHTML = `
    <div class="round-checkbox">
        <input type="checkbox" id="checkbox" />
        <label for="checkbox"></label>
    </div>
    <input type="text" value="${createTxt.value}" disabled>
    <button id="edit" class="todo__list__edit">Edit</button>
    <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
    
    if(createTxt.value === '')
        createTxt.classList.add('create-txt--invalid');
    else{
        todoList.appendChild(li);
        todoLists.push(createTxt.value);
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        createTxt.value = '';
        document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
    }
})

createTxt.addEventListener('keyup', function(e){
    if(this.value !== '')
        createTxt.classList.remove('create-txt--invalid');

    if (e.keyCode === 13 || e.key === 'Enter') 
        createTxt.value = '';
})

function hasClass(elem, className){
    return elem.className.split(' ').indexOf(className) > -1;
}

document.addEventListener('click', function(e){
    if(hasClass(e.target, 'todo__list__delete')){
        e.preventDefault();

        let nodeIndex = liElem => [...liElem.parentNode.children].indexOf(liElem);
        
        todoLists.splice(nodeIndex(e.target.parentNode), 1);
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        e.target.parentNode.remove();
        document.querySelector('.todo__list__footer--items-left').textContent = `${todoLists.length} items left`;
    }
});