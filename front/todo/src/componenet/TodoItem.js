import React from "react";

export default class TodoItem extends React.Component{
    constructor(props){
        super(props);

        console.log(props);

        this.state={
            title:props.title,
            content:props.content,
            date:props.date,
            
        }
    }


    render(){
        return(
            <li className="list-group-item">
                        <p>
                            <label><strong>{this.state.title}</strong></label> <br/>
                            <small>{this.state.date.toString()}</small><br/>

                            { this.state.content }

                        </p>
                    </li>
        );

    }
}