import React from "react";

export default class AddTodoPage extends React.Component{
    constructor(props){
        super(props);


        this.state={
           content:"",
           isLoading:false,
           successMsg:'',
           errorMsg:''
            
        }
    }


    render(){
        return(
            <div className="container mt-5">
                <h1>Create new task</h1>

                <hr/>


                <form onSubmit={(event)=>{
                    event.preventDefault();
                    
                    // READY TO SEND THE CALL TO THE SERVER !!!

                    this.setState({
                        isLoading:true
                    })

                    setTimeout(() => {
                        this.setState({
                            isLoading:false,
                            successMsg:'ok !!'
                        })
                    }, 4000);


                }} >
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