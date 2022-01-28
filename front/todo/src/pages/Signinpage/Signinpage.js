import React from "react";
import { Link } from "react-router-dom";
import TodoItem from "../../componenet/TodoItem";

export default class SiginPage extends React.Component{

    constructor(props){
        super(props);
        this.state={ 
            username:"",
            password:"",
            errorMsg:''
        }

 
    }

 

    componentDidMount(){

    }


    connect(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"username":this.state.username,"password":this.state.password});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8080/V1/API/auth", requestOptions)
          .then(response => response.json())
          .then(result => {
              if (result.token == null) {
                  this.setState({ errorMsg: result.message })
              } else {
                  localStorage.setItem("access-token",result.token);

                  // redirect to home page !!!
                  this.props.history.push("/home");
              }
          })
          .catch(error => console.log('error', error));
    }


    render(){
        return(
            <div className="container mt-5">
                <div className="form-group mb-3">
                    <label>username</label>
                    <input className="form-control" onChange={ (e)=>{ this.setState({ username:e.target.value }) } }  />

                </div>
                <div className="form-group mb-3">
                    <label>password</label>
                    <input type={ 'password' } className="form-control"  onChange={ (e)=>{ this.setState({ password:e.target.value }) } }  />

                </div>
                <div className="form-group mb-3">
                    <button className="btn btn-primary"  onClick={ ()=>{
                        this.connect();
                    } } >connect</button>

                </div>


                {
                    this.state.errorMsg !== '' ?
                    <div className="alert alert-danger mt-3">{ this.state.errorMsg }</div>:
                    <div></div>
                }
                
            </div>
        );
    }



}


