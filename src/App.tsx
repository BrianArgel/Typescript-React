import React, { useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}
function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [task, setTask] = useState<ITask[]>([]);
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };
  const addTask = (name: string): void => {
    const newTask = [...task, { name, done: false }];
    setTask(newTask);
  };
  const doneToggle = (i: number): void => {
    const newTask: ITask[] = [...task];
    newTask[i].done = !newTask[i].done;
    setTask(newTask);
  };
  const removeTask = (name: string): void => {
    const newArray = task.filter((tas) => tas.name !== name);
    setTask(newArray);
  };

  return (
    <div className="container-py-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                />
                <button className="btn btn-success btn-block mt-2">
                  Save Task
                </button>
              </form>
            </div>
          </div>
          {task.map((t: ITask, i) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <p>{t.done}</p>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => doneToggle(i)}
                >
                  {t.done ? "Check" : "Done"}
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => removeTask(t.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
