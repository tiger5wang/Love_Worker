import React, {Component} from 'react';
import {connect} from 'dva'

import styles from './textListCSS.css';

import { ListView } from 'antd-mobile';






class textList extends Component {

   constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }




  componentDidMount(){
    this.get_dataList()
  }


  get_dataList = () =>{
     const{dispatch} = this.props;
     dispatch({
       type:'PostDataList/getContextList',
       payload:{},
       callback: response => {
         console.log(JSON.stringify(response))
         this.setState({
           data: response.data
         })
       }
     })
  }



  render() {

     const {data} = this.state;




    return(
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div className={styles.header}>
          <span className={styles.headerFont}>恋爱话术</span>
        </div>

        {data && data.length > 0 && data.map((item, index) => {
          console.log(JSON.stringify(item))
          return (
            <div className={styles.content}>
                  <div style={{ padding: '0 15px' }}>
                    <div style={{ display: 'flex', padding: '15px 0' }}>
                      <img style={{ height: '64px', marginRight: '15px' }} src={item.img_Path} alt=""/>
                      <div style={{ lineHeight: 1 }}>
                        <div style={{marginTop:10}}><span style={{ fontSize: '15px' }}>文章标题: </span><span
                          style={{ fontSize: '15px' }}>{item.title}</span></div>
                        <div style={{marginTop:20}}><span style={{ fontSize: '15px' }}>发布时间: </span><span
                          style={{ fontSize: '15px' }}>{item.create_time}</span></div>
                      </div>
                    </div>
                  </div>
            </div>
          );
        })}

      </div>
    )
  }
}

export default connect(({PostDataList}) => ({
  PostDataList
}))(textList)

