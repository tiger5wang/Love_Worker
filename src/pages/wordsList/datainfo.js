/*
__author__ = 'YongCong Wu'
@Time    : 2019/8/12 14:04
@Email   :  : 1922878025@qq.com
*/
import React,{Component} from 'react';
import {Icon, Flex, Text} from 'antd-mobile'
import { connect } from 'dva';
import styles from '@/pages/wordsList/index.css';
import router from 'umi/router';


class datainfo extends Component {

  state={
    dataList:[]
  }


  componentDidMount(){
      this.get_dataInfo()
  }


  returnPage = () => {
    if(this.props.location.query.filterData){
      router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData:this.props.location.query.filterData
      },
    });
    }else{
      router.push({
      pathname: '/wordsList',
      query: {
        token: this.props.location.query.token,
        id: this.props.location.query.titid,
        name: this.props.location.query.name
      },
    });
    }

  };

  get_dataInfo=() => {
    const{dispatch} = this.props;
    dispatch({
      type:'wordList/getListInfo',
      payload:{
        uid: this.props.location.query.uid
      },
      callback: response=>{
        if(response.code===200){
          this.setState({
            dataList: response.data
          })
        }else{
          console.log("错误")
        }
      }
    })
  };

  render() {

    const{dataList} = this.state;
    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div className={styles.goback}>
              <Icon onClick={() => this.returnPage()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont}>话术详情</span>
          </Flex>
        </div>
        {dataList && dataList.length > 0 && dataList.map((item, index) => {
          let context = item.context.split('^');
          if(context.length > 4) {
            context = context.slice(0, 100)
          }
          return(
            <div>
               {context.map((data, index) => {
                return (

                  <Flex style={{margin: 10, fontWeight:index===0?'bold':"",fontSize:index===0?25:15, color:index===0?'red':'#000'}} justify='start'>{data}</Flex>
                )})}
            </div>



          )
        })}

      </div>
    );
  }
}

export default connect(({wordList}) => ({
wordList
}))(datainfo)

