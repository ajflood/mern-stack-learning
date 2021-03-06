import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import axios from "axios"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import CreateStudent from './components/create-student.component'
import EditStudent from './components/edit-student.component'
import StudentList from './components/student-list.component'

import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import Home from "./components/Home"

import UserList from './components/user-list.component'
import EditUser from './components/edit-user.component'

import RoomList from './components/room-list.component'
import CreateRoom from './components/create-room.component'
import EditRoom from './components/edit-room.component'


function App(async) {
  const isLoggedIn = localStorage.getItem("token")
  
  const [user, setUser] = useState(null)

  const getUser = async () => {
    const res = await axios.get(
      "http://localhost:4000/users", 
      {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setUser(res.data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/'} className="nav-link"> OLL SMC </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                {!isLoggedIn && ( <Nav> <Link to={'/login'} className="nav-link"> Login </Link> </Nav>)}
                {isLoggedIn && user && ["Admin"].includes(user.type) && ( <Nav> <Link to={'/user-list'} className="nav-link"> Users </Link> </Nav> )}
                {isLoggedIn && user && ["Admin"].includes(user.type) && ( <Nav> <Link to={'/room-list'} className="nav-link"> Rooms </Link> </Nav> )}
                {isLoggedIn && ( <Nav> <Link to={'/logout'} className="nav-link"> Logout </Link> </Nav>)}
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/logout" component={Logout} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/"
                    component={(props) => <Home {...props} />}
                  />
                  
                  <Route
                    exact
                    path="/create-student"
                    component={(props) => <CreateStudent {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-student/:id"
                    component={(props) => <EditStudent {...props} />}
                  />
                  <Route
                    exact
                    path="/student-list"
                    component={(props) => <StudentList {...props} />}
                  />
                  
                  <Route
                    exact
                    path="/user-list"
                    component={(props) => <UserList {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-user/:id"
                    component={(props) => <EditUser {...props} />}
                  />
                  
                  <Route
                    exact
                    path="/room-list"
                    component={(props) => <RoomList {...props} />}
                  />
                  <Route
                    exact
                    path="/create-room"
                    component={(props) => <CreateRoom {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-room/:id"
                    component={(props) => <EditRoom {...props} />}
                  />

                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}

export default App
