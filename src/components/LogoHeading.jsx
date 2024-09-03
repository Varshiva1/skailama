import logo from "../assets/icons/logo.svg";

export default function LogoHeading({ theme = "primary-color" }) {
  return (
    <div
      className="flex"
      style={{ color: `var(--${theme})`, fontSize: 26, gap: 8 }}
    >
      <img
        src={logo}
        alt="Ques.AI"
        style={{
          filter:
            theme === "white"
              ? "invert(99%) sepia(100%) saturate(30%) hue-rotate(114deg) brightness(150%) contrast(100%)"
              : "",
        }}
      />
      <p>
        <span style={{ fontWeight: 700 }}>Ques.</span>
        <span>AI</span>
      </p>
    </div>
  );
}
