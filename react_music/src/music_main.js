import React, { Component } from 'react';
import { Slider, RangeSlider,Grid, Row, Col, Navbar, Nav, Dropdown, Icon, List,InputGroup, Input,Carousel,Table,Button,ButtonToolbar,Tooltip, Whisper} from 'rsuite';
import music_obj from '../music_css/music_main.js';
import '../music_css/music_main.css';
import 'rsuite/lib/styles/index.less';
import fakeData from '../fromdata/user';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {get_music,saveRef} from '../store/action.js';
 
// import 'rsuite/lib/Button/styles';
const { Column, HeaderCell, Cell, Pagination } = Table;

const CustomInputGroupWidthButton = ({ placeholder,searchValue,doSearch,openSearch}) => (
  <InputGroup size="md" placeholder="Medium" inside style={music_obj.search_width}>
    <Input placeholder={placeholder} value={searchValue} onChange={(value,event)=>doSearch(value,event)}/>
    <InputGroup.Button onClick={openSearch}>
      <Icon icon="search" style={music_obj.icon_color}/>
    </InputGroup.Button>
  </InputGroup>
);

const NavBarInstance = ({ onSelect, activeKey,searchValue,doSearch,openSearch,...props}) => {
  return (
    <Navbar {...props}>
      <Navbar.Header>
        <Icon icon='music' style={music_obj.icon_music} size='2x' />
        <a href="#" className="navbar-brand logo" style={music_obj.a_center}>
          随心听
        </a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
            我的音乐
          </Nav.Item>
          <Nav.Item eventKey="2">News</Nav.Item>
          <Nav.Item eventKey="3">Products</Nav.Item>
          <Dropdown title="音乐分类" trigger={['click', 'hover']}>
            <Dropdown.Item eventKey="4" style={music_obj.drop_down}>流行</Dropdown.Item>
            <Dropdown.Item eventKey="5" style={music_obj.drop_down}>摇滚</Dropdown.Item>
            <Dropdown.Item eventKey="6" style={music_obj.drop_down}>古典</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav style={music_obj.tar_right}>
            <CustomInputGroupWidthButton searchValue = {searchValue} doSearch = {doSearch} openSearch={openSearch}/>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

class Demo extends React.Component {
  constructor(props) {
    super(props);    
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: null,
      searchValue:null
    };
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  doSearch = (value)=>{  
    this.setState({
      searchValue: value
    });
  }
  openSearch = ()=>{       
    if(document.location.href.indexOf('search') > 0){
      this.props.post_to(this.state.searchValue);
    }else{
      this.props.history.push({
        pathname: '/search',
        search: `name=${this.state.searchValue}`
      });
    }
   
  } 
  render() {
    const { activeKey,searchValue} = this.state;
    return (
      <Grid fluid style={music_obj.no_padding}>
        <Row>
          <Col md={24} xs={24} sm={24} lg={24}>
            <div className="nav-wrapper">  
              <NavBarInstance
                appearance="inverse"
                activeKey={activeKey}
                onSelect={this.handleSelect}
                doSearch={this.doSearch}
                openSearch={this.openSearch}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const Imgbox = ()=>(
      <Carousel autoplay className="custom-slider">
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4"
          height="250"
        />
        <img
          src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
          height="250"
        />
      </Carousel>
  )

  class ResizableColumnTable extends React.Component {
    constructor(props) {
      super(props);
      const data = fakeData.filter((v, i) => i < 8);
      this.state = {
        data
      };
    }
    render() {
      const { data } = this.state;
      return (
        <div>
          <Table height={420} data={data}>
            <Column width={50} align="center" resizable>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
  
            <Column width={100} resizable>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>
  
            <Column width={100} resizable>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>
  
            <Column width={200} resizable>
              <HeaderCell>City</HeaderCell>
              <Cell dataKey="city" />
            </Column>
  
            <Column width={200} resizable>
              <HeaderCell>Company Name</HeaderCell>
              <Cell dataKey="companyName" />
            </Column>
          </Table>
        </div>
      );
    }
  }

  const Songlist = ()=>(
    <div style={music_obj.song_div}>      
      <Grid fluid>
          <Row>
            <Col md={14} sm={24} xs={24} style={music_obj.newbox_bottom}>
            <h5 style={music_obj.song_text}>推荐歌单</h5>
              <Row gutter={16}>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                      <div style={music_obj.song_imgtext}> xs={4}</div>               
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                      <div style={music_obj.song_imgtext}> xs={4}</div>               
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                      <div style={music_obj.song_imgtext}> xs={4}</div>             
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                      <div style={music_obj.song_imgtext}> xs={4}</div>              
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                    <div style={music_obj.song_imgtext}> xs={4}</div>              
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={5}>
                    <div className="show-col" style={music_obj.text_center}>
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="110px" width="110px"
                      />
                      <div style={music_obj.song_imgtext}> xs={4}</div>              
                    </div>
                  </Col>
              </Row>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <h5 style={music_obj.song_text}>歌曲榜单</h5>
              <ResizableColumnTable/>
            </Col>
          </Row>
        </Grid>
      </div>
  )

  const Newsong = ()=>(
    <div style={music_obj.song_div}>
      <Grid fluid>
        <Row>
          <Col md={13} sm={24} xs={24} style={music_obj.newbox_bottom}>
            <div style={music_obj.newtext_center}>
              <h5 style={music_obj.mewtext_right}>新歌首发</h5>
              <ButtonToolbar>
                <Button appearance="link">华语</Button>
                <Button appearance="link">欧美</Button>
                <Button appearance="link">韩国</Button>
                <Button appearance="link">日本</Button>        
              </ButtonToolbar>
            </div>
            <div>
              <Button appearance='subtle' block>
                <div style={music_obj.songbtn_text}>
                  <span>歌曲名</span>
                  <span>时长</span>
                </div>
              </Button>
              <Button appearance='subtle' block>
                <div style={music_obj.songbtn_text}>
                  <span>歌曲名</span>
                  <span>时长</span>
                </div>
              </Button>
              <Button appearance='subtle' block>
                <div style={music_obj.songbtn_text}>
                  <span>歌曲名</span>
                  <span>时长</span>
                </div>
              </Button>
              <Button appearance='subtle' block>
                <div style={music_obj.songbtn_text}>
                  <span>歌曲名</span>
                  <span>时长</span>
                </div>
              </Button>
            </div>
          </Col>
          <Col md={8} sm={24} xs={24} mdPush={1}>
              <h5>精彩视频</h5>
              <div style={music_obj.video_div}>
                <div style={music_obj.video_box1}>
                  <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                    height="170px" width="170px"
                  />
                </div>
                <div>
                  <div>
                    <img
                      src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                      height="80px" width="80px" style={music_obj.video_right}
                    />
                    <img
                      src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                      height="80px" width="80px" style={music_obj.video_right}
                    />
                  </div>
                  <div>
                    <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="80px" width="80px" style={music_obj.video_right}
                      />
                      <img
                        src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                        height="80px" width="80px" style={music_obj.video_right}
                      />
                  </div>
                </div>
              </div>
          </Col>
        </Row>
      </Grid>
    </div>
  ) 
    
  

function music_main(props) {   
  return <div >
            {/* <Grid fluid style={music_obj.no_padding}>
              <Row>
                <Col md={24} xs={24} sm={24} lg={24}> */}
                  <Demo {...props}/>
                {/* </Col>
              </Row>
            </Grid> */}
            <Imgbox/>
            <Songlist/>
            <Newsong/>
          </div>

               
}

const mapStateToProps = (state,ownProps) => {
  return {
    doref:state.doRef
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_music:bindActionCreators(get_music,dispatch),
    saveRef:bindActionCreators(saveRef,dispatch)
  }
}

const main_connect = connect(mapStateToProps,mapDispatchToProps)(music_main);

export {main_connect,Demo};
