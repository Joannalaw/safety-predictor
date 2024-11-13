import React, {useEffect, useState} from 'react';
import PostList from "../components/PostList.jsx";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';


const HomePage = () => {
    const [newPost, setNewPost] = useState({content: "", username: "Joanna"});
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        handleGetPosts()
    },[newPost])
    const handleGetPosts = async ()=> {
        try{
            const res = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            setPosts(data.data);

        }catch (error){
            console.log(error)
        }
    }
    const handleAddPost = async () => {
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            })
            setNewPost({...newPost, content:""})
            console.log(res)
        }catch (error){
            console.log(error)
        }
    }


    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            justifyContent: 'center',
            margin: '100px',
            gap: '30px'
        }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Thoughts"
                    multiline
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
                <Button variant="outlined" endIcon={<AddIcon/>} onClick={handleAddPost}>
                    Add
                </Button>
            </div>

            <PostList lists={posts} />
        </div>
    );
}

export default HomePage;