import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate= useNavigate();

  //Show data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await fetch("http://localhost:8080/todo");
        const fetchedData = await data.json();
        setTasks(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  //Delete by id
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  //Update Redirection
  const handleUpdate=(id)=>{
    navigate(`/update/${id}`)
  }

  return (
    <>
      

      <div className="flex flex-row flex-wrap justify-center ">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="card bg-neutral text-neutral-content w-96  m-3 "
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl"> {task.name}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
                <button className="btn btn-ghost" onClick={()=>handleUpdate(task.id)}>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
