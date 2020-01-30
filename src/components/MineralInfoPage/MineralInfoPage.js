import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { mainListItems } from "../../MenuComponents";
import { Stage, Layer } from "react-konva";
import Container from "@material-ui/core/Container";
import {
  chooseMineralPic,
  groupMineralPic,
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

class MineralInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenCreatedMineral:
        this.props.value ||
        JSON.parse(localStorage.getItem("choosenCreatedMineral")),
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

    this.getImagesForInfoPage(this.state.choosenCreatedMineral);
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

  getImagesForInfoPage(choosenMineral) {
    if (choosenMineral != null) {
      const imageMineral = new window.Image();
      const imageGroup = new window.Image();
      const imageSystem = new window.Image();
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
      imageMineral.src = require("./../../images/" +
        chooseMineralPic(this.state.choosenCreatedMineral.color[0]) +
        ".svg");
      imageGroup.src = require("./../../images/" +
        groupMineralPic(this.state.choosenCreatedMineral.mainGroup[0]) +
        ".svg");
      imageSystem.src = require("./../../images/" +
        this.chooseSystemPic(this.state.choosenCreatedMineral.system) +
        ".svg");
    }
  }

  chooseSystemPic(systemOfMineral) {
    switch (systemOfMineral.toLowerCase()) {
      case "triclinic":
        return "triclinic";
      case "monoclinic":
        return "monoclinic";
      case "orthorhombic":
        return "orthorhombic";
      case "hexagonal":
        return "hexagonal";
      case "tetragonal":
        return "tetragonal";
      case "trigonal":
        return "trigonal";
      case "isometric":
        return "isometric";
      default:
        return "isometric";
    }
  }

  render() {
    const appBarStyle = { zIndex: 1201, backgroundColor: "#009faf" };
    return (
      <div>
        <AppBar position="fixed" className="appBar" style={appBarStyle}>
          <Toolbar className="toolbar" style={{ paddingLeft: 0 }}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              style={{ paddingLeft: -20 }}
            >
              <NavLink to="/">
                <i
                  className="material-icons"
                  style={{
                    color: "white",
                    fontSize: 30,
                    verticalAlign: "middle"
                  }}
                >
                  arrow_back_ios
                </i>
              </NavLink>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="menu-header-text"
            >
              {this.state.choosenCreatedMineral === null
                ? "Crystallizer"
                : this.state.choosenCreatedMineral.name}
            </Typography>
            <div className="formula">Formula: </div>
            <div
              style={{ color: "white", fontSize: 15, paddingRight: 20 }}
              dangerouslySetInnerHTML={{
                __html: `${
                  this.state.choosenCreatedMineral === null
                    ? localStorage.getItem("choosenCreatedMineral")
                    : this.state.choosenCreatedMineral.formulaWeb
                }`
              }}
            />
            <div className="icon">
              <img
                alt="icon"
                src="/crystallizer/favicon.ico"
                width={50}
                height={50}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" className="drawerPaper">
          <List style={{ marginTop: "61px" }}>{mainListItems}</List>
        </Drawer>
        <main className="content">
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
                      choosenCreatedMineral={this.state.choosenCreatedMineral}
                      mainGroup={this.state.choosenCreatedMineral.mainGroup}
                    />
                  </Layer>
                  {this.state.hoveredComponents ? (
                    <ComponentsInfo
                      choosenCreatedMineral={this.state.choosenCreatedMineral}
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
                        this.state.choosenCreatedMineral.specificGravity
                      }
                    />
                  </Layer>
                  {this.state.hoveredGravity ? <SpecificGravityInfo /> : null}
                  <SmallSystemCircle
                    system={this.state.choosenCreatedMineral.system}
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
                      choosenCreatedMineral={this.state.choosenCreatedMineral}
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
                      subGroup={this.state.choosenCreatedMineral.subGroup}
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
                      choosenCreatedMineral={this.state.choosenCreatedMineral}
                    />
                  </Layer>
                  <Hardness
                    hardness={this.state.choosenCreatedMineral.hardness}
                  />
                  <Color color={this.state.choosenCreatedMineral.color} />
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
