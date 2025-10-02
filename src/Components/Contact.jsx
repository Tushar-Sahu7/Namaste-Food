const Contact = () => {
  return (
    <div>
      <h1 style={{ color: "#f45252", textAlign: "center", margin: "1rem" }}>
        Contact Page
      </h1>
      <form
        style={{
          color: "#f45252",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          style={{
            width: "50%",
            border: "2px solid #f45252",
            height: "2rem",
            padding: "0.5rem",
            borderRadius: "1rem",
          }}
          type="text"
          placeholder="Name"
        />
        <input
          style={{
            width: "50%",
            border: "2px solid #f45252",
            height: "6rem",
            padding: "0.5rem",
            borderRadius: "1rem",
          }}
          type="text"
          placeholder="Message"
        />
        <button
          style={{
            color: "white",
            border: "2px solid #f45252",
            backgroundColor: "#f45252",
            width: "30%",
            height: "2rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
