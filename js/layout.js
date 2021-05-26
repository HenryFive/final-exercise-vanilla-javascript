`use strict`;

window.onload = function(){
    createTxt.value = '';
}

const createBtn = document.getElementById("create-btn"),
    createTxt = document.getElementById('create-txt');
    readAllNav = document.querySelector('.todo__read--all');
    readActiveNav = document.querySelector('.todo__read--active');
    readCompletedNav = document.querySelector('.todo__read--completed');
    
    

let todoList = document.querySelector('.todo__list ol'),
    todoLists = [];

showAll();

function showAll(){
    if(JSON.parse(localStorage.getItem('todolist'))){
        todoLists = JSON.parse(localStorage.getItem('todolist'));

        let index = 0;
        todoLists.forEach(element => {
            let li = document.createElement('li');
            li.innerHTML = `
            <div class="round-checkbox">
                <input type="checkbox" id="checkbox${index}" ${element.status === 'completed' ? 'checked' : ''}/>
                <label for="checkbox${index}" class='round-checkbox--label'></label>
            </div>
            <input type="text" value="${element.value}" disabled>
            <button id="edit" class="todo__list__edit">Edit</button>
            <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
            todoList.appendChild(li);

            index++;
        });
        console.log(todoLists);
        document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
    }
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
        <input type="checkbox" id="checkbox${todoLists.length}" />
        <label for="checkbox${todoLists.length}" class='round-checkbox--label'></label>
    </div>
    <input type="text" value="${createTxt.value}" disabled>
    <button id="edit" class="todo__list__edit">Edit</button>
    <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
    
    if(createTxt.value === '')
        createTxt.classList.add('create-txt--invalid');
    else{
        todoList.appendChild(li);
        // todoLists.push(createTxt.value);
        todoLists.push({
            'status': 'active',
            'value': createTxt.value
        });
        localStorage.setItem('todolist', JSON.stringify(todoLists));
        createTxt.value = '';

        document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
    }
})

function countActive(){
    let index = 0;
    todoLists.forEach(element => {
        if(element.status == "active"){
        index++;
        }
    });
    return index;
}

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
        document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
    }else if(hasClass(e.target, 'round-checkbox--label')){
        let that = e.target;
        let nodeIndex = liElem => [...liElem.parentNode.children].indexOf(liElem);
        let inputVal = todoLists[nodeIndex(that.parentNode.parentNode)].value;

        setTimeout(function(){
            if(that.previousElementSibling.checked === true){
                todoLists[nodeIndex(that.parentNode.parentNode)] = {
                    'status': 'completed',
                    'value': inputVal
                }
            }else{
                todoLists[nodeIndex(that.parentNode.parentNode)] = {
                    'status': 'active',
                    'value': inputVal
                }
            }
            document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
            localStorage.setItem('todolist', JSON.stringify(todoLists));
        }, 200)
    }else if(hasClass(e.target, 'todo__dark-mode')){
        that = e.target;
        bool = !(localStorage.darkMode === 'true' ? true : false);
        localStorage.setItem('darkMode', bool);
        this.body.classList.toggle('dark-mode');
        ['fa-moon', 'fa-sun'].map(v=> that.classList.toggle(v) )

    }
});

bool = localStorage.darkMode === 'true' ? true : false;
if(bool){
    document.body.classList.toggle('dark-mode');
    ['fa-moon', 'fa-sun'].map(v=> document.querySelector('.todo__dark-mode').classList.toggle(v) )
}

readAllNav.addEventListener('click', function(){
    todoList.innerHTML="";
    showAll();
    readAllNav.classList.add('selected');
    readActiveNav.classList.remove('selected');
    readCompletedNav.classList.remove('selected');
});

readActiveNav.addEventListener('click',function(){
    readAllNav.classList.remove('selected');
    readActiveNav.classList.add('selected');
    readCompletedNav.classList.remove('selected');

    if(JSON.parse(localStorage.getItem('todolist'))){
        todoList.innerHTML="";

        todoLists = JSON.parse(localStorage.getItem('todolist'));

        let index = 0;
        todoLists.forEach(element => {
            if(element.status == "completed"){
                let li = document.createElement('li');
            li.innerHTML = `
            <div class="round-checkbox">
                <input type="checkbox" id="checkbox${index}" ${element.status === 'completed' ? 'checked' : ''}/>
                <label for="checkbox${index}" class='round-checkbox--label'></label>
            </div>
            <input type="text" value="${element.value}" disabled>
            <button id="edit" class="todo__list__edit">Edit</button>
            <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
            todoList.appendChild(li);


            }
            index++;
        });

        document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
    }
});


readCompletedNav.addEventListener('click',function(){
    readAllNav.classList.remove('selected');
    readActiveNav.classList.remove('selected');
    readCompletedNav.classList.add('selected');

    if(JSON.parse(localStorage.getItem('todolist'))){
        todoList.innerHTML="";

        todoLists = JSON.parse(localStorage.getItem('todolist'));

        let index = 0;
        todoLists.forEach(element => {
            if(element.status == "active"){
                let li = document.createElement('li');
            li.innerHTML = `
            <div class="round-checkbox">
                <input type="checkbox" id="checkbox${index}" ${element.status === 'completed' ? 'checked' : ''}/>
                <label for="checkbox${index}" class='round-checkbox--label'></label>
            </div>
            <input type="text" value="${element.value}" disabled>
            <button id="edit" class="todo__list__edit">Edit</button>
            <button id="delete" class="todo__list__delete"><i class="far fa-trash-alt"></i></button>`;
            todoList.appendChild(li);


            }
            index++;
        });

        document.querySelector('.todo__list__footer--items-left').textContent = `${countActive()} items left`;
    }
});