let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
const { expect } = require('chai');
let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /POST route
*/

describe('/POST message', () => {
    it('it should return 200 when fields are correct', (done) => {
        let contactData = {
            email: "test@test.test.com",
            message: "Simple test message that has over 30 characters."
        }
        chai.request(app)
            .post('/api/contact')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');
                res.body.should.not.have.property('errors');
            done();
            });
    });
});

describe('/POST message', () => {
    it('it should return 422 when fields are incorrect', (done) => {
        let contactData = {
            email: "test@test.com",
            message: "Invalid message"
        }
        chai.request(app)
            .post('/api/contact')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.forEach(error => {
                    error.should.have.property('msg');
                });
            done();
            });
    });
});

describe('/POST message', () => {
    it('it should return 422 and email error when email is invalid', (done) => {
        let contactData = {
            email: "test@test",
            message: "Simple test message that has over 30 characters."
        }
        chai.request(app)
            .post('/api/contact')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.forEach(error => {
                    error.should.have.property('msg', 'Email field must be valid e-mail address.');
                });
            done();
            });
    });
});

describe('/POST message', () => {
    it('it should return 422 and message error when message is under 30 chars', (done) => {
        let contactData = {
            email: "test@test.com",
            message: "Invalid message"
        }
        chai.request(app)
            .post('/api/contact')
            .send(contactData)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.forEach(error => {
                    error.should.have.property('msg', 'Message field must be 30 characters long.');
                });
            done();
            });
    });
});

