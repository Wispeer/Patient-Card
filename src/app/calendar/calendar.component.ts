import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PatientEventOrder, PatientEventOrderModel } from '../store/patient-event-order.state';
import { Store } from '@ngxs/store';
@Injectable()
@Input()

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit{

  @Output() monthChange = new EventEmitter<number>();

  patientEventOrder$: Observable<PatientEventOrder>;
  patientEventOrder: PatientEventOrder | any;
  patientCalendarEventOrder: PatientEventOrder[] | undefined | null;

  today: Date = new Date();
  month: number = 0;
  year: number = 0;
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
  patientEventOrderCalendarDate: string | null | undefined ;
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private datePipe: DatePipe,private store: Store) {
    this.patientEventOrder$ = this.store.select(state => state.patientEventOrder.orders);
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.month= this.today.getMonth() + 1;
    this.year = this.today.getFullYear();

    this.patientEventOrder$.subscribe(state => {
      this.patientEventOrder = state;
      console.log('onInit setted up state', state);
      console.log('onInit setted up this.patientEventOrder', this.patientEventOrder);
      console.log('this.patientEventOrder[1].date', this.patientEventOrder[1]?.date);
      console.log('today is', this.today.getDay());
    });

    console.log('onInit setted up month and year', this.month, ' ', this.year);

    this.formattedDate();
    this.generateCalendar();
  }
  
  generateCalendar(): void {
    //debugger;
    this.firstDayOfMonth = new Date(this.year, this.month - 1, 1);
    this.lastDayOfMonth = new Date(this.year, this.month, 0);
  
    // Find the first Monday of the current month
    let firstMonday = new Date(this.firstDayOfMonth);
    firstMonday.setDate(1 - (this.firstDayOfMonth.getDay() + 6) % 7);
  
    // Find the last Sunday of the current month
    let lastSunday = new Date(this.lastDayOfMonth);
    lastSunday.setDate(this.lastDayOfMonth.getDate() + (7 - this.lastDayOfMonth.getDay()));
  
    this.daysInMonth = this.getDaysArray(firstMonday, lastSunday);
    console.log('onInit setted up this.patientEventOrder', this.patientEventOrder);
  }
  
  ensureMondayStart(): void {
    const daysToShift = (this.firstDayOfMonth.getDay() + 6) % 7;
  
    // Shift days to ensure weeks consistently start with Monday
    this.daysInLastMonth = this.getDaysArray(new Date(this.firstDayOfLastMonth), this.lastDayOfLastMonth).slice(-daysToShift);
    this.daysInMonth = this.getDaysArray(new Date(this.firstDayOfMonth), this.lastDayOfMonth);
    this.daysInNextMonth = this.getDaysArray(new Date(this.firstDayOfNextMonth), this.lastDayOfNextMonthInWeek).slice(0, 7 - this.daysInMonth.length);
  }
  
  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'd MMM' + ' ' + 'ccc') || '';
  }
  
  formattedDate() {
    const day = this.datePipe.transform(Date.now(), 'EEE');
    const month = this.datePipe.transform(this.month, 'MMMM');
    
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
    //debugger;
    console.log('month is actually set to : ' , this.month, '   ', this.year)

    if (this.month == 12){
      this.month = 1;
      this.year = this.year + 1;
    }
    else this.month = this.month + 1;
    console.log('month is actually set to : ' , this.month, '   ', this.year)
    this.generateCalendar();
  }
  
  previousMonth(){
    //debugger;
    console.log('month is actually set to : ' , this.month, '   ', this.year)
    
    if (this.month == 1){
      this.month = 12;
      this.year = this.year - 1;
    }
    else this.month = this.month - 1;

    console.log('month is actually set to : ' , this.month, '   ', this.year)
    this.generateCalendar();
  }

  nextYear(){
    this.year = this.year + 1;
    console.log('month is actually set to : ' , this.month, '   ', this.year)
  }

  previousYear(){
    this.year = this.year - 1;
    console.log('month is actually set to : ' , this.month, '   ', this.year)
  }
    
  assignEventToCalendar(day: Date) {
    this.patientCalendarEventOrder = [];
    this.patientEventOrderCalendarDate = this.datePipe.transform(day, 'yyyy-MM-dd');

    for (let index = 0; index < this.patientEventOrder.length ; index++) {
      if (this.patientEventOrder[index].date == this.patientEventOrderCalendarDate) {
        //console.log('this.patientEventOrder[index].serviceCategoryType = ', this.patientEventOrder[index]);
        this.patientCalendarEventOrder.push(this.patientEventOrder[index]);
      }
    }
    console.log('calendarEvents = ', this.patientCalendarEventOrder);
    return this.patientCalendarEventOrder.values();
  }
}