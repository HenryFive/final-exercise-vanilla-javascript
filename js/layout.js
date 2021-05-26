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

    todoLists.forEach(function(value, i) {
        let li = document.createElement('li');
        console.log(i);
        li.innerHTML = `
        <div class="round-checkbox`+i+`">
            <input type="checkbox" id="checkbox" />
            <label for="checkbox"></label>
        </div>
        <input type="text" value="${value}" disabled>
        <button id="edit" class="todo__list__edit">Edit</button>
        <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;

        let sheet = document.createElement('style')
        sheet.insertRule = ('.round-checkbox'+i+'{position: relative;}',i);
        sheet.addRule = ('.round-checkbox'+i+' label {background-color: #fff; border: 1px solid #ccc; border-radius: 50%; cursor: pointer; height: 20px; left: 0; position: absolute; top: 0; width: 20px;}',i);
        sheet.addRule = ('.round-checkbox'+i+' label:after { border: 1px solid #fff; border-top: none; border-right: none; content: ""; height: 3px; left: 5px; opacity: 0; position: absolute; top: 7px; transform: rotate(-45deg); width: 9px; }',i);
        sheet.addRule = ('.round-checkbox'+i+' { visibility: hidden; }',i);
        sheet.addRule = ('.round-checkbox'+i+':checked + label { background-color: rgb(18, 160, 216); border-color: rgb(18, 160, 216); }',i);
        sheet.addRule = ('.round-checkbox'+i+':checked + label:after { opacity: 1; }',i);

        document.body.appendChild(sheet);
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