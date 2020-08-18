import React, { Component } from 'react';
import { Slider, RangeSlider,Grid, Row, Col, Navbar, Nav, Dropdown, Icon, List,InputGroup, Input,Carousel,Table,Button,ButtonToolbar,Tooltip, Whisper} from 'rsuite';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {add,change,post_to,postError,get_music,flag,saveRef,music_type} from '../store/action.js';
import {Demo} from './music_main';
import music_obj from '../music_css/music_main.js';
import '../music_css/music_main.css';
import 'rsuite/lib/styles/index.less';
import '../music_css/music_search';

class Music_play extends React.Component{
    constructor(props){
      super(props);            
      this.play_dom = React.createRef(); 
      this.audio_dom = new Audio();
      let arr = [];
      if(this.props.song){
        let {name,song} =  this.props.song.data;
        name.forEach(item =>{
          item.song_arr.forEach(value=>arr.push(value))
        })
        song.forEach(item =>{
          item.song_name.forEach(value=>arr.push(value))
        })
      }            
      this.music_arr = arr;
      this.state = {       
        playtype_obj:{'retweet':'重复'},
        song_time:'00:00',
        song_length:0,
        song_alltime:'00:00',
        style_width1:'280px',
        style_width2:'80px',
        index:0
      }
      this.resize_fn = ()=>{
        this.width_fn(window.innerWidth);
      }
      this.load_fn = ()=>{
        let time = this.tarnsTime(this.audio_dom.duration);
        this.setState(state =>({
          song_alltime:time
        }))
      }
      this.time_fn = ()=>{
        var timeRange = this.audio_dom.buffered;
        // console.log(timeRange.end(0)/this.audio_dom.duration);
        if(timeRange && timeRange.length != 0){
          var buffer = 100 * (Math.round(Math.floor(timeRange.end(0))/Math.floor(this.audio_dom.duration)))
          var value = Math.round((Math.floor(this.audio_dom.currentTime) / Math.floor(this.audio_dom.duration)) * 100)
          let time = this.tarnsTime(this.audio_dom.currentTime);
          if(isNaN(value)){
            value= 0;
          }
          if(this.play_dom.current && this.play_dom.current.barRef){
            this.play_dom.current.barRef.current.style.width = `${buffer}%`;
          }            
          this.setState(state =>({
            song_length:value,
            song_time:time         
          }))
        }        
      }
    }
    componentDidMount(){             
      this.width_fn(window.innerWidth);  
      this.play_dom.current.barRef.current.style.width = '0%';
      this.play_dom.current.barRef.current.style.backgroundColor = '#d4c9c9';
     
      window.addEventListener('resize',this.resize_fn);
      this.audio_dom.volume = 50/100;
      this.audio_dom.addEventListener('ended',()=>{        
        if(this.audio_dom.paused){
          switch(Object.keys(this.state.playtype_obj)[0]){
            case 'exchange':
              let str = 0;
              this.music_arr.forEach((value,index) =>{
                if(value._id === this.props.music._id){
                  str=index                           
                }
              })
              if(str + 1 >= this.music_arr.length){
                this.props.get_music(this.music_arr[0].song_id,this.music_arr[0].name,this.music_arr[0]._id);
                this.setState(state =>({
                  index:0
                }))            
              }else{
                this.props.get_music(this.music_arr[str + 1].song_id,this.music_arr[str + 1].name,this.music_arr[str +1]._id);
                this.setState(state =>({
                  index:str + 1
                }))
              }                        
              break;
            case 'random':
               let num = Math.round(Math.random()*(0+1-this.music_arr.length)+this.music_arr.length);
               this.props.get_music(this.music_arr[num].song_id,this.music_arr[num].name,this.music_arr[num]._id);
               this.setState(state =>({
                index:num
              }))
              break;
            default:
              this.audio_dom.play();
          }
        }
      })
      this.audio_dom.addEventListener('loadedmetadata',this.load_fn)
      this.audio_dom.addEventListener('timeupdate',this.time_fn);      
    } 
    componentWillUnmount(){          
      this.audio_dom.removeEventListener('loadedmetadata',this.load_fn,false);
      this.audio_dom.removeEventListener('timeupdate',this.time_fn,false);
      window.removeEventListener('resize',this.resize_fn,false);
      this.audio_dom.pause(); 
      this.props.music_type(null,null,null,null)
    }
    componentDidUpdate(prevProps, prevState){
      if(this.props.music && this.props.music.data){      
        if(!this.props.flag){
          this.audio_dom.pause();
          return;
        }                 
        let music_obj = JSON.parse(this.props.music.data && this.props.music.data.data).data[0].url;
        let music_obj2 =  JSON.parse((prevProps.music && prevProps.music.data) && prevProps.music.data.data);  
        let str = music_obj2 && music_obj2.data[0].url;             
        if(music_obj != str){
          this.audio_dom.src = music_obj;
          let playPromise = this.audio_dom.play();       
          playPromise.then(() => {        
        
          }).catch((e) => {
            
          });  
        }               
      }     
    }
    changeTime = (value) =>{
        if(this.audio_dom.duration){
          let num = ((value/100) * Math.floor(this.audio_dom.duration));
          this.audio_dom.currentTime = num;
        }        
    }
    tarnsTime = (time)=>{
      var duration = parseInt(time);
        var minute = parseInt(duration/60);
        var sec = duration%60+'';
        var isM0 = ':';
        if(minute == 0){
            minute = '00';
        }else if(minute < 10 ){
            minute = '0'+minute;
        }
        if(sec.length == 1){
            sec = '0'+sec;
        }
        return minute+isM0+sec
    }
    width_fn = (num)=>{
      if(num<1000 && num>600){
        this.setState(state =>({
          style_width1:'150px',
          style_width2:'40px'
        }))
      }else if(num<600 && num>400){
          this.setState(state =>({
            style_width1:'60px',
            style_width2:'20px'
          }))
      }else if(num<400){
        this.setState(state =>({
          style_width1:'50px',
          style_width2:'5px'
        }))
      }
      else{
        this.setState(state =>({
          style_width1:'280px',
          style_width2:'80px'
        }))
      }
    }
    backClick = ()=>{
      if(this.music_arr.length > 0 && this.props.music){
        let str = undefined;
        this.music_arr.forEach((value,index) =>{
          if(value._id === this.props.music._id){
            str=index-1;
            this.setState(state =>({
              index:index
            }))            
          }
        })
        
       if(str == 'undefined' || str <= -1){
         return;
       }   
       this.props.get_music(this.music_arr[str].song_id,this.music_arr[str].name,this.music_arr[str]._id);
      }      
    }
    playClick = (type)=>{      
      if(this.audio_dom.paused && this.props.music){        
        if(!this.audio_dom.currentTime){
          let music_obj = JSON.parse(this.props.music.data.data);       
          this.audio_dom.src =  music_obj.data[0].url;               
        } 
        this.music_arr.forEach((value,index) =>{
          if(value._id === this.props.music._id){           
            this.setState(state =>({
              index:index
            }))                       
          }
       })      
        let playPromise = this.audio_dom.play();       
        playPromise.then(() => {        
      
        }).catch((e) => {
          
        }); 
        this.props.doflag(true);      
      } else {
        this.audio_dom.pause();      
      }                     
    }
    nextClick = ()=>{
      if(this.music_arr.length > 0 && this.props.music){
        let str = undefined;
        this.music_arr.forEach((value,index) =>{
          if(value._id === this.props.music._id){
            str=index+1
            this.setState(state =>({
              index:index
            }))
          }
       })
       if(str == 'undefined' || str >= this.music_arr.length){
         return;
       }       
       this.props.get_music(this.music_arr[str].song_id,this.music_arr[str].name,this.music_arr[str]._id);
      }      
    }
    changeIcon = ()=>{
      const arr = [{'exchange':'顺序'},{'random':'随机'},{'retweet':'重复'}] // 循环 随机 重复
      let index = arr.findIndex((value,index)=>{
          return Object.keys(value)[0] === Object.keys(this.state.playtype_obj)[0]
      })
      let num = index===2?0:index+1
      this.setState(state=>({
        playtype_obj:arr[num]
      }))
    }

    voc_fn = (value)=>{
      this.audio_dom.volume = value/100;
    }

    render(){
      const {playtype_obj,song_time,song_alltime,song_length,style_width1,style_width2} = this.state; 
      return <Bottom_play 
        backClick={this.backClick}
        playClick={this.playClick} 
        nextClick={this.nextClick} 
        play_dom={this.play_dom}
        playFlag={this.audio_dom.paused}
        changeIcon={this.changeIcon}
        playtype_obj={playtype_obj}
        voc_fn= {this.voc_fn}
        song_time = {song_time}
        song_length = {song_length}
        song_alltime = {song_alltime}
        style_width1={style_width1}
        style_width2={style_width2}
        changeTime={this.changeTime} 
        name = {this.props.music && this.props.music.name} 
      />
    }
  }

  const Bottom_play = (props)=>{
    return <div style={music_obj.bottom_fiexd}>
        <Row className="bottom_flex">
          <Col md={4} sm={4} xs={4}>
            <div style={music_obj.bottom_box1}>
              <a onClick={()=>props.backClick()} className="btn_right">
                <Icon icon="backward" style={music_obj.icon_color}/>
              </a>
              <a onClick={props.playClick} className="btn_right">
                <Icon icon={props.playFlag?'play2':'stop2'} style={music_obj.icon_color}/>
              </a>
              <a onClick={()=>props.nextClick()} className="btn_right">
                <Icon icon="forward" style={music_obj.icon_color}/>
              </a>
            </div>
          </Col>
          <Col md={16} sm={14} xs={12}>
            <div style={music_obj.bottom_box2}>
              <img
                src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                height="40px" width="40px"
              />
              <div style={music_obj.playbox2}>
                <div>
                  <a>{props.name?props.name:'歌曲'}</a>
                </div>
                <div className="bottom_center">
                    <div style={{width:props.style_width1}} className="postion_dom">
                      <div className="buffer_dom"></div>
                      <Slider
                        tooltip={false}
                        progress                   
                        value={props.song_length}                   
                        className="voc_height"    
                        onChange={value => props.changeTime(value)}   
                        ref={props.play_dom}         
                      />
                    </div>
                    <div className="bottom_sj">{props.song_time}/{props.song_alltime}</div>                            
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} sm={6} xs={8} className="bottom_box3">         
              <Whisper
                trigger="click"
                placement='top'
                speaker={
                  <Tooltip>
                    {props.playtype_obj[Object.keys(props.playtype_obj)[0]]}
                  </Tooltip>
                }
              >
                <a onClick={props.changeIcon}>
                {props.playtype_obj.key}
                  <Icon icon={Object.keys(props.playtype_obj)[0]} size='lg' style={music_obj.icon_color}/>
                </a>
              </Whisper>
              
              <Whisper
                trigger="click"
                placement='right'
                speaker={
                  <Tooltip>
                  <div style={{width:props.style_width2}}>
                      <Slider
                        progress                   
                        defaultValue={50}
                        onChange={(value)=> props.voc_fn(value)}                  
                      />
                    </div>
                  </Tooltip>              
                }
              >
                <a style={music_obj.bottom_iconleft}>
                  <Icon icon="volume-up" size='lg' style={music_obj.icon_color}/>
                </a>
              </Whisper>                    
          </Col>
        </Row>               
      </div>
  }

const List_name = (props)=>{    
    let img_src = 'https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5';
    return <List hover>
                <div className="song_box">
                    <span className="title_text">歌手</span>
                    {
                        props.name.map((value,index)=>{
                            return <List.Item key={value['_id']} index={index}>
                                <div className="name_box">
                                    <img src={value.song_img?value.song_img:img_src}/>
                                    <span>{value['song_name']}</span>
                                </div>
                            </List.Item>
                        })
                    }
                </div>
                
                
            </List>
}

const List_song = (props)=>{
    return <List hover>                              
                    <div className="song_box2">
                        <span className="title_text">歌曲</span> 
                        {
                            props.name.map((value,index)=>{
                                return value.song_arr.map((song,index)=>{
                                    return <List.Item key={index} index={index} onClick={()=>props.get_url(song['song_id'],song['name'],song['_id'])}>
                                                <div className="name_center">                                                    
                                                    <span>{song['name']}</span>
                                                    <span>{value['song_name']}</span>
                                                </div>
                                            </List.Item>
                                })                                 
                            })
                        }
                        {
                            props.song.map((value,index)=>{
                               
                                return <List.Item key={index} index={index}>
                                            <div className="name_box">                                                                                                    
                                                {
                                                    value.song_name.map((song,index)=>{
                                                        return <List key={song['_id']} onClick={()=>props.get_url(song['song_id'],song['name',song['_id']])}>
                                                                    <div className="name_center">{song.name}
                                                                        <span>{value['name']}</span>
                                                                    </div>
                                                                </List>
                                                    })
                                                }
                                                <List></List>
                                            </div>
                                        </List.Item>
                                })                                                           
                        }
                    </div>                
           </List>
}

class search_dom extends React.Component{
  constructor(props) {
    super(props);  
    let arr = this.props.history.location.search.split('='); 
    this.state = {
        searchValue:arr[1]        
    }    
  }
  doSong=()=>{
    this.props.postError(null);       
  }
  get_url=(id,name,_id)=>{ 
    if(_id === (this.props.music && this.props.music._id)){
        let a = !this.props.flag;       
        this.props.doflag(a);
    }else{
        this.props.doflag(true);
    }     
    this.props.get_music(id,name,_id);
  }
  componentDidMount(){
   this.props.post_to(this.state.searchValue);
  }
  render(){  
      if(this.props.song && this.props.song.data){
        let {name,song} = this.props.song.data;       
        return  <div>
                    <Demo {...this.props}/>
                    <List_name name = {name}/>
                    <List_song name = {name} song = {song} get_url={this.get_url}/>
                    <Music_play {...this.props}/>
                </div> 
      }else{
        return <div>
                    {'loading'}
                </div> 
      }  
      

      
  }
}

const mapStateToProps = (state,ownProps) => {
    return {
        song: state.song,
        music:state.music,
        flag:state.flag,
        doref:state.doRef
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {  
      post_to:bindActionCreators(post_to,dispatch),
      postError:bindActionCreators(postError,dispatch),
      get_music:bindActionCreators(get_music,dispatch),
      doflag:bindActionCreators(flag,dispatch),
      saveRef:bindActionCreators(saveRef,dispatch),
      music_type:bindActionCreators(music_type,dispatch)
    }
  }
  
const main_connect = connect(mapStateToProps,mapDispatchToProps)(search_dom);
  
  export default main_connect;