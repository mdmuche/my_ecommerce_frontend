import axios from "axios";
import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//toastify step 1
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  let { cid } = useParams();
  let [prodName, setProdName] = useState("");
  let [prodPrice, setProdPrice] = useState("");
  let [prodSnippet, setProdSnippet] = useState("");
  let [prodDetails, setProdDetails] = useState("");
  let [prodImg, setProdImg] = useState("");
  let [preview, setPreview] = useState(null);
  let redirecting = useNavigate();
  let [disable, setDisable] = useState(false);
  const [error, setError] = useState(null);

  //toastify step 2
  const notify = () =>
    toast.success("product created successfully!", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });

  const { user } = useAuthContext();

  const clearForm = () => {
    setProdName("");
    setProdPrice("");
    setProdSnippet("");
    setProdDetails("");
    setProdImg(null);
    setPreview(null);
    setDisable(false);
  };

  const handleSubmit = function (e) {
    e.preventDefault(e);

    if (!user) {
      setError("You must be logged in");
      return;
    }

    setDisable(true);
    //create form-data like in postman
    const formData = new FormData();
    formData.append("prodName", prodName);
    formData.append("prodPrice", prodPrice);
    formData.append("prodSnippet", prodSnippet);
    formData.append("prodDetails", prodDetails);
    formData.append("prodImg", prodImg);
    formData.append("id", cid);

    // console.log(formData);

    axios
      .post("https://my-ecommerce-api-s605.onrender.com/v1/admins", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        //notify step 3
        notify();
        redirecting("/");
      })
      .catch((err) => {
        console.log(err.message);
        setError("Failed to create product");
        clearForm();

        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <div>
      <Container>
        <h1 className="my-3 display-5 fw-bold text-center text-success">
          Create Product
        </h1>
        <Row className="row justify-content-center align-content-center">
          <Col className="col-6">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <Form.FloatingLabel label="prodName">
                <Form.Control
                  type="text"
                  name="prodName"
                  className="mt-3"
                  value={prodName}
                  onChange={(e) => {
                    setProdName(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodPrice">
                <Form.Control
                  type="text"
                  name="prodPrice"
                  className="mt-3"
                  value={prodPrice}
                  onChange={(e) => {
                    setProdPrice(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodSnippet">
                <Form.Control
                  as="textarea"
                  name="prodSnippet"
                  className="mt-3 h-25"
                  value={prodSnippet}
                  onChange={(e) => {
                    setProdSnippet(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodDetails">
                <Form.Control
                  as="textarea"
                  name="prodDetails"
                  className="mt-3"
                  value={prodDetails}
                  style={{ height: "150px" }}
                  onChange={(e) => {
                    setProdDetails(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.Label className="mt-2">only prodImg(png/jpeg)</Form.Label>
              <Form.Control
                type="file"
                name="prodImg"
                onChange={(e) => {
                  setProdImg(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                required
              ></Form.Control>
              <div className="mt-4 text-center">
                <span className="mx-2">Upload Image: </span>
                {preview && (
                  <img
                    src={preview}
                    alt="Upload"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className="text-center my-3">
                <Link className="btn btn-light btn-outline-primary" to={"/"}>
                  Back
                </Link>
                <Button
                  className="btn btn-light btn-outline-success mx-3"
                  type="submit"
                  disabled={disable}
                >
                  Create Product
                </Button>
                {error && <div className="error">{error}</div>}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* toastify step 4 */}
      <ToastContainer />
    </div>
  );
}

export default Create;
