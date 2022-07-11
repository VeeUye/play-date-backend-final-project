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
