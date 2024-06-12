import "./Home.css";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {useEffect, useRef, useState} from "react";
import axios  from "axios";
import sad from "../../assets/sad.svg";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

function Home() {
    const  navigate = useNavigate();
    const [ dataBlog, setData ] = useState([])
    const textRef = useRef();
    const titleRef = useRef();
    const [err,setErr] = useState("")

    useEffect(() => {
        fetchData();
    }, []);

    const postHandler = async (e) => {
        setErr("")
        e.preventDefault();
        const data = {
            title: titleRef.current?.value,
            text: textRef.current?.value,
            user: localStorage.getItem('user')
        }
        try {
            await axios.post("https://node-zaliczenie.vercel.app/post",{data})
            await fetchData(); // <-- Dodano ponowne pobranie danych po wysłaniu posta
            titleRef.current.value = ''; // <-- Czyszczenie pola tytułu
            textRef.current.value = '';
        } catch (err) {
            setErr("Post with this title already exists ")
        }
    }

    const deletePost = async (title) => {
        await axios.post("https://node-zaliczenie.vercel.app/delete",{title});
        await fetchData();
    }

    const logoutHandler= () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('user');
        navigate("/");
    }

    const fetchData = async () => {
        const {data} = await axios.get("https://node-zaliczenie.vercel.app/");
        setData(data);
        console.log(data)
    }

    return(
        <>
        <nav>
            <div className="svg-wrap" onClick={logoutHandler}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#000000" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"></path>
                        <path
                            d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                            stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path>
                    </g>
                </svg>
            </div>
        </nav>
            <main className="main-blog">
                <Form className="post-wrap" onSubmit={postHandler}>
                    <Form.Label >Create your post!</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        ref={titleRef}
                        required
                    />
                    <Form.Control as="textarea" placeholder="Text" rows={5} style={{resize: 'none'}} ref={textRef} required/>
                    <Button type="submit" variant="success" style={{marginTop:"20px"}}>Add post</Button>
                    <p>{err}</p>
                </Form>
                {dataBlog.length ?

                    <div className="posts-wrap">
                        {dataBlog.map((item) => {
                            return (
                                <Card key={dataBlog._id} style={{padding:"10px",margin:"20px"}}>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.text}
                                        </Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">Author: {item.user}</Card.Subtitle>
                                        <Button variant="danger" onClick={() => {
                                            deletePost(item.title)
                                        }}>Delete post</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                    :
                    <div className="homepage-center">
                        <p>There are no content to display</p>
                        <img src={sad} alt="sad"/>
                    </div>
                }


            </main>
        </>
    )
}

export default Home;