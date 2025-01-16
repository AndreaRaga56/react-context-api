import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ChiSiamo from "./pages/ChiSiamo";
import Form from "./pages/Form"
import Posts from "./pages/Posts"
import NotFound from "./pages/NotFound";
import SinglePage from "./pages/SinglePage";
import GlobalContext from "./context/GlobalContext";


function App() {
    let apiUrl = "http://localhost:3333"
    let [listaPosts, setListaPosts] = useState([])
    const getPosts = () => {
        axios.get(`${apiUrl}/posts`).then((resp) => {
            setListaPosts(resp.data.blogPosts);
        });
    };

    const globalProviderValue = {
        listaPosts,
        getPosts
    }
    return (
        <>
            <GlobalContext.Provider value={globalProviderValue}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/AboutUs" element={<ChiSiamo />} />
                            <Route path="/Posts">
                                <Route index element={<Posts />} />
                                <Route path=":id" element={<SinglePage />} />
                            </Route>
                            <Route path="/Form" element={<Form />} />
                            <Route path="/not-found" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter >
            </GlobalContext.Provider>
        </>

    )
}

export default App