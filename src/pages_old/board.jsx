import { Component } from "react";
import { Code, Text } from "@geist-ui/core";
import { getRequest } from "../axios/axios";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  getModules = () => {
    getRequest("/api/modules").then(res => {
      if (res.data) {
        const data = res.data.map(d => {
          return { name: d.Name, des: d.Des, path: <Code>{d.Path}</Code>, apis: '-' }
        });
        console.log(data)
        this.setState({ data: data });
      }
    })
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <>
        <Text h4>流量看板</Text>
        <Text>
          开发中
        </Text>
      </>
    );
  }
}

export default Board;