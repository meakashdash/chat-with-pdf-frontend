import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./components/Home";
import { useRecoilState } from "recoil";
import { storeContext } from "./context/storeContext.js";
import { selectContext } from "./context/selectContext.js";
import { useEffect } from "react";
import { showModalContext } from "./context/modalContext.js";
import axios from "axios";
import { baseUrl } from "./Url.js";

function App() {
  const [store, setStore] = useRecoilState(storeContext);
  const [selectedContext, setSelectedContext] = useRecoilState(selectContext);
  const [showModal, setShowModal] = useRecoilState(showModalContext);
  useEffect(() => {
    getAllContexts();
  }, [showModal]);
  const getAllContexts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/context`);
      const contexts = response.data.contexts;
      setStore(contexts);
      if (contexts && contexts.length > 0) {
        setSelectedContext(contexts[0]._id);
      }
      console.log("selectedContext : ", selectedContext);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
  console.log("selectedContext : ", selectedContext);
  return (
    <div
      className="App"
      style={{ display: "flex", height: "100vh", backgroundColor: "#212121" }}
    >
      <LeftSidebar />
      <Home />
      <RightSidebar contexts={store} />
    </div>
  );
}

export default App;
