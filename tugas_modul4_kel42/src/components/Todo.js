import React, { useState, useEffect, useContext, createContext } from 'react';
import './Todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'

const themes = {
    light: {},
    dark: {},
};

const ThemeContext = createContext();

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);

    const [tasks, setTasks] = useState([
        {
            title: "Mengerjakan Tugas Pendahuluan",
            completed: true
        },
        {
            title: "Ikut Praktikum",
            completed: true
        },
        {
            title: "Membuat tugas praktikum",
            completed: false
        }
    ]);

    const [value, setValue] = useState("");

    const [alert, setAlert] = useState(false);

    const [valueTheme, setValueTheme] = useState(themes.light);

    const [icon, setIcon] = useState(faSun);

    useEffect(() => { 
        setTasksRemaining(tasks.filter(task => !task.completed).length) 
    });

    useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
          }, 2000)
        }
      }, [alert]);

    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
        
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
        setAlert(true);
    }

    return (
        <ThemeContext.Provider value={valueTheme}>
            <div className={`contentWrapper ${valueTheme === themes.light ? 'darkWrapper' : 'lightWrapper'}`}>
                <div className={`container ${valueTheme === themes.light ? 'dark' : 'light'}`}>
                    <button className="themeButton" onClick={() => {setValueTheme(valueTheme === themes.light ? themes.dark : themes.light); setIcon(valueTheme === themes.light ? faMoon : faSun)}}>
                        <FontAwesomeIcon icon={icon} />
                    </button>
                    <div className="header">To Do List</div>
                    <div className="header2">Tugas tertunda ({tasksRemaining})</div>
                    <div className="tasks">
                        {tasks.map((task, index) => (
                            <div
                            className={`task ${valueTheme === themes.light ? 'darkTask' : 'lightTask'}`}
                            key={index}
                            style={{ textDecoration: task.completed ? "line-through" : "" }}
                            >
                                {task.title}
                    
                                <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
                                
                                <button style={{ background: task.completed ? "rgb(17, 160, 29)" : "",  }} onClick={() => completeTask(index) }>Checklist</button>
                
                            </div>
                        ))}
                    </div>
                    <div className={"taskCreate"}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className={`${valueTheme === themes.light ? 'darkInput' : 'lightInput'}`}
                                value={value}
                                placeholder="Tambah tugas baru"
                                onChange={e => setValue(e.target.value)}
                            />
                            <button type="submit">Add</button>
                            {alert && <p style={{ textAlign: "center"}}>Tugas berhasil ditambahkan!</p>}
                        </form>
                    </div>
                    <Content/>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

function Content() {
    const theme = useContext(ThemeContext);
    return (
        <div>
            <p className={`${theme === themes.light ? 'dark' : 'light'}`} style={{ textAlign: "center"}}>Kelompok 42</p>
        </div>
    );
}

export default Todo;