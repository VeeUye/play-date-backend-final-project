const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const { db } = require('../db');
const { Timestamp } = require('firebase-admin/firestore');
const DUMMY_DATA = require('./dummy-data');
 
 
const JSDOtoTimestamp = (d) => {
 return Timestamp.fromDate(new Date(d));
}

describe('GET events tests', () => {
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
   
  it('GET all events from db', async () => {
 
    const res = await request(app)
    .get('/events');
  
    const events = JSON.parse(res.text);
    expect(res.header["content-type"]).to.match(/json/);
    expect(events).to.have.lengthOf(4);
    expect(events[0].id).to.equal('Event1');
  })
});


describe('POST events tests', () => {
 
  const event1 = {
    date_start : "Sat Dec 10 2022 11:30:00 GMT+0100",
    date_end : "Sat Dec 10 2022 13:30:00 GMT+0100",
    friends_invited : ["userId2", "userId3", "userId4"],
    friends_confirmed : ["userId2", "userId3"],
    location : "Lancaster",
    description : "Event5",
    owner : "userId4"
  }
  
  it('POST a new event into the db', async () => {
    const res = await request(app)
    .post('/events')
    .send(event1);
  
    expect(res.status).to.equal(201);
    expect(res.text).to.equal('Record saved successfuly');
  });
  
});
 