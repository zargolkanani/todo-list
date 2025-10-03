const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('done')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, done=false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  if (done) li.classList.add('done');

  span.addEventListener('click', () => {
    li.classList.toggle('done');
    saveTasks();
  });

  const actions = document.createElement('div');
  actions.classList.add('actions');

  // دکمه ویرایش
  const editBtn = document.createElement('button');
  editBtn.innerHTML = "✏️";
  editBtn.classList.add('edit');
  editBtn.addEventListener('click', () => {
    const newText = prompt("ویرایش کار:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  });

  // دکمه حذف
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "❌";
  deleteBtn.classList.add('delete');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
  saveTasks();
}

addBtn.addEventListener('click', () => {
  if (taskInput.value.trim()) {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// بارگذاری اولیه
const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
saved.forEach(t => addTask(t.text, t.done));
