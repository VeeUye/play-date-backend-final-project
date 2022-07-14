const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const { db } = require('../db');
const { Timestamp } = require('firebase-admin/firestore');
const DUMMY_DATA = require('./dummy-data');
 
 
const JSDOtoTimestamp = (d) => {
  const dbDate = Timestamp.fromDate(new Date(d))
 return dbDate;
}

describe('events get testing', () => {
  
  before('test data into db', async () => {
    let data = DUMMY_DATA;
    const batch = db.batch();
    data.forEach((item, i) => {
      item.date_start = JSDOtoTimestamp(item.date_start);
      item.date_end = JSDOtoTimestamp(item.date_end);
      const itemRef = db.collection('events').doc(`Event${i + 1}`);
      batch.set(itemRef, item);
    });
    await batch.commit();
  });

  describe('GET events tests', () => {

    it('GET all events from db', async () => {
      const res = await request(app)
      .get('/events');
    
      const events = JSON.parse(res.text);
      expect(res.header["content-type"]).to.match(/json/);
      expect(events).to.have.lengthOf(4);
      expect(events[0].id).to.equal('Event1');
    });

    it('GET events user has accepted', async () => {
      const userId = 'userId1';
      const res = await request(app)
      .get(`/events/user-events/${userId}`);

      const events = JSON.parse(res.text);
      expect(events).to.have.lengthOf(2);
      expect(events[0].description).to.equal('Event3');
      expect(events[1].description).to.equal('Event1');
      })

    it('GET pending events for user', async () =>{
      const userId = 'userId1';
      const res = await request(app)
      .get(`/events/user-events/${userId}/pending`)

      const events = JSON.parse(res.text);
      expect(events).to.have.lengthOf(1);
      expect(events[0].description).to.equal('Event2');
    });

    it('GET events user has declined', async () =>{
      const userId = 'userId1';
      const res = await request(app)
      .get(`/events/user-events/${userId}/declined`)

      const events = JSON.parse(res.text);
      expect(events).to.have.lengthOf(1);
      expect(events[0].description).to.equal('Event4');
    });
  });
  
});

describe('POST events tests', () => {
   
  const event5 = {
    name : "Event number 5",
    date_start : "Sat Dec 10 2022 11:30:00 GMT+0100",
    date_end : "Sat Dec 10 2022 13:30:00 GMT+0100",
    friends_invited : ["userId2", "userId3", "userId4"],
    location : "Lancaster",
    description : "Event5",
    owner : "userId4"
  }
  
  it('POST a new event into the db', async () => {
    const res = await request(app)
    .post('/events')
    .send(event5);
  
    expect(res.status).to.equal(201);
    expect(res.text).to.equal('Record saved successfuly');
  });

});

  
describe('accept/decline events', () => {

  it('PUT userId4 to accept invite', async () => {
    const res = await request(app)
    .put('/events/user-events/accept')
    .send({"eventId":"Event3","userId":"userId3"});
  
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Success - invite accepted');
  });
  
  it('PUT userId5 to decline invite', async () => {
    const res = await request(app)
    .put('/events/user-events/decline')
    .send({"eventId":"Event3","userId":"userId5"});
  
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('Success - invite declined');
  });
});





 