import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import HistoryMessage from "../icons/HistoryMessage.js";
import { showModalContext } from "../context/modalContext.js";
import { useRecoilState } from "recoil";
import { storeContext,choosenContext } from "../context/storeContext.js";
import axios from "axios";
import { baseUrl } from "../Url.js";
import { selectContext } from "../context/selectContext.js";

const LeftSidebar = () => {
  const [showModal, setShowModal] = useRecoilState(showModalContext);
  const [store, setStore] = useRecoilState(storeContext);
  const [selectedContext, setSelectedContext] = useRecoilState(selectContext);
  const [choose,setChoose]=useRecoilState(choosenContext);

  useEffect(() => {
    getContextById();
  }, [selectedContext]);

  const getContextById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/context/${selectedContext}`);
      const context=response.data.context;
      setChoose(context)
    } catch (error) {
      console.log("Error while getting context by id", error.message);
      throw error;
    }
  };

  const handleShowModal = async () => {
    setShowModal(true);
  };

  const handleSelectContext = (contextId) => {
    setSelectedContext(contextId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "270px",
        padding: "20px",
        height: "100vh",
        backgroundColor: "#171717",
        borderRight: "1px solid #171717",
        borderRadius: "5px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <button
        className="btn btn-sm d-flex justify-content-center align-items-center px-3 py-2 rounded mb-5 text-white ms-5"
        type="submit"
        onClick={handleShowModal}
        style={{
          cursor: "pointer",
          backgroundColor: "#2f2f2f",
          border: "none",
          width: "150px",
        }}
      >
        <span style={{ marginRight: "5px", marginBottom: "1px" }}>
          <IoAddCircle />
        </span>
        <span style={{ color: "#ececec" }}>New Context</span>
      </button>
      <p
        className="fw-light"
        style={{ color: "#ececec", fontSize: "13px", marginLeft: "70px" }}
      >
        All Contexts
      </p>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          flexGrow: 1,
          overflowY: "auto",
          width: "100%",
        }}
      >
        {store.map((context, index) => (
          <li
            key={index}
            className="d-flex align-items-center"
            onClick={() => handleSelectContext(context._id)}
            style={{
              padding: "5px 15px",
              marginBottom: "7px",
              cursor: "pointer",
              color: "#ececec",
              fontSize: "13px",
              width: "100%",
              backgroundColor:
                selectedContext === context._id ? "#3a3a3a" : "transparent",
              borderRadius: "10px",
            }}
          >
            <span style={{ flexShrink: 0, marginRight: "8px" }}>
              <HistoryMessage />
            </span>
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flexGrow: 1,
              }}
            >
              {context.contextName}
            </span>
          </li>
        ))}
      </ul>
      <div
        style={{
          padding: "10px 0",
          borderTop: "1px solid #444654",
          marginTop: "10px",
        }}
      >
        <div className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            style={{
              borderRadius: "50%",
              marginRight: "90px",
              marginLeft: "10px",
            }}
          />
          <div>
            <p style={{ color: "#fafafa", margin: 0 }}>John Doe</p>
            <p style={{ color: "#9a9a9b", margin: 0, fontSize: "12px" }}>
              View Profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
