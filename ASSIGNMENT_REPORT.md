# CampusConnect – MSRUAS Exclusive Random Chat and Video Calling Platform

## 1. Title
CampusConnect: A college-exclusive random text and video chat platform for verified students of Ramaiah University of Applied Sciences (MSRUAS).

## 2. Problem Statement
Students may want to meet classmates outside their immediate friend groups, discuss academic interests and make new campus connections. General random-chat platforms connect users with unknown members of the public and may not provide a college-specific environment. CampusConnect is designed as a student-focused platform where users register with an MSRUAS email address and are paired with another available verified account for text or video conversations.

## 3. Objectives
- Develop a browser-based platform for MSRUAS student registration and login.
- Restrict registration to email addresses using the @msruas.ac.in domain.
- Verify email ownership using a one-time password (OTP).
- Match two available students randomly.
- Support real-time text messaging using Socket.IO.
- Support peer-to-peer audio/video calls using WebRTC.
- Provide next, leave and report controls.
- Create a responsive interface for desktop and mobile browsers.

## 4. Stakeholders
| Stakeholder | Role | Needs from the system |
|---|---|---|
| MSRUAS students | Register and use random chat | Simple, private student-to-student communication |
| University / department | Academic context and oversight | Responsible use and appropriate safeguards |
| Project developer | Builds and maintains application | Maintainable code and testable features |
| Hosting provider | Hosts web application | Stable server and secure deployment |
| Email service provider | Delivers verification OTP | Reliable email delivery |

## 5. Functional Requirements
| ID | Requirement | Verified by |
|---|---|---|
| FR1 | Users can register with name, password and @msruas.ac.in email | TC1 |
| FR2 | System validates the email domain and rejects other domains | TC2 |
| FR3 | System verifies email ownership using a six-digit OTP | TC3 |
| FR4 | Verified users can log in and log out | TC4 |
| FR5 | Users can join a random matching queue | TC5 |
| FR6 | Two waiting users are paired for a conversation | TC6 |
| FR7 | Matched users can exchange real-time text messages | TC7 |
| FR8 | Matched users can establish a video call with camera/microphone permission | TC8 |
| FR9 | Users can skip or leave a conversation | TC9 |
| FR10 | Users can submit a report about a conversation partner | TC10 |

## 6. Non-Functional Requirements
| ID | Requirement | Evidence |
|---|---|---|
| NFR1 | Usability: registration and chat controls should be clear | Interface walkthrough |
| NFR2 | Compatibility: website should adapt to desktop and mobile screens | Responsive CSS |
| NFR3 | Security: passwords are stored as hashes and sessions are protected by a secret key | Code inspection |
| NFR4 | Privacy: camera and microphone are requested only after the user starts video chat | Browser permission flow |
| NFR5 | Reliability: users should be notified when a partner leaves | Socket.IO event |
| NFR6 | Maintainability: routes, templates and static assets are separated | Project structure |
| NFR7 | Portability: application runs in a modern browser and Python hosting environment | Deployment demonstration |

## 7. Implementation Screenshots
Insert genuine screenshots after running the application:
- Figure 1 – CampusConnect home page.
- Figure 2 – Student registration page.
- Figure 3 – Email OTP verification page.
- Figure 4 – Random matching and chat page.
- Figure 5 – Video calling interface.
- Figure 6 – Report confirmation.

## 8. Source Code
The implementation is provided in the attached CampusConnect project folder:
- `app.py` – Flask routes, database models, authentication and Socket.IO matching.
- `templates/` – Home, registration, verification, login and chat pages.
- `static/style.css` – Responsive user interface.
- `static/chat.js` – WebRTC setup, signaling and chat interactions.
- `requirements.txt` – Python dependencies.

## 9. Test Cases with Test Results
| Test Case | Test description | Expected output | Actual output / result |
|---|---|---|---|
| TC1 | Register with college-domain email | Registration proceeds to OTP verification | To be tested |
| TC2 | Register with non-college email | Registration is rejected | To be tested |
| TC3 | Enter valid OTP | Account is verified | To be tested |
| TC4 | Log in with valid credentials | User reaches home page | To be tested |
| TC5 | Join random queue | User sees searching status | To be tested |
| TC6 | Two users join queue | Both users receive a match | To be tested |
| TC7 | Send text message | Other user receives message | To be tested |
| TC8 | Allow camera and microphone | Peer video call is established where network permits | To be tested |
| TC9 | Leave or skip chat | Partner receives leave notification | To be tested |
| TC10 | Submit report | Report is saved in database | To be tested |

## 10. Operations, Maintenance, Evaluation and Conclusion

### 10.1 Operations and Maintenance
The application is operated through a Python Flask server. SQLite stores student accounts and reports in the academic prototype. Socket.IO handles real-time matching and messages, while WebRTC carries audio/video media between browsers. Email verification requires SMTP configuration. The project should be backed up regularly and dependencies should be updated.

### 10.2 Evaluation against the criteria
| Criterion | Evidence | Assessment |
|---|---|---|
| Functionality | Registration, login, queue, chat and report features are implemented in the prototype | To be demonstrated |
| Performance | Matching uses an in-memory queue on one server process | Suitable for small demo |
| Usability | Clear registration and chat controls | To be evaluated |
| Reliability | Partner-left notification and database persistence | To be tested |
| Security | Password hashing and email OTP flow | Prototype; further hardening required |
| Correctness | Functional test cases defined | Results must be recorded after testing |

### 10.3 Limitations
The prototype uses a single-process in-memory matching queue. Production deployment requires shared queue storage such as Redis. WebRTC may require a TURN server on restrictive networks. Demo mode displays OTP on the verification page and must be disabled before public deployment. An email-domain check alone does not prove current enrollment. The report feature stores reports but does not yet include an administrator moderation dashboard.

### 10.4 Conclusion
CampusConnect demonstrates a college-focused random communication platform for MSRUAS students. It combines email-domain registration, OTP verification, random matching, real-time text messaging and browser-based video calling. The project provides a foundation for connecting students beyond their immediate circles. Before real-world use, the system requires stronger student-status verification, moderation tools, production database and queue services, HTTPS, TURN support, privacy safeguards and comprehensive testing.

## References
1. Flask documentation: https://flask.palletsprojects.com/
2. Flask-SocketIO documentation: https://flask-socketio.readthedocs.io/
3. MDN WebRTC API: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
4. Socket.IO documentation: https://socket.io/docs/v4/
5. SQLAlchemy documentation: https://docs.sqlalchemy.org/
