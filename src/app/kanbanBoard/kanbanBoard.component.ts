import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'task 0', stage: 0 },
      { name: 'task 1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  } 

  addTask=(task)=>{
    if (task.value==="")return;
    this.tasks.push({name:task.value,stage:0})
    task.value="";
    this.configureTasksForRendering()
  }

  next=(task,stage)=>{
    for(let i=0; i <this.tasks.length;i++){
      if(stage===3)return;
      if(task===this.tasks[i].name)this.tasks.splice(i,1,{name:task,stage:stage+1});
    }
    this.configureTasksForRendering()
  }

  back=(task,stage)=>{
    for(let i=0; i <this.tasks.length;i++){
      if(stage===0)return;
      if(task===this.tasks[i].name)this.tasks.splice(i,1,{name:task,stage:stage-1});
    }
    this.configureTasksForRendering()
  }

  delete=(task)=>{
    for(let i=0; i <this.tasks.length;i++){
      if(task===this.tasks[i].name) this.tasks.splice(i,1);
    }
    this.configureTasksForRendering()
  }
}

interface Task {
  name: string;
  stage: number;
}