import { useRef, useState } from "react";

interface Promo {
  code: string;
  discount: string;
}

// type StatusMessage = "Success, promo applied" | "No code found" | "";

const promoCodes: Promo[] = [
  { code: "SAVE10", discount: "10%" },
  { code: "SAVE20", discount: "20%" },
  { code: "FREESHIP", discount: "Free Shipping" },
];

export default function PromoCode() {
  const [inputText, setInputText] = useState("");
  const [codeValid, setCodeStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function updateSearch(input: string): void {
    setInputText(input);
  }

  function validateCode() {
    const match = promoCodes.find(
      (item) => item.code.toLowerCase() === inputText.toLowerCase(),
    );
    if (match) {
      setCodeStatus(true);
      setStatusMessage(`Success, promo applied - ${match.discount} off`);
      setInputText("");
    } else {
      setCodeStatus(false);
      setStatusMessage("No code found");
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          id="text"
          value={inputText}
          ref={inputRef}
          onChange={(e) => updateSearch(e.target.value)}
        />
        {codeValid && (
          <button
            onClick={() => {
              setCodeStatus(false);
            }}
          >
            Remove
          </button>
        )}
        <button onClick={validateCode} disabled={inputText === ""}>
          Apply
        </button>
        <p>{statusMessage}</p>
      </div>
    </>
  );
}
