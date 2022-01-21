import React from "react";

export default class AddTodoPage extends React.Component{
    constructor(props){
        super(props);


        this.state={
           content:"",
           title:"",
           isLoading:false,
           successMsg:'',
           errorMsg:''
            
        }
    }

    createTodo(){

        this.setState({
            isLoading : true
        })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"title":this.state.title,"content":this.state.content});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/V1/API/todo", requestOptions)
        .then(response => response.json())
        .then(result =>{
            if (result.success === true) {
                this.setState({
                    successMsg: result.message
                })
            } else {
                this.setState({
                    errorMsg: result.message
                })
            }
        })
        .catch(error => console.log('error', error)).finally(()=>{
            this.setState({isLoading:false})
        })
    }


    render(){
        return(
            <div className="container mt-5">
                <h1>Create new task</h1>

                <hr/>


                <form onSubmit={(event)=>{
                    event.preventDefault();
                    
                    // READY TO SEND THE CALL TO THE SERVER !!!

                   

                    
                    this.createTodo();


                }} >
                    <label>Title</label>
                    <input onChange={(event)=>{
                        const val = event.target.value;

                        this.setState({
                            title:val
                        })

                    }}  className="form-control"   />
                    <label>Content</label>
                    <textarea onChange={(event)=>{
                        const val = event.target.value;

                        this.setState({
                            content:val
                        })

                    }}  className="form-control" rows={5} ></textarea>
                    <button disabled={ this.state.content ==='' }  className="btn btn-success" type="submit" >SAVE</button>
                    
                    {
                         this.state.isLoading === true ?
                         <div className="alert alert-info">
                             please wait...
                         </div>
                         :
                         <div></div>
                    }

                    {
                         this.state.successMsg !== '' ?
                         <div className="alert alert-success">
                             {this.state.successMsg}
                         </div>
                         :
                         <div></div>
                    }
                    {
                         this.state.errorMsg !== '' ?
                         <div className="alert alert-danger">
                             {
                                 this.state.errorMsg
                             }
                         </div>
                         :
                         <div></div>
                    }



                </form>

            </div>
            
        );

    }
}