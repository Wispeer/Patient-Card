import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit{
  today: Date = new Date();
  month= this.today.getMonth();
  year = this.today.getFullYear();
  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  daysInLastMonth: Date[] = [];
  daysInNextMonth: Date[] = [];
  daysFromLastMonth: number = 0;
  daysFromNextMonth: number = 0;
  missingDaysFromLastMonth: number = 0;
  missingDaysFromNextMonth: number = 0;
  firstDayOfMonth: Date = new Date();
  lastDayOfMonth: Date = new Date();
  lastDayOfLastMonth: Date = new Date();
  firstDayOfNextMonth: Date = new Date();
  firstDayOfLastMonth: Date = new Date();
  lastDayOfNextMonthInWeek: Date = new Date();
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private datePipe: DatePipe) {
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.formattedDate();
  }
  
  generateCalendar(): void {
    //debugger;
  
    this.firstDayOfMonth = new Date(this.year, this.month, 1);
    this.lastDayOfMonth = new Date(this.year, this.month + 1, 0);
    this.lastDayOfLastMonth = new Date(this.year, this.month, 0);
    this.firstDayOfNextMonth = new Date(this.year, this.month + 1, 1);
  
    this.daysFromLastMonth = this.firstDayOfMonth.getDay() === 0 ? 6 : this.firstDayOfMonth.getDay() - 1;
  
    this.firstDayOfLastMonth = new Date(this.lastDayOfLastMonth);
    this.firstDayOfLastMonth.setDate(this.lastDayOfMonth.getDate() - this.daysFromLastMonth +2);
  
    this.daysFromNextMonth = 6 - this.lastDayOfMonth.getDay();
    this.lastDayOfNextMonthInWeek = new Date(this.firstDayOfNextMonth);
    this.lastDayOfNextMonthInWeek.setDate(this.firstDayOfNextMonth.getDate() + this.daysFromNextMonth);
  
    this.daysInLastMonth = this.getDaysArray(this.firstDayOfLastMonth, this.lastDayOfLastMonth);
    this.daysInMonth = this.getDaysArray(this.firstDayOfMonth, this.lastDayOfMonth);
    this.daysInNextMonth = this.getDaysArray(this.firstDayOfNextMonth, this.lastDayOfNextMonthInWeek);
  }
  
  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'd MMM' + ' ' + 'ccc') || '';
  }
  
  formattedDate() {
    const day = this.datePipe.transform(Date.now(), 'EEE');
    const month = this.datePipe.transform(Date.now(), 'MMMM');
    
    console.log('actual day is ', day); 
    console.log('actual month is ', month);
  }
  
  getCalendarWeeks(): Date[][] {
    const weeks: Date[][] = [];
    const daysInMonthCopy = [...this.daysInLastMonth, ...this.daysInMonth, ...this.daysInNextMonth]; 
    
    while (daysInMonthCopy.length > 0) {
      weeks.push(daysInMonthCopy.splice(0, 7)); 
    }
    
    return weeks;
  }
  
  private getDaysArray(start: Date, end: Date): Date[] {
    const daysArray: Date[] = [];
    const currentDay = new Date(start);
    
    while (currentDay <= end) {
      daysArray.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return daysArray;
  }
  
  nextMonth() {
    this.month ++;
  }
  
  previousMonth(){
    this.month --;
  }

  nextYear(){
    this.year ++;
  }

  previousYear(){
    this.year --;
  }
    
}