const DUMMY_DATA = [
  {
    name : "Event number 1",
    date_start : "Sat Sep 10 2022 11:30:00 GMT+0100",
    date_end : "Sat Sep 10 2022 13:30:00 GMT+0100",
    friends_invited : ["userId4"],
    friends_accepted : ["userId1","userId2", "userId3"],
    location : "Manchester",
    description : "Event1",
    owner : "userId1"
  },
  {
    name : "Event number 2",
    date_start : "Thu Aug 11 2022 17:30:00 GMT+0100",
    date_end : "Thu Aug 11 2022 17:30:00 GMT+0100",
    friends_invited : ["userId1"],
    friends_accepted : ["userId2", "userId4"],
    friends_declined : ["userId3"],
    location : "Manchester",
    description : "Event2",
    owner : "userId2"
  },
  {
    name : "Event number 3",
    date_start : "Sat Aug 13 2022 09:15:00 GMT+0100",
    date_end : "Sat Aug 13 2022 11:45:00 GMT+0100",
    friends_invited : ["userId3", "userId5"],
    friends_accepted : ["userId1"],
    location : "Liverpool",
    description : "Event3",
    owner : "userId1"
  },
  {
    name : "Event number 4",
    date_start : "Tue Aug 09 2022 09:15:00 GMT+0100",
    date_end : "Tue Aug 09 2022 13:30:00 GMT+0100",
    friends_invited : ["userId6", "userId5"],
    friends_accepted : ["userId4","userId2"],
    friends_declined : ["userId1"],
    location : "Leeds",
    description : "Event4",
    owner : "userId4"
  }
 ];
 
 module.exports = DUMMY_DATA;
 