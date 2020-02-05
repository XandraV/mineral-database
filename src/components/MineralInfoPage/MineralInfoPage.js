import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { SideBar } from "../../Menu";
import { Stage, Layer } from "react-konva";
import Container from "@material-ui/core/Container";
import {
  GroupCircle,
  SystemCircle,
  SystemInfo,
  GroupInfo,
  ComponentsInfo,
  Components,
  SpecificGravityInfo,
  SpecificGravityCircle,
  SmallSystemCircle,
  ComponentsBackground,
  SubGroup,
  SubGroupInfo,
  Hardness,
  Color,
  MineralImage
} from "./MineralInfoPageComponents";
import CrystallizerIcon from "./../../CrystallizerIcon";
class MineralInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCreatedMineral:
        this.props.value ||
        JSON.parse(localStorage.getItem("chosenCreatedMineral")),
      mineralImage: null,
      mineralGroupImage: null,
      mineralSystemImage: null,
      stageWidth: 1100,
      hoveredGravity: false,
      hoveredSystem: false,
      hoveredGroup: false,
      hoveredSubGroup: false,
      hoveredComponents: false
    };
  }
  componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);

    this.getImagesForInfoPage(this.state.chosenCreatedMineral);
    window.addEventListener("getimage", this.getImagesForInfoPage);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
    window.removeEventListener("getimage", this.getImagesForInfoPage);
  }

  checkSize = () => {
    if (this.container) {
      const width = this.container.offsetWidth;
      this.setState({
        stageWidth: width
      });
    }
  };

  getImagesForInfoPage(chosenMineral) {
    if (chosenMineral != null) {
      const imageMineral = new window.Image();
      const imageGroup = new window.Image();
      const imageSystem = new window.Image();
      const color = this.state.chosenCreatedMineral.color[0].toLowerCase();
      const group = this.state.chosenCreatedMineral.mainGroup[0].toLowerCase();
      const system = this.state.chosenCreatedMineral.system.toLowerCase();
      imageMineral.onload = () => {
        this.setState({
          mineralImage: imageMineral
        });
      };
      imageGroup.onload = () => {
        this.setState({
          mineralGroupImage: imageGroup
        });
      };
      imageSystem.onload = () => {
        this.setState({
          mineralSystemImage: imageSystem
        });
      };
      imageMineral.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${color}.svg`;
      imageGroup.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${group}.svg`;
      imageSystem.src = `https://crystallizer.s3.eu-west-2.amazonaws.com/${system}.svg`;
    }
  }

  render() {
    const appBarStyle = { zIndex: 1201, backgroundColor: "#009faf" };
    return (
      <div>
        <AppBar position="fixed" className="appBar" style={appBarStyle}>
          <Toolbar className="toolbar info-page">
            <IconButton
              color="inherit"
              aria-label="Menu"
              style={{ paddingLeft: -20 }}
            >
              <NavLink to="/">
                <i className="material-icons back-btn">arrow_back_ios</i>
              </NavLink>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="menu-header-text"
            >
              {this.state.chosenCreatedMineral === null
                ? "Crystallizer"
                : this.state.chosenCreatedMineral.name}
            </Typography>
            <div className="formula">Formula: </div>
            <div
              className="formula-html"
              dangerouslySetInnerHTML={{
                __html: `${
                  this.state.chosenCreatedMineral === null
                    ? localStorage.getItem("chosenCreatedMineral")
                    : this.state.chosenCreatedMineral.formulaWeb
                }`
              }}
            />
            <CrystallizerIcon />
          </Toolbar>
        </AppBar>
        <SideBar />
        <main className="min-info-content">
          <Container
            maxWidth="lg"
            className="container"
            style={{ paddingLeft: 20 }}
          >
            <div className="Periodic-table">
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
                rel="stylesheet"
              />
              <div
                className="canvas-wrapper"
                ref={node => {
                  this.container = node;
                }}
              >
                <Stage width={this.state.stageWidth} height={600}>
                  <Layer>
                    <ComponentsBackground />
                  </Layer>
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredComponents: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredComponents: true
                      })
                    }
                  >
                    <Components
                      chosenCreatedMineral={this.state.chosenCreatedMineral}
                      mainGroup={this.state.chosenCreatedMineral.mainGroup}
                    />
                  </Layer>
                  {this.state.hoveredComponents ? (
                    <ComponentsInfo
                      chosenCreatedMineral={this.state.chosenCreatedMineral}
                    />
                  ) : null}
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredGravity: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredGravity: true
                      })
                    }
                  >
                    <SpecificGravityCircle
                      specificGravity={
                        this.state.chosenCreatedMineral.specificGravity
                      }
                    />
                  </Layer>
                  {this.state.hoveredGravity ? <SpecificGravityInfo /> : null}
                  <SmallSystemCircle
                    system={this.state.chosenCreatedMineral.system}
                  />
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredSystem: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredSystem: true
                      })
                    }
                  >
                    <SystemCircle
                      mineralSystemImage={this.state.mineralSystemImage}
                      chosenCreatedMineral={this.state.chosenCreatedMineral}
                    />
                  </Layer>
                  {this.state.hoveredSystem ? (
                    <SystemInfo hoveredSystem={this.state.hoveredSystem} />
                  ) : null}
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredSubGroup: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredSubGroup: true
                      })
                    }
                  >
                    <SubGroup
                      subGroup={this.state.chosenCreatedMineral.subGroup}
                    />
                  </Layer>
                  {this.state.hoveredSubGroup ? <SubGroupInfo /> : null}
                  {this.state.hoveredGroup ? <GroupInfo /> : null}
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredGroup: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredGroup: true
                      })
                    }
                  >
                    <GroupCircle
                      mineralGroupImage={this.state.mineralGroupImage}
                      chosenCreatedMineral={this.state.chosenCreatedMineral}
                    />
                  </Layer>
                  <Hardness
                    hardness={this.state.chosenCreatedMineral.hardness}
                  />
                  <Color color={this.state.chosenCreatedMineral.color} />
                  <MineralImage mineralImage={this.state.mineralImage} />
                </Stage>
              </div>
            </div>
          </Container>
        </main>
      </div>
    );
  }
}

export default MineralInfoPage;
