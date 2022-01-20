import React from "react";
import { Link } from "react-router-dom";
import TodoItem from "../../componenet/TodoItem";

export default class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            todos:[
                { id:1, title:"custom title", message:"hello world", date:new Date() },
                { id:2, title:"custom title", message:"hello world", date:new Date() },
              
            ]
        }
    }


    render(){
        return(
            <div className="container mt-5">
                <h1>Todos List</h1>

                <Link className="btn btn-outline-primary" to="/todo/add">create new todo</Link>

                <hr/>


                <div className="todos">
                <ul className="list-group">
                    
                    
                    
                    {
                        this.state.todos.map((todo)=>{
                            return(<TodoItem key={todo.id} title={ todo.title } content={ todo.message } date={ todo.date } />);
                        })
                    }


                </ul>
                </div>
            </div>
        );
    }



}









/**
 *     constructor(props){
        super(props);

        this.state={
            click:false,

            likeBtnClicked : false,
            nbrLikes: 8
        }
    }

    clickbtn(){
        // WRONG !!!
        // this.state = {}

        this.setState({
            click: true
        })
    }

    updateLike(){
        console.log("test");
        this.setState({
            likeBtnClicked : ! this.state.likeBtnClicked,
            nbrLikes : this.state.likeBtnClicked === true ? (this.state.nbrLikes-1) : (this.state.nbrLikes + 1)
            
        })

        // CALL API /like/18/19
    }

    render(){
        return(
            <div>
                <h1>Welcome to our app</h1>

                <button onClick={
                    ()=>{
                        this.clickbtn();
                    }
                } >{ this.state.click === false ? 'click me' : 'clicked' } </button>


                <button onClick={
                    ()=>{
                        this.updateLike();
                    }
                } >  { this.state.nbrLikes }  { this.state.likeBtnClicked === true ? 'dislike':'like' } </button>
            </div>
        );
    }
    
 */