import React from "react";
import Popup from "../../components/popupchoxe/Popup";
import { useState } from "react";
import { Link } from "react-router-dom";
function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <input
          type="button"
          value="Click to Open Popup"
          onClick={togglePopup}
        />
        {isOpen &&
            <Popup handleClose={togglePopup} />
        }
      </div>
      <div>
        <Link to="/profile">
          <button>Go to profile page</button>
        </Link>
        hello
      </div>
    </>
  );
}
export default Test;
