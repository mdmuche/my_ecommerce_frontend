import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { user } = useAuthContext();
  let [db, setDb] = useState([]);
  let [like, setLike] = useState(0);

  const noProducts = db.length === 0;

  const handleLike = function (id) {
    if (!user) {
      return;
    }
    axios
      .post(
        "https://my-ecommerce-api-s605.onrender.com/v1/product/likes",
        { id, like: 1 },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        setLike((like = like + 1));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get("https://my-ecommerce-api-s605.onrender.com/v1/product/1/5", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((resp) => {
        setDb(resp.data.products.docs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [like, user.token]);
  return (
    <div className={`home-page ${noProducts ? "flex-display" : ""}`}>
      <Container>
        <h1>
          All Product
          {/* {location.state.id} */}
        </h1>
        <h3 className="welcome">
          welcome, {user.userDetails.role + " " + user.userDetails.fullName}
        </h3>
        <Row className="align-content-center justify-content-center gap-3">
          {db && db.length > 0 ? (
            db.map((prod) => (
              <Col
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-4"
                key={prod._id}
              >
                <Card key={prod._id} className="shadow border-0 text-center">
                  <CardHeader>
                    <Card.Title>{prod.prodName}</Card.Title>
                  </CardHeader>
                  <Card.Body>
                    <Link title="view product" to={`/details/${prod._id}`}>
                      <Card.Img
                        variant="top"
                        className="img-fluid"
                        src={prod.prodImg}
                      ></Card.Img>
                    </Link>
                    <Card.Subtitle className="mt-3">
                      {prod.prodPrice}
                    </Card.Subtitle>
                    <Card.Text>{prod.prodSnippet}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button className="btn btn-primary btn-outline-light bg-dark border-0">
                      Cart
                    </Button>
                    <Button
                      className="btn btn-primary btn-outline-light bg-dark border-0 mx-2"
                      onClick={(e) => handleLike(prod._id)}
                    >
                      Like: {prod.prodLikes ? prod.prodLikes : 0}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-prods">No product available!!!</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
