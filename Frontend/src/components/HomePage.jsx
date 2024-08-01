import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [addText, setAddText] = useState("");
  const navigate = useNavigate();

  //Create new Task
  const handleText = async () => {
    if (!addText.trim()) {
      // Check if addText is empty or contains only spaces
      toast.error("Please enter something!!.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: addText }),
      });
      const data = await response.json();
      console.log("Task Created", data);
      navigate("/dashboard");
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  return (
    <>
      <Toaster />

      <div className="text-center text-3xl mt-20">
        Add Tasks
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Add Tasks"
            className="input input-bordered input-secondary w-full max-w-xs mt-3"
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline btn-secondary mt-3"
          onClick={handleText}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default HomePage;
