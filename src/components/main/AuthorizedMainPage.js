import React from "react";
import { Card, Container } from "react-bootstrap";
import styles from "../../heights.module.css";

export default function AuthorizedMainPage() {
  const posts = [
    {
      title: "first stable version released!",
      date: "26.06.2023",
      text: "This is an exciting moment! Our first stable version after a long process of development \
       is finally released! This app can help people gain humanitarian assistance in the most convenient \
        way possible. The trucks are supposed to be set in the most appropriate way. So a majority of people\
        who need aid won`t bother walking long distances to get it.",
    },
  ];
  return (
    <div className={styles["page-height"]}>
      <div className="p-4 display-4 text-center text-bg-primary">
        {" "}
        Welcome to Myhac
      </div>
      <Container>
        {posts.map((post, index) => (
          <Card className="m-3 " key={index}>
            <Card.Header className="display-4">{post.title}</Card.Header>
            <Card.Body className="fs-5 fw-lighter">{post.text}</Card.Body>
            <Card.Footer className="fs-6">{post.date}</Card.Footer>
          </Card>
        ))}
      </Container>
    </div>
  );
}
