import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import styles from "../heights.module.css";

export default function AdditionalInfo() {
  const text1 =
    "This application helps track the need for humanitarian aid among citizens.";
  const text2 =
    "It`s too important to provide a high-quality \
   humanitarian assistance nowadays. In some situations it is crusial.\
    This application can help with managment of this assistance and track the needs of population.";
  const how_to_use_text =
    "To use this application as a person who needs assistance, you have to download Telegram on your smartphone and find\
     a bot with the name";
  const name_of_bot = "https://t.me/how_is_the_situation_bot";
  return (
    <div className={styles["page-height"]}>
      <div className="text-bg-primary display-4 text-center page-height p-4">
        Additional info
      </div>
      <Container>
        <section>
          <div className="row p-4 fs-5 fw-lighter">
            <div className="col">
              <Container>
                <div className="row fs-3 mt-4 mb-4">{text1}</div>
                <hr />
                <div className="row mt-4 mb-4">{text2}</div>
                <hr />
                <div className="row fw-normal mt-4 mb-4">
                  {how_to_use_text}
                  <a href={name_of_bot}>{name_of_bot}</a>
                </div>
              </Container>
            </div>
            <div className="col-3 align-self-center text-center">
              <a href={name_of_bot} className="">
                <FontAwesomeIcon
                  icon="fa-brands fa-telegram"
                  size="5x"
                  border
                />
              </a>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
