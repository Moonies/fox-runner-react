import React from "react";
import { Progress } from "reactstrap";
import { withUser } from '../utils/user';

class FoxComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foxStatus: null,
      bottom: null,
      foxInfo: null,
      hpColor: "success",
      hpPercent: 100,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { foxStatus, foxInfo } = props;
    let hpPercent = (foxInfo.hp * 100) / foxInfo.fullHp;
    let hpColor = "success";

    let bottom = 20;
    if (props.foxStatus === "jumping") {
      bottom = 150;
    }

    switch (true) {
      case hpPercent < 25: {
        hpColor = "danger";
        break;
      }
      case hpPercent < 50: {
        hpColor = "warning";
        break;
      }
      case hpPercent < 75: {
        hpColor = "info";
        break;
      }
      default:
        hpColor = "success";
    }

    return {
      bottom,
      foxStatus: foxStatus,
      foxInfo: foxInfo,
      hpColor,
      hpPercent,
    };
  }

  componentDidUpdate() {
    if (this.state.foxStatus === "jumping") {
      console.log("jumping");
      setTimeout(() => {
        this.setState({
          bottom: 20,
        });
        console.log("running");
        this.props.setFoxStatus("running");
      }, 500);
    }
  }

  render() {
    let { bottom, foxStatus,foxInfo } = this.state;
    let foxInfoProps = this.props.getFoxInfo();
    let hpPercent = (foxInfoProps.hp * 100) / foxInfoProps.fullHp;
    let hpColor = null;
    switch (true) {
      case hpPercent < 25: {
        hpColor = "danger";
        break;
      }
      case hpPercent < 50: {
        hpColor = "warning";
        break;
      }
      case hpPercent < 75: {
        hpColor = "info";
        break;
      }
      default:
        hpColor = "success";
    }

    return (
      <div
        ref={this.props.foxRef}
        id="foxObject"
        style={{ bottom }}
        className={`fox-object ${
          foxStatus === "standing" ? "fox-standing" : "fox-running"
          }`}
      >
        <div className="fox-info">
          <img src={foxInfo.image} alt={foxInfo.name} />
          <div>
            <h4>{foxInfo.name} <small><a href="#" onClick={this.props.logout}>x</a></small></h4>
            <Progress color={hpColor} value={hpPercent}>
              {foxInfoProps.hp}/{foxInfoProps.fullHp}
            </Progress>
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(FoxComponent);
