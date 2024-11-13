import React, {useEffect, useState} from 'react';
import PostList from "../components/PostList.jsx";
import SafetySentimentChart from "../components/SafetySentimentChart.jsx";

function Dashboard() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        handleGetPosts()
    },[])
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
    return (
        <div><SafetySentimentChart posts={posts}/></div>
    );
}

export default Dashboard;