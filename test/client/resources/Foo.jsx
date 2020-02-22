import React from "react";

export default class Foo extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log("mounted");
  }
  render(){
    return <div></div>;
  }
}