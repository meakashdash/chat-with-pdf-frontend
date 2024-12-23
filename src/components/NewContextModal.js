import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { showModalContext } from "../context/modalContext";
import "../css/modal-styles.css";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import axios from 'axios';
import { baseUrl } from "../Url";

const NewContextModal = () => {
  const [showModal, setShowModal] = useRecoilState(showModalContext);
  const [contextName, setContextName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    setContextName('');
    setSelectedFiles([]);
  },[showModal])

  const handleClose = () => {
    setShowModal(false);
    setError("");
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const formData=new FormData();
    formData.append('contextName', contextName);
    if (selectedFiles && selectedFiles.length) {
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('selectedFiles', selectedFiles[i]);
        }
    }

    const response=await axios.post(
      `${baseUrl}/context`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    setLoading(false);
    console.log(response)
    handleClose();
  };

  const handleSetContextName = (e) => {
    setContextName(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type === "application/pdf" || file.type === "text/plain"
    );

    if (validFiles.length !== files.length) {
      setError("Only PDF and TXT files are allowed.");
    } else {
      setError("");
    }

    setSelectedFiles(validFiles.slice(0, 3));
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      centered
      animation
      autoFocus
      dialogClassName="modal-border-radius"
    >
      <Modal.Body
        style={{
          backgroundColor: "#212121",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <h5 style={{ color: "#ececec", marginBottom: "20px" }}>
          Create New Context
        </h5>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            placeholder="Enter Context Name"
            value={contextName}
            onChange={handleSetContextName}
            style={{
              width: "100%",
              padding: "10px 20px",
              fontSize: "13px",
              borderRadius: "10px",
              backgroundColor: "#2f2f2f",
              border: "1px solid transparent",
              outline: "none",
              color: "#ececec",
              marginBottom: "20px",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "40px",
              borderRadius: "10px",
              border: "2px dashed #3a3a3a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              marginBottom: "10px",
            }}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.txt"
              onChange={handleFileChange}
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <span style={{ color: "#ececec", fontSize: "11px" }}>
              {selectedFiles.length > 0
                ? `${selectedFiles.length} file${
                    selectedFiles.length > 1 ? "s" : ""
                  } selected`
                : "Browse files (PDF/TXT, max 3)"}
            </span>
          </div>
          {error && (
            <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {error}
            </p>
          )}
          <button
            className="btn btn-sm fw-medium"
            type="submit"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ececec",
              padding: "10px 25px",
              borderRadius: "25px",
              marginTop: "20px",
              border: "none",
              cursor: "pointer",
              marginLeft:'166px'
            }}
          >
            {loading?<FiLoader />:<><span
              style={{
                color: "#000",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              Send
            </span>
            <FaArrowTrendUp
              style={{
                fontSize: "16px",
                color: "#000",
                marginLeft: "7px",
              }}
            /></>}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewContextModal;
