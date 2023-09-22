import React from 'react';
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import Market from "./market/pages/Market";
import Connect from "./components/Connect";
import CreateAIProject from "./launch/pages/CreateAIProject";
import CreateAINFTProjectNFT from './launch/pages/CreateAIProjectNFT';
import MarketAIProjectDetail from "./market/pages/AIProjectDetail";
import ListProjects from './launch/pages/ListProjects';
import ProjectDetails from './launch/pages/ProjectDetails';
import Profile from './profile/pages/profile';
import Home from "./market/pages/Home";
import LandingPage from "./market/pages/LandingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>
    },
    {
        path: "/market",
        element: <Market/>
    },
    {
        path: "/market/project/detail/:id",
        element: <MarketAIProjectDetail/>
    },
    {
        path: "/connect",
        element: <Connect/>
    },
    {
        path: "/profile",
        element: <Profile/>
    }, {
        path: "/projects",
        element: <ListProjects/>
    }, {
        path: "/project/create",
        element: <CreateAIProject/>
    }, {
        path: "/project/detail/:id",
        element: <ProjectDetails/>
    },
    {
        path: "/project/create/nft",
        element: <CreateAINFTProjectNFT/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
