function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map((employeeArray) =>
    createEmployeeRecord(employeeArray)
  );
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  };

  employeeRecord.timeInEvents.push(timeInEvent);

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  };

  employeeRecord.timeOutEvents.push(timeOutEvent);

  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (!timeInEvent || !timeOutEvent) return null;

  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour; 
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((sum, date) => {
      return sum + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  

  
  