const API_URL_PREFIX = 'https://q2v6nxcgv4.execute-api.ap-northeast-1.amazonaws.com'

const taskTitleInputElement = document.getElementById('task-title-input');
const taskAddbuttonElement = document.getElementById('task-add-button');
const taskListElement = document.getElementById('task-list');

async function loadTasks() {
    const response = await fetch(API_URL_PREFIX + '/tasks')
    const responseBody = await response.json()
  
    const tasks = responseBody.tasks
  
    while (taskListElement.firstChild) {
      taskListElement.removeChild(taskListElement.firstChild)
    }
  
    tasks.forEach((task) => {
      const liElement = document.createElement('li')
      liElement.innerText = task.title
  
      taskListElement.appendChild(liElement)
  })
  

}

const registerTask = async () => {
    const title = taskTitleInputElement.value;
    
    const requestBody = { title, }
    
    await fetch(API_URL_PREFIX + '/tasks', {
        method: 'POST',
        body: JSON.stringify(requestBody)
    })
    
    await loadTasks();
}

async function main(){
    taskAddbuttonElement.addEventListener('click', registerTask);
    await loadTasks();
}

main();