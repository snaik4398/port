import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      225deg,
      hsla(294, 100%, 50%, 1) 0%,
      hsla(271, 100%, 50%, 1) 100%
    );
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Adds shadow effect */
    transform: scale(1.05); /* Slightly enlarges the button */
    transition: all 0.3s ease-in-out; /* Smooth transition */
  }
`;

export const Contact = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState(""); // State to store validation message

  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Track if the button should be enabled

  useEffect(() => {
    // Enable the button after 3 seconds
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 3000);
    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    const fromEmail = form.current.from_email.value.trim();
    const fromName = form.current.from_name.value.trim();
    const subject = form.current.subject.value.trim();
    const message = form.current.message.value.trim();

    // Check if any field is empty
    if (!fromEmail || !fromName || !subject || !message) {
      setErrorMessage("All fields must be filled out.");
      return; // Prevent submission if fields are empty
    }

    // Clear the error message if validation passes
    setErrorMessage("");

    emailjs
      .sendForm(
        "service_83dj4bc",
        "template_bblxtyb",
        e.target,
        "ZUCqTw4buBKYEtwUp"
      )
      .then(() => {
        setOpen(true);
        setSeverity("success");
        form.current.reset();
      })
      .catch((error) => {
        setOpen(true);
        setSeverity("error");
        console.log(error.text);
      });

      e.target.reset();
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <ContactButton
            type="submit"
            value="Send"
            disabled={!isButtonEnabled}
          />
        </ContactForm>
        <div>
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </div>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity={severity}>
            {severity === "success"
              ? "Email sent successfully!"
              : "Error sending email. Please try again later."}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};
