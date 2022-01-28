import React from "react";
import { Link } from "react-router-dom";
import TodoItem from "../../componenet/TodoItem";

export default class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            todos:[]
        }


        this.initData = this.initData.bind(this);
    }

 


    initData(){
        // CALL API
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('access-token') )

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/V1/API/todo", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success == false) {
                alert(result.message);
                localStorage.clear();

                this.props.history.push("/auth");
            }

            this.setState({
                todos : result
            })
        })
        .catch(error => console.log('error', error));
    }

    componentDidMount(){

        if ( localStorage.getItem('access-token') == null  ) {
            this.props.history.push("/auth");
        }else{
            this.initData();
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
                            return(<TodoItem  refresh={ this.initData }  key={todo._id} id={todo._id} title={ todo.title } content={ todo.content } date={ todo.date } />);
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