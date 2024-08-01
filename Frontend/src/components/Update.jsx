import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [task, setTask] = useState({ name: "" });
  const [addText, setAddText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8080/todo/${id}`);
        const data = await response.json();
        setTask(data);
        setAddText(data.name);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: addText }),
      });
      const data = await response.json();
      console.log("Task Updated", data);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="text-center text-3xl mt-4">
        Update
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="input input-bordered input-secondary w-full max-w-xs mt-3"
            placeholder={task.name}
            value={addText}
            onChange={(e) => setAddText(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline btn-secondary mt-3"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default Update;
