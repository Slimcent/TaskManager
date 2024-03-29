import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks : Task[] = [];

  constructor(private taskService : TasksService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
    });
  }

  deleteTask(task : Task){
    this.taskService.deleteTask(task).subscribe(() => (this.tasks 
      = this.tasks.filter(t => t.id !== task.id)));
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTAskReminder(task).subscribe();
  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe((res) => (this.tasks.push(res)));
  }
}
