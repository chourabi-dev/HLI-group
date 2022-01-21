import React from "react";

export default class TodoItem extends React.Component{
    constructor(props){
        super(props);

        console.log(props);

        this.state={
            id:props.id,
            title:props.title,
            content:props.content,
            date:props.date,
            
            updateTitle:props.title,
            updateContent:props.content,
            
            isUpdating: false,

            refresh:props.refresh
        }
    }

    deleteTodo(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = "";

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/V1/API/todo?id="+this.state.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            this.state.refresh()
        })
        .catch(error => console.log('error', error));
    }


    updateTodo(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"title":this.state.updateTitle,"content":this.state.updateContent});

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:8080/V1/API/todo?id="+this.state.id, requestOptions)
        .then(response => response.json())
        .then(result =>{
            this.setState({
                title:this.state.updateTitle,
                content:this.state.updateContent,
                isUpdating: false
            })
        })
        .catch(error => console.log('error', error));
    }


    render(){
        return(
            <li className="list-group-item mb-5">

                {
                    this.state.isUpdating === true ? 
                    <div className="form-group">
                <label>Title</label>
                    <input value={ this.state.updateTitle } onChange={(event)=>{
                        const val = event.target.value;

                        this.setState({
                            updateTitle:val
                        })

                    }}  className="form-control"   />
                    <label>Content</label>
                    <textarea value={ this.state.updateContent } onChange={(event)=>{
                        const val = event.target.value;

                        this.setState({
                            updateContent:val
                        })

                    }}  className="form-control" rows={5} ></textarea>


                        <div className="row">
                            <div className="col-sm-3">
                                <button className="btn btn-outline-info w-100" onClick={ ()=>{
                                
                                this.updateTodo();
                                
                                } }  >Save</button>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-outline-secondary w-100" onClick={ ()=>{
                                    this.setState({isUpdating : false})
                                } }  >cancel</button>
                            </div>
                        </div>

                </div>
                :

                <div>
                    <p>
                        <label><strong>{this.state.title}</strong></label> <br/>
                        <small>{this.state.date.toString()}</small><br/>

                        { this.state.content }

                    </p>

                    <div className="row">
                        <div className="col-sm-3">
                            <button className="btn btn-outline-info w-100" onClick={ ()=>{
                                this.setState({isUpdating : true})
                            } }  >update</button>
                        </div>
                        <div className="col-sm-3">
                            <button className="btn btn-outline-danger w-100" onClick={ ()=>{
                                this.deleteTodo();
                            } } >delete</button>
                        </div>
                        
                    </div>
                </div>

                }
                

                
            </li>
        );

    }
}