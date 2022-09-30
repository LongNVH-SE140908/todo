import { useEffect, useState } from "react";


const Home = props => {

    const [cl, setcl] = useState({
        cls: 0
    });

    const [form, setForm] = useState({
        todo: ""
    });

    const [lst, setLst] = useState({
        lsttodo: []
    });



    useEffect(() => {
        async function getData() {
            fetch(
                "/api/todo/Get")
                .then((res) => res.json())
                .then((json) => {
                    var old = { ...lst }
                    old.lsttodo = json;
                    setLst(old);
                    
                })
        };
        getData();

    }, [cl.cls])
    const onUpdateField = e => {
        const field = e.target.name;
        var val = e.target.value;
        var old = { ...form };
        old.todo = val;
        setForm(old);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        fetch(
            "/api/todo/Add/?name=" + form.todo)
            .then((res) => res.json())
            .then((json) => {
                var old = { ...cl };
                old.cls += 1;
                setcl(old);
            })
       
    };

    return (
        <form onSubmit={onSubmitForm}>
            <div>
                <label >Todo:</label>
                <input

                    type="text"
                    aria-label="Todo field"
                    name="todo"
                    value={form.todo}
                    onChange={onUpdateField}
                />


                <ul>


                    {
                        lst.lsttodo.map((v, k) => {
                            return (<li>{v.name}</li>);
                        })
                    }
                </ul>

            </div>

            <div>
                <button type="submit">
                    Add Todo
                </button>
            </div>
        </form>
    );
};

export default Home;