import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { choosenContext } from "../context/storeContext.js";
import { useRecoilState } from "recoil";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Add from "../icons/Add.js";
import { showPdfContext } from "../context/modalContext.js";
import { MdCancel } from "react-icons/md";
import { selectContext } from "../context/selectContext.js";
import {baseUrl} from '../Url.js'
import axios from 'axios'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RightSidebar = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState();
  const [choose, setChoose] = useRecoilState(choosenContext);
  const [showPdf, setShowPdf] = useRecoilState(showPdfContext);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedContext,setSelectedContext]=useRecoilState(selectContext);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const convertToUint8Array = (data) => {
    return new Uint8Array(data);
  };

  const handleFileChange = () => {
    // Handle file change logic here
  };

  const handleViewPdf = (pdfData) => {
    console.log("Pdf view clicked");
    setShowPdf(true);
    setSelectedPdf(pdfData);
  };

  const handleRemovePdf = async(index,pdfId) => {
    console.log(pdfId,selectedContext)
    const response=await axios.put(`${baseUrl}/context/delete-pdf`,{
      contextId:selectedContext,
      pdfId
    })
    console.log(response.data)
    const updatedContents = choose.contents.filter((_, i) => i !== index);
    setChoose((prevState) => ({
      ...prevState,
      contents: updatedContents,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "290px",
        padding: "20px",
        height: "100vh",
        backgroundColor: "#171717",
        borderRight: "1px solid #171717",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <p
        className="text-xl font-semibold text-gray-200 p-4 border-b border-gray-800"
        style={{ color: "#ececec" }}
      >
        Notes
      </p>
      <div className="flex-grow overflow-y-auto p-4">
        <div
          className="grid grid-cols-2 gap-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {choose?.contents?.map((context, index) => {
            const pdfData = convertToUint8Array(context.file.data);
            return (
              <div
                key={index}
                style={{
                  width: "120px",
                  height: "160px",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Document
                  file={{ data: pdfData }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="pdf-document"
                  onClick={() => handleViewPdf(pdfData)}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={100}
                  />
                </Document>
                <MdCancel
                  size={20}
                  color="red"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemovePdf(index,context._id)}
                />
              </div>
            );
          })}

          <div
            style={{
              position: "relative",
              width: "120px",
              height: "160px",
              borderRadius: "10px",
              border: "2px dashed #8c8c8c",
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
            <Add />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
