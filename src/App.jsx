
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import userStore from "./utils/userStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import RequestReceived from "./components/RequestReceived";

function App() {
  return (
    <>
    <Provider store={userStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/user/connections" element={<Connections/>}/>
        <Route path="/user/requests/received" element={<RequestReceived/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
